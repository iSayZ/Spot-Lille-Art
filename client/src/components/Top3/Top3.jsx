import { useEffect, useState } from "react";
import myAxios from "../../services/myAxios";
import { useBadges } from "../../contexts/BadgeContext";
import "./Top3.css";

function Top3() {
  const [topMembers, setTopMembers] = useState([]);

  useEffect(() => {
    const getTop3 = async () => {
      try {
        const response = await myAxios.get("/api/members/ranked");
        setTopMembers(response.data);
      } catch (error) {
        console.error("Erreur", error);
      }
    };
    getTop3();
  }, []);

  const { getBadgeForPoints } = useBadges();

  return (
    <div className="top3-container">
      <table className="rank-box">
        <tbody>
          {topMembers.slice(0, 3).map((member, index) => {
            const ownBadge = getBadgeForPoints(member.points);
            return (
              <tr key={member.id_member} className="rank-boxes">
                <td className="td-position">{index + 1}</td>
                <td className="td-pseudo home">{member.pseudo}</td>
                <td className="td-img">
                  <div className="user-img-ranking">
                    <img
                      src={
                        member.avatar
                          ? member.avatar
                          : "/assets/images/icons/profile.png"
                      }
                      alt="avatar"
                    />
                  </div>
                </td>
                <td className="td-points td-points-homepage">
                  {member.points}{" "}
                  <img
                    src="/assets/images/icons/coin.png"
                    alt="piece"
                    className="img-coin"
                  />{" "}
                  <p className="badge-homepage">{ownBadge.logo}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Top3;
