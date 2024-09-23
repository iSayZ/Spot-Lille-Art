import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import myAxios from "../../services/myAxios";
import "./styles/Members.css";

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const [membersResponse] = await Promise.all([
        myAxios.get(`/api/members/last-register`),
      ]);
      setMembers(membersResponse.data);
    };

    getData();
  }, []);

  const handleBanUser = async (memberId) => {
    try {
      await myAxios.put(`/api/accounts/ban/${memberId}`);
      // Update membrers after ban
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id_member === memberId ? { ...member, banned: 1 } : member
        )
      );
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors du bannissement du membre :", error);
    }
  };

  // PAGINATION
  const [pagination, setPagination] = useState(1);
  const limit = 6;

  /* CALCULATE TOTAL PAGES */
  const totalPages = Math.ceil(members.length / limit);

  /* PAGINATION */
  const paginate = (array, paginationFromState, limitArg) => {
    const offset = (pagination - 1) * limitArg;
    return array.slice(offset, offset + limitArg);
  };

  /* RANKING ON THIS PAGE */
  const paginatedMembers = paginate(members, pagination, limit);

  /* CLICK TO CHANGE THE PAGE */
  const handlePagination = (event, value) => {
    setPagination(value);
  };

  return (
    <div>
      <div>
        <table className="table-global">
          <thead>
            <tr>
              <th className="table-title">ID</th>
              <th className="table-title">Avatar</th>
              <th className="table-title">Prénom</th>
              <th className="table-title">Nom</th>
              <th className="table-title">Pseudo</th>
              <th className="table-title">Ville</th>
              <th className="table-title">Code postal</th>
              <th className="table-title">Email</th>
              <th className="table-title">Date de création</th>
              <th className="table-title">Bannir le membre</th>
            </tr>
          </thead>
          <tbody className="tbl-content">
            {members &&
              paginatedMembers.map((member) => (
                <tr
                  key={member.id_member}
                  style={{
                    backgroundColor: member.banned ? "#e5e5e5" : "white",
                  }}
                >
                  <td className="table-info">{member.id_member}</td>
                  <td className="table-info">
                    <div className="table-avatar">
                      <img
                        src={
                          member.avatar
                            ? member.avatar
                            : "/assets/images/icons/profile.png"
                        }
                        alt="avatar du membre"
                      />
                    </div>
                  </td>
                  <td className="table-info">{member.firstname}</td>
                  <td className="table-info">{member.lastname}</td>
                  <td className="table-info">{member.pseudo}</td>
                  <td className="table-info">{member.city}</td>
                  <td className="table-info">{member.postcode}</td>
                  <td className="table-info">{member.email}</td>
                  <td className="table-info">{member.date_creation}</td>
                  <td className="table-info">
                    {member.banned === 0 ? (
                      <DeleteForeverIcon
                        onClick={() => handleBanUser(member.id_member)}
                        style={{
                          color: "#666",
                          fontSize: 35,
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <p style={{ color: "red", fontWeight: "600" }}>
                        Membre banni
                      </p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {members > limit ? (
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
  );
}

export default Members;
