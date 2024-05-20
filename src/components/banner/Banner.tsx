import { ReactElement } from "react";
import NavigationArrow from "../navigationArrow/NavigationArrow";
import reactIcon from "../../assets/reactIcon.png";
import typescriptIcon from "../../assets/typescriptIcon.png";
import nodeIcon from "../../assets/nodeIcon.png";
import postgreIcon from "../../assets/postgreIcon.png";

import "./banner.scss";

const Banner = (): ReactElement => {
  return (
    <>
      <div className="banner" />
      <div className="bannertxt">
        <h1>Full stack demo project</h1>
        <div className="technologyIconWrapper">
          <img className="reactIcon" src={reactIcon} />
          <img className="tsIcon" src={typescriptIcon} />
          <img className="nodeIcon" src={nodeIcon} />
          <img className="postgreIcon" src={postgreIcon} />
        </div>
      </div>
      <NavigationArrow />
    </>
  );
};

export default Banner;
