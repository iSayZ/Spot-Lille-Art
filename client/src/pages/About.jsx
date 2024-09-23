import "./styles/About.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function About() {

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div className="about-container">
      <p>
        Bienvenue sur Spot Lille Art, votre destination en ligne pour découvrir
        et partager l'art urbain de la Métropole Européenne de Lille (MEL). Que
        vous soyez un artiste émergent, un passionné d'art urbain ou simplement
        curieux de découvrir de nouvelles œuvres, notre plateforme participative
        est là pour vous.
      </p>
      <h2 className="titles-about">À propos de Spot Lille Art</h2>
      <p>
        Spot Lille Art est bien plus qu'un simple site de référencement d'œuvres
        de street art. C'est une communauté dynamique et engagée qui célèbre la
        diversité et la créativité artistique présente dans les rues de la MEL.
        Nous mettons en lumière les oeuvres locales, les fresques emblématiques
        et les lieux où l'art urbain prend vie.
      </p>
      <div className="images-about" id="regles">
        <img
          className="img-about"
          src="https://www.sncf-connect.com/assets/styles/scale_max_width_961/public/media/2020-07/Roubaix%20Street%20Art%20%C2%A9Des%20Friches%20et%20des%20Lettres.jpg?itok=8MAH9aRw"
          alt="oeuvre de street art"
        />
        <img
          className="img-about"
          src="https://www.lescachotteriesdelille.com/wp-content/uploads/2023/12/KatAction.jpeg"
          alt="oeuvre de street art"
        />
        <img
          className="img-about"
          src="https://www.tourisme-en-hautsdefrance.com/app/uploads/crt-hautsdefrance/2020/12/thumbs/roubaix-fresque-de-tednomad--credit-roubaixtourisme-1-640x640.jpg"
          alt="oeuvre de street art"
        />
      </div>
      <h2 className="titles-about">Comment participer ?</h2>
      <p>
        C'est simple et gratuit ! En créant un compte sur Spot Lille Art, vous
        devenez membre de notre communauté artistique. Une fois inscrit, vous
        aurez accès à plusieurs fonctionnalités :
      </p>
      <ul>
        <li>
          <span className="focus-text">1.</span> Ajouter vos propres découvertes : Partagez vos trouvailles artistiques
          en capturant des photos et en ajoutant des informations sur les
          œuvres que vous rencontrez dans la région.
        </li>
        <li>
        <span className="focus-text">2.</span> Explorer l'art urbain local : Parcourez notre collection en ligne pour
          découvrir les dernières créations et les lieux
          incontournables où l'art urbain s'épanouit.
        </li>
        <li>
        <span className="focus-text">3.</span> Participer au classement : En renseignant des oeuvres, gagnez des points et obtenez des badges, <Link to="/classement" id="ranking-link">regardez ici</Link> les règles du classement afin de devenir le meilleur chasseur !
        </li>
      </ul>
      <img
        className="splash-img"
        src="assets/images/paint-splash.png"
        alt="peinture qui coule"
      />
      <h2 className="titles-about">Rejoignez-nous dès maintenant !</h2>
      <p>
        Prêt à embarquer dans cette aventure artistique ? Rejoignez-nous dès
        aujourd'hui en créant votre compte sur Spot Lille Art. Ensemble,
        explorons les rues de la MEL et célébrons l'art urbain sous toutes ses
        formes.
      </p>
      <div className="btn inscription-btn">
        <Link to="/inscription">Inscrivez-vous dès maintenant !</Link>
      </div>
      <div className="about-us">
        <p>
          Ceci est un site que nous avons réalisé dans le cadre d'un projet
          pédagogique au cours de notre formation "Développeur Web Full Stack" à
          la Wild Code School. Nous avons réalisé le front-end du site en
          utilisant React.js et Express.js pour le back-end.
        </p>
        <p>
          Site réalisé par Alexis Estrine, Elodie Régnier, Audrey Baudry et
          Sébastien Van Clemputte.
        </p>
      </div>
    </div>
  );
}

export default About;
