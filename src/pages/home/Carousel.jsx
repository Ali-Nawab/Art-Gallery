import React, { useState } from "react";

const Carousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section aria-label="Newest Photos">
      <div className="carousel" data-carousel>
        <button className="carousel-button prev" onClick={handlePrevClick}>
          &#8656;
        </button>
        <button className="carousel-button next" onClick={handleNextClick}>
          &#8658;
        </button>
        <ul data-slides>
          {slides.map((slide, index) => (
            <li
              key={index}
              className={`slide ${index === activeIndex ? "active" : ""}`}
              data-active={index === activeIndex}
            >
              <img src={slide.src} alt={slide.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Carousel;
