import React, { useState } from "react";
import Header from "../components/Layouts/Header";
import styles from "../styles/style";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage = () => {
  //const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] md:w-[335px] sticky md:mt-0 mt-[18%]">
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
