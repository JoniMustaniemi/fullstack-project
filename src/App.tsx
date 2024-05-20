import { useEffect, useState } from "react";
import Banner from "./components/banner/Banner";
import BodyBackground from "./components/bodyBackground/BodyBackground";
import InfoCardContainer from "./components/infocardContainer/infoCardContainer";
import { addDragPreventionToImages, preventDrag } from "./utils/Utils";
import { getLocationData } from "./utils/Utils";
import "./app.scss";

function App() {
  const [locationsData, setLocationsData] = useState(null);

  useEffect(() => {
    const cleanup = addDragPreventionToImages(preventDrag);
    return cleanup;
  }, []);

  useEffect(() => {
    // Fetch location data only if it's not already cached or if it's forced to re-fetch.
    if (!locationsData) {
      getLocationData()
        .then((data) => {
          setLocationsData(data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    }
  }, [locationsData]);

  return (
    <>
      <Banner />
      <BodyBackground />
      <InfoCardContainer locationsInfo={locationsData} />
    </>
  );
}

export default App;
