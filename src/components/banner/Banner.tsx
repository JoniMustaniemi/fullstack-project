import { ReactElement, useEffect } from "react";
import bannerImage from "../../assets/backgroundImage.jpg";
import "./banner.scss";

const Banner = (): ReactElement => {
  const bannerClass = "banner";

  // Adds event listener to prevent dragging.
  useEffect(() => {
    const banner = document.querySelector(`.${bannerClass}`);
    if (!banner) return;
    banner.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  }, []);

  return (
    <div className={bannerClass}>
      <img src={bannerImage} />
    </div>
  );
};

export default Banner;
