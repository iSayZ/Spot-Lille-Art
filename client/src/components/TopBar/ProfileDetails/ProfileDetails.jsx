import "./ProfileDetails.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import MenuList from "../../MenuList/MenuList";
import myAxios from "../../../services/myAxios";

function ProfileDetails() {
  const { auth } = useAuth();
  const [openMenuList, setOpenMenuList] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getData = async () => {
      const member = await myAxios.get(
        `/api/members/${auth.account.id_member_fk}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setProfile(member.data);
    };
    if(auth.account.id_member_fk){
      getData()
    };
  }, [auth]);

  const handleClick = () => {
    setOpenMenuList(!openMenuList);
  };

  return (
    <div>
      {profile && (
        <div
          role="button"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "p") {
              handleClick();
            }
          }}
          onClick={handleClick}
          className="profile-details"
          id={openMenuList ? "is-open" : ""}
        >
          <div className="profile-picture">
            {profile.avatar ? (
              <img src={profile.avatar} alt={`Avatar de ${profile.pseudo}`} />
            ) : (
              <img
                src="/assets/images/icons/profile.png"
                alt={`Avatar de ${profile.pseudo}`}
              />
            )}
          </div>
          <p className="profile-info">
            <span id="pseudo">{profile.pseudo}</span>
            {profile.points}
            <span>
              <img src="/assets/images/icons/coin.png" alt="Jetons" id="coin" />
            </span>
          </p>
          {openMenuList && <MenuList setOpenMenuList={setOpenMenuList} />}
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
