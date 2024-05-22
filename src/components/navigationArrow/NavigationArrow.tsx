import { ReactElement, useEffect, useState } from "react";
import arrowIcon from "../../assets/arrowIcon.png";
import "./navigationarrow.scss";

const NavigationArrow = (): ReactElement => {
  const [topPosition, setTopPosition] = useState<boolean>(true);
  const [bottomPosition, setBottomPosition] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    // Cleanup function to remove event listener when component unmounts.
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleScroll = (event: WheelEvent): void => {
    if (event.deltaY > 0) {
      // Scrolling down
      setTopPosition(false);
      setBottomPosition(true);
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    } else {
      // Scrolling up
      setTopPosition(true);
      setBottomPosition(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleClick = () => {
    if (window.scrollY <= 0) {
      // If not scrolled to the bottom, scroll down.
      setTopPosition(false);
      setBottomPosition(true);
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    } else {
      // If scrolled to the bottom, scroll back to the top.
      setTopPosition(true);
      setBottomPosition(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        className={`arrowIconContainer ${
          bottomPosition ? "arrowBottomPosition" : "arrowTopPosition"
        }`}
        onClick={handleClick}
      >
        <img className="arrowIcon" src={arrowIcon} />
      </div>
    </>
  );
};

export default NavigationArrow;
