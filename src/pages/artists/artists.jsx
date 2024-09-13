import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import "./artists.css";

export const Artists = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtists = async () => {
            const artistsCollection = collection(db, "artists");
            const artistSnapshot = await getDocs(artistsCollection);
            const artistList = artistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArtists(artistList);
        };

        fetchArtists();
    }, []);

    const handleShowPortfolio = (artistId) => {
        // Navigate to the portfolio page with the artist's ID
        navigate(`/portfolio/${artistId}`);
    };

    return (
        <section className="artists-portfolio">
            <div className="section-title artists-title">
                <h2>Artists</h2>
                <div className="underline"></div>
            </div>
            <div className="section-center artists-center">
                {artists.map((artist) => (
                    <article key={artist.id} className="artists">
                        <div className="artists-img">
                            <img 
                                src={`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(artist.imageURL)}?alt=media`} 
                                alt={artist.name} 
                            />
                        </div>
                        <div className="artists-info">
                            <h4>{artist.name}</h4>
                            <button className="btn artists-btn" onClick={() => handleShowPortfolio(artist.id)}>Show Portfolio</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
