import React, { ReactElement, useState, useEffect } from "react";
import "./cardDetails.scss";

const CardDetails = ({ currentLocation, cardId, onClose }): ReactElement => {
  const [activeElement, setActiveElement] = useState(null);
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    if (!cardId) return;
    setActiveElement(currentLocation);

    const importImage = async () => {
      try {
        const imageModule = await import(`../../assets/${cardId}.jpg`);
        setCardImage(imageModule.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    importImage();
  }, [cardId, currentLocation]);

  return (
    <>
      <div className="cardInfo" onClick={onClose}>
        <h1>{currentLocation.title}</h1>
        <div className="locationDescription">
          <p>{currentLocation.description}</p>
        </div>
        <p className="closeCaption">Click to close</p>
        {cardImage && <img src={cardImage} alt={currentLocation.title} />}
      </div>
    </>
  );
};

export default CardDetails;
