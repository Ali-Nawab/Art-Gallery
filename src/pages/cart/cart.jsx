import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../config/firebase"; // Import the Firebase Firestore instance
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./cart.css"; // Assuming you have a cart.css for styling

const Cart = () => {
    const { cartItems, getTotalCartAmount, checkout, addToCart, removeFromCart, updateCartItemCount, userId } = useContext(CartContext);
    const totalAmount = getTotalCartAmount();
    const [orderId, setOrderId] = useState(null); 

    const navigate = useNavigate();

    const [cartItemsData, setCartItemsData] = useState([]);

    // Fetch art data from Firestore
    const fetchCartItemsData = async () => {
        try {
            console.log("Fetching cart items from Firebase...");
            const cartItemsCollection = collection(db, 'arts');
            const cartItemsSnapshot = await getDocs(cartItemsCollection);
            const cartItemsList = cartItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Fetched cart items:", cartItemsList);

            // Filter based on the cart items
            const filteredCartItems = cartItemsList.filter(art =>
                cartItems[art.id] > 0
            );
            console.log("Filtered cart items:", filteredCartItems);
            setCartItemsData(filteredCartItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    // Function to save the order to Firestore
  const saveOrderToDatabase = async (cartItems, totalAmount, userId) => {
    const ordersCollection = collection(db, "orders");

    const orderData = {
      userId: userId,
      items: cartItems,
      totalAmount: totalAmount,
      timestamp: new Date(),
    };

    try {
      const orderDoc = await addDoc(ordersCollection, orderData);  // Add new order document
      setOrderId(orderDoc.id);  // Capture the order document ID for the confirmation popup
      console.log("Order saved successfully. Order ID:", orderDoc.id);
      return orderDoc.id;  // Return the order ID
    } catch (error) {
      console.error("Error saving order:", error);
      throw error;
    }
  };

    const handleCheckout = async () => {
        const totalAmount = getTotalCartAmount();
        const orderId = await saveOrderToDatabase(cartItems, totalAmount, userId);  // Save the order and get the order ID
        document.getElementById("popup").classList.add("popup-show");
        checkout();
    }
    const changeNavigate = () => {
        document.getElementById("popup").style.display = "none";
    }
    useEffect(() => {
        fetchCartItemsData();
    }, [cartItems]); // Refetch cart data whenever the cart changes

    const handleContinueShopping = () => {
        navigate("/arts"); // Redirect to the arts section
    };

    return (
        <section className="cart">
            <div className="section-title cart-title">
                <h2>Your Cart</h2>
                <div className="underline"></div>
            </div>
            <div className="section-center cart-center">
                {cartItemsData.length > 0 ? (
                    cartItemsData.map(item => (
                        <article className="cart-item" key={item.id}>
                            <img src={`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(item.imageURL)}?alt=media`} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <h4>{item.name}</h4>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {cartItems[item.id]}</p>
                            </div>
                            <div className="countHandler">
                                <button onClick={() => removeFromCart(item.id)}> - </button>
                                <input
                                   type="number"
                                   value={cartItems[item.id]}
                                   min="1"
                                   onChange={(e) => {
                                     const value = Math.max(Number(e.target.value), 0); // Ensure value is non-negative
                                     updateCartItemCount(value, item.id);
                                   }}
                                />
                                <button onClick={() => addToCart(item.id)}> + </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <h4>Your cart is empty</h4>
                )}
            </div>

            <div className="cart-footer">
                <h3>Total Amount: ${totalAmount}</h3>
                <button className="cart-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                <button className="cart-btn" onClick={handleContinueShopping}>Continue Shopping</button>
            </div>

            <div className="popup" id="popup">
                <div className="popup-content">
                    <h2>Thank you for your order!</h2>
                    <p>Your order ID is: {orderId}</p>
                    <button onClick={changeNavigate}>ok</button>
                </div>
            </div>
        </section>
    );
};

export default Cart;
