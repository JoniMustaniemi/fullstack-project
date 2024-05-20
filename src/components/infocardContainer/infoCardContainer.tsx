import { useEffect, useState, useRef } from "react";
import CardDetails from "../cardDetails/CardDetails";
import enchantedforest from "../../assets/enchantedgrove.jpg";
import elarionpeaks from "../../assets/elarionpeaks.jpg";
import serendoralake from "../../assets/serendoralake.jpg";
import elysianplains from "../../assets/elysianplains.jpg";
import aureliacity from "../../assets/aureliacity.jpg";

import "./infoCardContainer.scss";

const InfoCardContainer = ({ locationsInfo }) => {
  const [isScrollIncreasing, setIsScrollIncreasing] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(false);
  const [hoveringCardId, setHoveringCardId] = useState(null);
  const [activeLocation, setActiveLocation] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);
  const [detailsActive, setDetailsActive] = useState(false);
  let timeoutId = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", changeScrollValue);
    return () => window.removeEventListener("scroll", changeScrollValue);
  }, [prevScrollY]);

  useEffect(() => {
    let timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setScrollTimeout(false);
    }, 500);

    setScrollTimeout(true);

    if (isScrollIncreasing) {
      setCardsVisible(true);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setScrollTimeout(false);
        setCardsVisible(false);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [isScrollIncreasing]);

  useEffect(() => {
    const images = [
      enchantedforest,
      elarionpeaks,
      serendoralake,
      elysianplains,
      aureliacity,
    ];
    const loadedImagesPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () =>
          resolve({ title: getTitleFromPath(image), image: img });
        img.onerror = (error) => reject(error);
      });
    });

    Promise.all(loadedImagesPromises)
      .then((images) => {
        setLoadedImages(images);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });
  }, []);

  const getTitleFromPath = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1].split(".")[0];
  };

  const getImageByTitle = (title) => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "");
    return loadedImages.find((imgObj) => imgObj.title === formattedTitle)
      ?.image;
  };

  const handleClick = (event) => {
    const formattedId = event.currentTarget.id
      .toLowerCase()
      .replace(/\s+/g, "");

    for (const location of locationsInfo) {
      const formattedTitle = location.title.toLowerCase().replace(/\s+/g, "");

      if (formattedTitle === formattedId) {
        setDetailsActive(true);
        setActiveLocation(location);
        return;
      }
    }

    console.log("Location not found in locationsInfo array.");
  };

  function stopRaise(event) {
    const currentTargetId = event.currentTarget.id;
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      if (hoveringCardId === currentTargetId) {
        setHoveringCardId(null);
      }
    }, 200);
  }

  function startRaise(event) {
    const currentTargetId = event.currentTarget.id;
    clearTimeout(timeoutId.current);
    setHoveringCardId(currentTargetId);
  }

  const changeScrollValue = () => {
    const currentScrollY = window.scrollY;
    setIsScrollIncreasing(currentScrollY > prevScrollY);
    setPrevScrollY(currentScrollY);
  };

  const closeDetails = () => {
    setDetailsActive(false);
  };

  return (
    <>
      {cardsVisible && locationsInfo && (
        <div className="infoCardContainer">
          {locationsInfo.map((location, index) => (
            <div
              key={index}
              className={`infoCard ${
                hoveringCardId ===
                location.title.toLowerCase().replace(/\s+/g, "")
                  ? "activeCard"
                  : ""
              }`}
              id={location.title.toLowerCase().replace(/\s+/g, "")}
              onClick={handleClick}
              onMouseEnter={startRaise}
              onMouseLeave={stopRaise}
            >
              {getImageByTitle(location.title) && (
                <img
                  src={getImageByTitle(location.title).src}
                  alt={location.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              <h1>{location.title}</h1>
            </div>
          ))}
        </div>
      )}
      {detailsActive && (
        <CardDetails
          currentLocation={activeLocation}
          cardId={activeLocation["title"].toLowerCase().replace(/\s+/g, "")}
          onClose={() => {
            closeDetails();
          }}
        />
      )}
    </>
  );
};

export default InfoCardContainer;
