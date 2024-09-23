import "./styles/ValidationArtwork.css";
import "../components/NewArtwork/FormArtwork/FormArtwork.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNewArtwork } from "../contexts/NewArtworkContext";
import TopBar from "../components/TopBar/TopBar";

function ValidationArtwork() {
  const navigate = useNavigate();
  const { title, image } = useNewArtwork();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <TopBar title="Spot Lille Art" />
      {loader ? (
        <div className="loader-container">
          <span className="loader" />
        </div>
      ) : (
        <div className="validation-artwork-container">
          <div className="validation-artwork">
            <div className="camera-picture">
              <img src={image} alt={title} />
            </div>
            <div className="validation-info">
              <p>
                Ton oeuvre <span className="focus-text">{title}</span> a bien
                été postée, elle doit maintenant être validée par un
                administrateur afin de figurer sur le site.
              </p>
              <br />
              <p className="focus-text">
                Tes points te seront attribués lors de la validation.
              </p>
            </div>
            <button type="button" className="btn" onClick={navigateToHome}>
              Revenir à l'accueil
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ValidationArtwork;
