import { useState, useEffect, useContext} from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../config/firebase";
//import "./popular.css"; // Assuming you have CSS for the Popular component
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore"; // Firestore functions
import { db } from "../../config/firebase"; // Firebase config
import { CartContext } from "../../context/CartContext";

const Popular = () => {
    const [photoes, setPhotoes] = useState([]);
    const[ artsData , setArtsData ] = useState([]);
    const { cartItems, addToCart } = useContext(CartContext);

    // Fetch art data from Firestore
  const fetchArtData = async () => {
    try {
      //console.log("Fetching art items from Firebase...");
      const artsCollection = collection(db, 'arts');
      const q = query(artsCollection, limit(4)); // Limit to 6
      const artsSnapshot = await getDocs(q);
      const allArts = artsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
     
      setArtsData(allArts);
    } catch (error) {
      console.error("Error fetching art items:", error);
    }
  };

  useEffect(() => {
    fetchArtData();
  }, []);



    return (
        <section className="popular">
            <div className="section-title popular-title">
                <h2>Popular Arts</h2>
                <div className="underline popular-underline"></div>
            </div>
            <div className="section-center popular-center">
                {artsData.map((art) => (
                    <article className="popular-item">
                        <div className="popular-img">
                            <img src={`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(art.imageURL)}?alt=media`}></img>
                        </div>
                        <p className="popular-name">{art.name}</p>
                        <p className="popular-price">Price: {art.price}</p>
                        <button className="btn popular-btn" onClick={() => addToCart(art.id)}>Add to Cart {cartItems[art.id] > 0 && `(${cartItems[art.id]})`}</button>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Popular;
