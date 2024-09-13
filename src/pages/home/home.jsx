import React from "react";
import "./home.css";
import product1 from "./images/adrianna-geo-1rBg5YSi00c-unsplash.jpg";
import product2 from "./images/birmingham-museums-trust-BPWZ01FtySg-unsplash.jpg";
import product3 from "./images/birmingham-museums-trust-sJr8LDyEf7k-unsplash.jpg";
import product4 from "./images/birmingham-museums-trust-zWE5pOLWkio-unsplash.jpg"
import Carousel from "./Carousel";
import Popular from "./Popular";
import NewArrivals from "./NewArrivals";
import Artist from "./Artist";
import Footer from "./Footer";

export const Home = () => {
  const slides = [
    { src: product1, alt: "Nature Image #1" },
    { src: product2, alt: "Nature Image #2" },
    { src: product3, alt: "Nature Image #3" },
    { src: product4, alt: "Nature Image #4" },
  ];

  return (
    <div>
      <Carousel slides={slides} />
      <Popular />
      <NewArrivals />
      <Artist />
      <Footer />
    </div>
  );
};

export default Home;
