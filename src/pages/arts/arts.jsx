import Image1 from "./images/caligraphy.jpg";
import Image2 from "./images/islamic arts.jpg";
import Image3 from "./images/sculpture.jpg";
import Image4 from "./images/war arts.png";
import "./arts.css";
import { useNavigate } from "react-router-dom";

export const Arts = () => {
    const navigate = useNavigate();
   
    const handleShowPortfolio = (artName) => {
        // Navigate to the portfolio page with the artist's name
        navigate(`/arts-portfolio/${artName}`);
    };
  return (
    <div>
      <section className="arts">
        <div className="section-title arts-title">
          <h2>Arts</h2>
          <div className="underline"></div>
        </div>
        <div className="section-center arts-center">
          <article className="arts-box" id="caligraphy" onClick={() => handleShowPortfolio('Caligraphy/')}>
            <div className="arts-img">
              <img src={Image1} alt="Art1" />
            </div>
            <div className="arts-info">
              <h4>Caligraphy</h4>
            </div>
          </article>
          <article className="arts-box" id="islamic-arts" onClick={() => handleShowPortfolio('Islamic Art/')}>
            <div className="arts-img">
              <img src={Image2} alt="Art2" />
            </div>
            <div className="arts-info">
              <h4>Islamic Arts</h4>
            </div>
          </article>
          <article className="arts-box" id="sculpture" onClick={() => handleShowPortfolio('Sculpture/')}>
            <div className="arts-img">
              <img src={Image3} alt="Art3" />
            </div>
            <div className="arts-info">
              <h4>Sculpture</h4>
            </div>
          </article>
          <article className="arts-box" id="war-arts" onClick={() => handleShowPortfolio('War Arts/')}>
            <div className="arts-img">
              <img src={Image4} alt="Art4" />
            </div>
            <div className="arts-info">
              <h4>War Arts</h4>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};
