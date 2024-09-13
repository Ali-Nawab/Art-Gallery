import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";  // Ensure you're using the correct Firestore methods
import { useParams } from "react-router-dom"; // To extract artistId from URL
import { db } from "../../config/firebase"; // Your Firebase configuration
import "./portfolio.css"; // Your CSS file for styling

const Portfolio = () => {
    const { artistId } = useParams(); // Extract artistId from the URL
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true); // For a loading state
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                // Reference the specific artist document by ID
                const artistRef = doc(db, "artists", artistId);
                const artistDoc = await getDoc(artistRef);

                // Check if the document exists and update the state
                if (artistDoc.exists()) {
                    setArtist(artistDoc.data());
                } else {
                    throw new Error("Artist does not exist!");
                }
            } catch (err) {
                console.error("Error fetching artist data:", err);
                setError("Failed to load artist data.");
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchArtist();
    }, [artistId]); // Runs again if artistId changes

    // If loading, show a spinner or a loading message
    if (loading) return <div>Loading...</div>;

    // If an error occurred, display it
    if (error) return <div>{error}</div>;

    // If artist data is successfully fetched, display the artist's portfolio
    return (
        <section className="portfolio">
            <div className="section-title portfolio-title">
                <h2>{artist.name}</h2>
                <div className="underline"></div>
            </div>
            <div className="section-center portfolio-center">
                <article className="portfolio-box">
                    <div className="portfolio-img">
                        <img 
                            src={`https://firebasestorage.googleapis.com/v0/b/artgalleryproject-d95dd.appspot.com/o/${encodeURIComponent(artist.imageURL)}?alt=media`} 
                            alt={artist.name} 
                            onError={() => console.error("Image not found or invalid URL")}
                        />
                    </div>
                    <div className="portfolio-info">
                        <p>{artist.bio}</p>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Portfolio;
