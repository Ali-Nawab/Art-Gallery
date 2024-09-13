import Product1 from "./images/adrianna-geo-1rBg5YSi00c-unsplash.jpg";
import Product2 from "./images/birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg";
import Product3 from "./images/birmingham-museums-trust-sJr8LDyEf7k-unsplash.jpg";
import Product4 from "./images/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg";
import Product5 from "./images/birmingham-museums-trust-zWE5pOLWkio-unsplash.jpg";
import Product6 from "./images/europeana-VsnDYMWollM-unsplash.jpg";
import Product7 from "./images/sfgwaer.jpeg";
import { useState, useEffect } from "react";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore"; // Firestore functions
import { db } from "../../config/firebase"; // Firebase config

const NewArrivals = () => {
    const [imageURLs, setImageURLs] = useState([]);
    const fetchNewArrivalImages = async () => {
        try {
            const artsCollectionRef = collection(db, 'arts');
            const q = query(artsCollectionRef, orderBy('createdAt', 'desc'), limit(6)); // Limit to 6
            const snapshot = await getDocs(q);
            
            const urls = snapshot.docs.map(doc => doc.data().imageURL);
            setImageURLs(urls);
        } catch (error) {
            console.error("Error fetching new arrival images:", error);
        }
    };
    useEffect(() => {
        fetchNewArrivalImages();
    }, []);
    return (
        <section className="newArrival">
            <div className="section-title newArrival-title">
                <h2>New Arrivals</h2>
                <div className="underline newArrival-underline"></div>
            </div>
            <div className="section-center newArrival-center">
                <div class="container">
                    <div class="items header">
                        <img src={`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(imageURLs[0])}?alt=media`} alt="nature image 1" className="newArrival-img"></img>
                        {/* <div className="slideButton">
                            <button className="btn newArrival-cart">Add to Cart</button>
                        </div> */}
                    </div>
                    <div class="items menu">
                        <img src = {`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(imageURLs[1])}?alt=media`} alt="Nature image 2"></img>
                        {/* <div className="slideButton">
                            <button className="btn newArrival-cart">Add to Cart</button>
                        </div> */}
                    </div>
                    <div class="items box1">
                        <img src = {`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(imageURLs[2])}?alt=media`} alt="Nature image 3"></img>
                        {/* <div className="slideButton">
                            <button className="btn newArrival-cart">Add to Cart</button>
                        </div> */}
                    </div>
                    <div class="items box2">
                        <img src = {`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(imageURLs[3])}?alt=media`} alt="Nature image 4"></img>
                        {/* <div className="slideButton">
                            <button className="btn newArrival-cart">Add to Cart</button>
                        </div> */}
                    </div>
                    <div class="items sidebar">
                        <img src = {`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(imageURLs[4])}?alt=media`} alt="Nature image 5"></img>
                        {/* <div className="slideButton">
                            <button className="btn newArrival-cart">Add to Cart</button>
                        </div> */}
                    </div>
                    <div className="items box3">
                        <img src = {`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(imageURLs[5])}?alt=media`} alt="Nature image 6"></img>
                        {/* <div className="slideButton">
                            <button className="btn newArrival-cart">Add to Cart</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default NewArrivals;