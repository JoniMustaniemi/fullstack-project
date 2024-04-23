import { useEffect } from "react";
import Banner from "./components/banner/Banner";
import BodyBackground from "./components/bodyBackground/BodyBackground";
import { addDragPreventionToImages, preventDrag } from "./utils/Utils";

import "./app.scss";

function App() {
  useEffect(() => {
    const cleanup = addDragPreventionToImages(preventDrag);
    return cleanup;
  }, []);

  return (
    <>
      <Banner />
      <BodyBackground />
    </>
  );
}

export default App;
