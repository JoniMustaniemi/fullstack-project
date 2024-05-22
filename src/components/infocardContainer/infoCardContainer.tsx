import { useEffect, useState, useRef } from "react";
import CardDetails from "../cardDetails/CardDetails";
import enchantedforest from "../../assets/enchantedgrove.jpg";
import elarionpeaks from "../../assets/elarionpeaks.jpg";
import serendoralake from "../../assets/serendoralake.jpg";
import elysianplains from "../../assets/elysianplains.jpg";
import aureliacity from "../../assets/aureliacity.jpg";

import "./infoCardContainer.scss";

const InfoCardContainer = ({ locationsInfo }) => {
  const [isScrollIncreasing, setIsScrollIncreasing] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const [cardsVisible, setCardsVisible] = useState<boolean>(false);
  const [hoveringCardId, setHoveringCardId] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<any[]>([]);
  const [loadedImages, setLoadedImages] = useState<any[]>([]);
  const [detailsActive, setDetailsActive] = useState<boolean>(false);
  let timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    window.addEventListener("scroll", changeScrollValue);
    return () => window.removeEventListener("scroll", changeScrollValue);
  }, [prevScrollY]);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (isScrollIncreasing) {
      setCardsVisible(true);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
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

  const getTitleFromPath = (path: string) => {
    const parts = path.split("/");
    return parts[parts.length - 1].split(".")[0];
  };

  const getImageByTitle = (title: string): string => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "");
    return loadedImages.find((imgObj) => imgObj.title === formattedTitle)
      ?.image;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  const stopRaise = (event: React.MouseEvent<HTMLElement>) => {
    const currentTargetId = event.currentTarget.id;
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      if (hoveringCardId === currentTargetId) {
        setHoveringCardId(null);
      }
    }, 200);
  };

  const startRaise = (event: React.MouseEvent<HTMLElement>): void => {
    const currentTargetId: string = event.currentTarget.id;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setHoveringCardId(currentTargetId);
  };

  const changeScrollValue: () => void = () => {
    const currentScrollY = window.scrollY;
    setIsScrollIncreasing(currentScrollY > prevScrollY);
    setPrevScrollY(currentScrollY);
  };

  const closeDetails: () => void = () => {
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
