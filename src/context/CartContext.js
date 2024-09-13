import { db } from "../config/firebase";
import { useEffect, useState, createContext } from 'react';
import { collection, doc, getDoc, getDocs, setDoc, addDoc } from 'firebase/firestore';  // Include addDoc to create a new document in Firestore
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const [TOTALARTS, setTotalArts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [userId, setUserId] = useState(null);
  const [orderId, setOrderId] = useState(null);  // State to store the orderId for confirmation popup
  const [showPopup, setShowPopup] = useState(false);  // State to control the confirmation popup visibility
  const auth = getAuth();

  // Fetch art data from Firestore
  const fetchCartItems = async () => {
    try {
      const cartItemsCollection = collection(db, 'arts');
      const cartItemsSnapshot = await getDocs(cartItemsCollection);
      const cartItemsList = cartItemsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTotalArts(cartItemsList);
    } catch (error) {
      console.error("Error fetching art items:", error);
    }
  };

  // Fetch the user's saved cart from Firestore
  const fetchUserCart = async (userId) => {
    try {
      const userCartRef = doc(db, 'carts', userId);
      const userCartSnap = await getDoc(userCartRef);
      if (userCartSnap.exists()) {
        setCartItems(userCartSnap.data().items || {});
      } else {
        setCartItems(getDefaultCart(TOTALARTS));
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  // Save the current cart to Firestore
  const saveUserCart = async (userId, cart) => {
    try {
      const userCartRef = doc(db, 'carts', userId);
      await setDoc(userCartRef, { items: cart });
      console.log("User cart saved successfully.");
    } catch (error) {
      console.error("Error saving user cart:", error);
    }
  };

  // Initialize default cart with all art IDs set to 0
  const getDefaultCart = (arts) => {
    let cart = {};
    arts.forEach((art) => {
      cart[art.id] = 0;  // Set each art ID with an initial value of 0
    });
    return cart;
  };

  // Calculate total price in cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = TOTALARTS.find((product) => product.id === itemId);
        if (itemInfo) {
          totalAmount += cartItems[itemId] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  // Add item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
      saveUserCart(userId, updatedCart);  // Save cart after update
      return updatedCart;
    });
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) };
      saveUserCart(userId, updatedCart);  // Save cart after update
      return updatedCart;
    });
  };

  // Update item count directly
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: newAmount };
      saveUserCart(userId, updatedCart);  // Save cart after update
      return updatedCart;
    });
  };

  // Clear cart items after checkout
  const clearCart = () => {
    const resetCart = getDefaultCart(TOTALARTS);
    setCartItems(resetCart);
    saveUserCart(userId, resetCart);  // Save the reset cart after clearing
  };


  // Checkout and save order
  const checkout = async () => {
    try {
     
      clearCart();  // Clear the cart after order is saved
      setShowPopup(true);  // Show the confirmation popup
      console.log("Checkout successful, cart cleared. Order ID:", orderId);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    clearCart,  // Expose clearCart function if needed elsewhere
    showPopup,
    orderId,
    setShowPopup,
    userId
  };

  // Fetch arts data and initialize cart items when TOTALARTS is updated
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Initialize cartItems once TOTALARTS is loaded
  useEffect(() => {
    if (TOTALARTS.length > 0 && userId) {
      fetchUserCart(userId);  // Fetch the user's cart from Firestore when logged in
    }
  }, [TOTALARTS, userId]);

  // Listen for Firebase Authentication changes (user login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);  // Set the userId when a user is logged in
        fetchUserCart(user.uid);  // Fetch their saved cart
      } else {
        setUserId(null);  // Clear userId on logout
        setCartItems({});  // Clear cart when logged out
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
