import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./styles/Ranking.css";
import { useBadges } from "../contexts/BadgeContext";

function Ranking() {
  const rankingData = useLoaderData();
  const [pagination, setPagination] = useState(1);
  const limit = 8;

  /* CALCULATE TOTAL PAGES */
  const totalPages = Math.ceil(rankingData.length / limit);

  /* PAGINATION */
  const paginate = (array, paginationFromState, limitArg) => {
    const offset = (pagination - 1) * limitArg;
    return array.slice(offset, offset + limitArg);
  };

  /* RANKING ON THIS PAGE */
  const paginatedRanking = paginate(rankingData, pagination, limit);

  /* CLICK TO CHANGE THE PAGE */
  const handlePagination = (event, value) => {
    setPagination(value);
  };

  const { badges, getBadgeForPoints } = useBadges();

  return (
    <div className="rank-container">
      <div className="rank-display-columns">
        <div className="rank-explain-box">
          <div className="rank-explain">
            <div className="points-explain">
              <h3>Comment gagner des points ?</h3>
              <br />
              <p>1 oeuvre ajoutée = 5 points</p>
              <p>1 oeuvre signalée disparue = 3 points</p>
            </div>
            <div className="badges-explain">
              <h3>Les badges</h3>
              <br />
              {badges.map((badge) => (
                <p key={badge.range} className="badge-info">
                  {badge.range}
                  <img
                    src="/assets/images/icons/coin.png"
                    alt="badge"
                    className="img-coin"
                  />
                  = {badge.name} {badge.logo}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="ranking-pagination">
          <h2 className="classement-title">Classement</h2>
          <table className="rank-box">
            <tbody>
              {paginatedRanking.map((member, index) => {
                const ownBadge = getBadgeForPoints(member.points);
                const absoluteIndex = (pagination - 1) * limit + index + 1;
                return (
                  <tr key={member.id_member} className="rank-boxes">
                    <td className="td-position">{absoluteIndex}</td>
                    <td className="td-pseudo">{member.pseudo}</td>
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
                    <td className="td-points">
                      {member.points}{" "}
                      <img
                        src="/assets/images/icons/coin.png"
                        alt="piece"
                        className="img-coin"
                      />{" "}
                    </td>
                    <td className="td-badge">
                      {ownBadge ? ownBadge.logo : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            {rankingData > limit ? (
              <Stack spacing={2} className="pagination">
                <Pagination
                  count={totalPages}
                  color="primary"
                  page={pagination}
                  onChange={handlePagination}
                />
              </Stack>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
