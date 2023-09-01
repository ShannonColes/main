import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
// import context ----------------------------------------------------------------

import { useAuthContext } from "./hooks/useAuthContext";
// import components ----------------------------------------------------------------
import headerImage from "./assets/header-background.png";
import userImage from "./assets/user.png";

// Landing image + header
// h1 students portfolio
// grid to display students
// api call to render the students into a grid of display cards & student names/details
// student cards button to link to the portfolio page of that student.

const Homepage = () => {
  const getRandomColour = () => {
    const randomIndex = Math.floor(Math.random() * colourOptions.length);
    return colourOptions[randomIndex];
  };
  const colourOptions = ["#71B548", "#FF9713", "#014399", "#F14E3A", "#EF38FF"];
  // const state
  const { profiles } = useAuthContext();

  console.log("userProfiles:", profiles);
  // console.log("profileElements:", profileElements);
  const randomColour = getRandomColour();
  if (!profiles) {
    return (
      <div className="loader-container">
        <InfinitySpin
          visible={true}
          color={randomColour}
          size={100}
          speed={1}
          style={{ display: "block", margin: "0 auto" }}
        />
      </div>
    );
  }

  const profileElements = profiles.map((profile) => (
    <div
      key={profile.email}
      className="grid-item"
      style={{ backgroundColor: randomColour }}>
      <img className="projImage" src={userImage} />
      <p className="projTitle">{profile.name}</p>
      <p className="projDesc">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <Link
        key={profile._id}
        to={`/profile/${profile.email}`}
        className="view-btn">
        View More
      </Link>
    </div>
  ));

  return (
    <>
      <div className="header-image">
        <img className="headerImg" src={headerImage} />
        <h2 className="header">
          Yoobee College of Creative Innovation is New Zealand’s largest
          specialist creative and technology college.
        </h2>
      </div>
      <h1 className="section-heading">Users Profiles</h1>
      <div className="students-grid-container">{profileElements}</div>
    </>
  );
};
export default Homepage;
