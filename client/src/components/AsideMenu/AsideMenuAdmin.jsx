import { Link } from "react-router-dom";
import "./AsideMenu.css";

function AsideMenuAdmin() {
  return (
    <aside className="aside-menu-container">
      <div className="aside-menu" role="presentation">
        <div className="aside-menu-top-admin">
          <Link to="/admin/statistiques">Statistiques</Link>
          <Link to="/admin/oeuvres-a-valider">Oeuvres à valider</Link>
          <Link to="/admin/oeuvres-signalees">Oeuvres signalées</Link>
          <Link to="/admin/membres">Membres</Link>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenuAdmin;
