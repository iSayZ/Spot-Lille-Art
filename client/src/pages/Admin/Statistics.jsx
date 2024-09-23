import { useEffect, useState } from "react";
import myAxios from "../../services/myAxios";
import "./styles/Statistics.css";

function Statistics() {
  const [statistics, setStatistics] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await myAxios.get("/api/statistics");
      setStatistics(response.data);
    };

    getData();
  }, []);
  return (
    <div className="statistics">
      <div className="login-img-container stats">
        <img
          className="login-img"
          src="/assets/images/artworks/artwork6.png"
          alt="street art représentant un DJ"
        />
      </div>
      {statistics && (
        <div className="statistics-container">
          <h2>Statistiques</h2>
          <div className="statistics-block">
            <div className="statistic-row">
              <p>Nombre d'inscrits au total :</p>
              <p className="stats-result">
                {statistics.members[0].total_registered}
              </p>
            </div>
            <hr />
            <div className="statistic-row">
              <p>Nombre d'inscrits ce mois-ci :</p>
              <p className="stats-result">
                {statistics.members[0].month_registered}
              </p>
            </div>
            <hr />
            <div className="statistic-row">
              <p>Nombre d'inscrits cette semaine :</p>
              <p className="stats-result">
                {statistics.members[0].week_registered}
              </p>
            </div>
          </div>
          <div className="statistics-block">
            <div className="statistic-row">
              <p>Nombre d'oeuvres postées au total :</p>
              <p className="stats-result">
                {statistics.artworks[0].total_artworks}
              </p>
            </div>
            <hr />
            <div className="statistic-row">
              <p>Nombre d'oeuvres postées ce mois-ci :</p>
              <p className="stats-result">
                {statistics.artworks[0].month_artworks}
              </p>
            </div>
            <hr />
            <div className="statistic-row">
              <p>Nombre d'oeuvres postées cette semaine :</p>
              <p className="stats-result">
                {statistics.artworks[0].week_artworks}
              </p>
            </div>
          </div>
          <div className="statistics-block">
            <div className="statistic-row">
              <p>Nombre d'oeuvres recouvertes :</p>
              <p className="stats-result">
                {statistics.covered[0].total_artworks_covered}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
