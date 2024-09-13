import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../config/firebase"; // Import the Firebase Firestore instance
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./arts-portfolio.css";

export const ArtsPortfolio = () => {
  const { artName } = useParams(); // Get the category from the URL
  const [artsData, setArtsData] = useState([]); // Store filtered art data
  const { cartItems, addToCart } = useContext(CartContext); // Access cart context

  // Fetch art data from Firestore
  const fetchArtData = async () => {
    try {
      //console.log("Fetching art items from Firebase...");
      const artsCollection = collection(db, 'arts');
      const artsSnapshot = await getDocs(artsCollection);
      const allArts = artsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      //console.log("Fetched art items:", allArts);

      // Filter based on the category passed from `useParams`
      const filteredArts = allArts.filter(art =>
        art.category.toLowerCase().includes(artName.toLowerCase())
      );
      //console.log(`Filtered arts for category "${artName}":`, filteredArts);
      setArtsData(filteredArts);
    } catch (error) {
      console.error("Error fetching art items:", error);
    }
  };

  useEffect(() => {
    fetchArtData();
  }, [artName]);

  return (
    <section className="art-portfolio">
        <div className="section-title art-portfolio-title">
            <h2>{artName}</h2>
            <div className="underline"></div>
        </div>
        <div className="section-center art-portfolio-center">
            {artsData.map((art) => (
            <article className="art-portfolio-box">
                <div className="art-portfolio-img">
                    <img 
                        src={`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(art.imageURL)}?alt=media`} 
                        alt={artName} 
                        onError={() => console.error("Image not found or invalid URL")}
                    />
                </div>
                <div className="art-portfolio-info">
                    <p className="artName">{artName}</p>
                    <p className="artPrice">Price : {art.price}</p>
                    <button className="btn art-portfolio-btn" onClick={() => addToCart(art.id)}>Add to Cart {cartItems[art.id] > 0 && `(${cartItems[art.id]})`}</button>
                </div>
            </article>
            ))}
        </div>
    </section>
    );
}