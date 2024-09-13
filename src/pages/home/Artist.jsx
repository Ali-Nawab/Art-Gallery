import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './artist.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { ref, getDownloadURL, listAll } from "firebase/storage"; // Import from Firebase Storage
import { storage } from "../../config/firebase"; // Import the Firebase storage instance

const Artist = () => {
  // Array of artists with an imageName that corresponds to the image filename in Firebase
  const [artists, setArtists] = useState([
    {
      name: "A. Ali",
      description: "A. Ali is a famous artist known for his expressive abstract work.",
      imageName: "A Ali.jpg", // Match the Firebase image filename
    },
    {
      name: "Abdul Jabbar",
      description: "Abdul Jabbar is recognized for his vibrant paintings.",
      imageName: "Abdul Jabbar.jpg",
    },
    {
      name: "Ali Abbas",
      description: "Ali Abbas is a contemporary artist with a focus on modern art.",
      imageName: "Ali Abbas.jpg",
    },
    {
      name: "Anwar Maqsood",
      description: "Anwar Maqsood has made significant contributions to theater and visual arts.",
      imageName: "Anwar Maqsood.jpg",
    },
    {
      name: "Mahnoor Baloch",
      description: "Mahnoor Baloch is a multi-talented actress and artist.",
      imageName: "Mahnoor Baloch.jpg",
    },
    {
      name: "Saeed Kureshi",
      description: "Saeed Kureshi is known for his traditional style.",
      imageName: "Saeed Kureshi.jpg",
    },
    {
      name: "Aisha Mehmood",
      description: "Aisha Mehmood creates art that explores cultural identity.",
      imageName: "aisha mehmood.jpeg",
    },
    {
      name: "Salman Farooqui",
      description: "Salman Farooqui specializes in digital and contemporary art.",
      imageName: "salman farooqui.jpeg",
    },
    {
      name: "Nawab Khan",
      description: "Nawab Khan's works delve into the human experience.",
      imageName: "nawabkhan.jpeg",
    },
  ]);

  const [imageUrls, setImageUrls] = useState([]);
  
  const imagesListRef = ref(storage, "Artists/"); // Reference to Artists folder in Firebase Storage

  useEffect(() => {
    // Fetch the list of images from Firebase Storage
    listAll(imagesListRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          const fileName = itemRef.name; // Get the filename of the image
          
          // Find the matching artist by comparing filenames
          setArtists((prevArtists) =>
            prevArtists.map((artist) =>
              artist.imageName === fileName ? { ...artist, image: url } : artist
            )
          );
        });
      });
    }).catch((error) => {
      console.error("Error fetching images: ", error);
    });
  }, []);

  return (
    <section className="artist">
      <div className="section-title artist-title">
        <h2>Artist</h2>
        <div className="underline artist-underline"></div>
      </div>
      <div className="section-center artist-center">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {artists.map((artist, index) => (
            <SwiperSlide key={index}>
              <article className="artist-item">
                <div className="artist-img">
                  {/* Use the dynamically assigned image URL */}
                  {artist.image && <img src={artist.image} alt={artist.name} />}
                </div>
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <p>{artist.description}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Artist;
