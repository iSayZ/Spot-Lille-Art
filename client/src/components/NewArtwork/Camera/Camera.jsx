import "./Camera.css";
import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useNewArtwork } from "../../../contexts/NewArtworkContext";
import { useAuth } from "../../../contexts/AuthContext";

function Camera() {
  const { auth } = useAuth();
  const { image, setImage, deletePicture, setLatitude, setLongitude } =
    useNewArtwork();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    if (!isMobile) {
      navigate("/erreur");
    }
  }, [isMobile, navigate]);

  const capturePicture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  // VUE ENVIRONNEMENT DE LA CAMERA POUR MOBILE
  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  // *//////////////////////////////// LOCALISATION ///////////////////////////////////*

  const [errorLocation, setErrorLocation] = useState(null);

  useEffect(() => {
    if (auth.account) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setErrorLocation(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        setErrorLocation("La géolocalisation n'est pas suportée par ce navigateur.");
      }
    } else {
      navigate("/connexion")
    }
  }, [setLatitude, setLongitude, auth.account, navigate]);

    // ANCIENNE GEOLOCALISATION A RE-UTILISER EN CAS DE DYSFONCTIONNEMENT DE LA NOUVELLE METHODE

  // useEffect(() => {
  //   let watchId = null;

  //   const successCallback = (position) => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   };

  //   const errorCallback = (error) => {
  //     setErrorLocation(error.message);
  //   };

  //   const options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   };

  //   if (auth.account) {
  //     if (navigator.geolocation) {
  //       watchId = navigator.geolocation.watchPosition(
  //         successCallback,
  //         errorCallback,
  //         options
  //       );
  //       console.info(watchId);
  //     } else {
  //       setErrorLocation(
  //         "La géolocalisation n'est pas supportée par ce navigateur."
  //       );
  //     }
  //   } else {
  //     navigate("/connexion");
  //   }
  // });

  return (
    auth.account && (
      <div className={image ? "webcam-container full" : "webcam-container"}>
        <div className="camera-top" />
        <p>{errorLocation}</p>
        {image ? (
          <img src={image} alt="Oeuvre capturée" />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
            videoConstraints={videoConstraints}
          />
        )}
        <Link to="/">
          <button type="button" className="exit-picture-btn camera-btn">
            <img src="/assets/images/icons/return.png" alt="Revenir au site" />
          </button>
        </Link>
        {image ? (
          <div className="after-picture-btn">
            <button
              type="button"
              onClick={deletePicture}
              className="camera-btn"
            >
              <img
                src="/assets/images/icons/cancel.svg"
                alt="Supprimer et revenir à la camera"
              />
            </button>
            <Link to="/ajouter-oeuvre/formulaire">
              <button type="button" className="camera-btn">
                <img
                  src="/assets/images/icons/validate.svg"
                  alt="Valider l'oeuvre"
                />
              </button>
            </Link>
          </div>
        ) : (
          <div className="camera-bottom">
            <button
              type="button"
              onClick={capturePicture}
              className="take-picture-btn camera-btn"
            >
              <img
                src="/assets/images/icons/circle.png"
                alt="Capturer l'oeuvre"
              />
            </button>
          </div>
        )}
      </div>
    )
  );
}

export default Camera;