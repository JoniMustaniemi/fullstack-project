import { useEffect, useState } from "react";
import forest from "../../assets/enchantedgrove.jpg";

import "./infoCardContainer.scss";

const InfoCardContainer = ({ locationsInfo }) => {
  const [isScrollIncreasing, setIsScrollIncreasing] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(false);
  const [hovering, setHovering] = useState(false);
  const infoCardClass = "infoCard";
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    window.addEventListener("scroll", changeScrollValue);
  });

  const changeScrollValue = () => {
    const currentScrollY = window.scrollY;
    setIsScrollIncreasing(currentScrollY > prevScrollY);
    setPrevScrollY(currentScrollY);
  };

  /**
   * Hook to show and hide card elements when scrolling.
   * Uses resettable timer to determine card visibility state.
   * Timer resets when scrolling event is detected.
   */
  useEffect(() => {
    let timeoutId;

    // Clear existing timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set new timeout and save its ID
    timeoutId = setTimeout(() => {
      setScrollTimeout(false);
    }, 500);

    setScrollTimeout(true);

    if (isScrollIncreasing) {
      setCardsVisible(true);
    } else {
      /*
       * If there is an existing timer, clear it and set a new timeout of 500 milliseconds.
       * When the timeout expires, set timer to false and remove the cards.
       */
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setScrollTimeout(false);
        setCardsVisible(false);
      }, 500);
    }

    // Cleanup function to clear timeout on component unmount or next call of the hook
    return () => clearTimeout(timeoutId);
  }, [isScrollIncreasing]);

  const handleClick = () => {
    alert("Card clicked!");
  };

  function stopRaise() {
    clearTimeout(timeoutId); // Clear existing timeout
    timeoutId = setTimeout(() => {
      setHovering(false);
    }, 200);
  }

  function startRaise() {
    clearTimeout(timeoutId);
    setHovering(true);
  }

  return (
    <>
      {cardsVisible && locationsInfo && (
        <div className="infoCardContainer">
          {/* Map through locationsInfo and render cards */}
          {locationsInfo.map((location, index) => (
            <div
              key={index}
              className={`${infoCardClass} ${hovering ? "activeCard" : ""}`}
              onClick={handleClick}
              onMouseEnter={startRaise}
              onMouseLeave={stopRaise}
            >
              <img
                src={forest}
                alt={location.title}
                style={{
                  width: "100%", // Adjust as needed
                  height: "100%", // Adjust as needed
                  objectFit: "cover", // Adjust as needed
                }}
              />
              <h1>{location.title}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default InfoCardContainer;
