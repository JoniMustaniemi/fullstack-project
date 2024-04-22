import Banner from "./components/banner/Banner";
import "./app.scss";
import backgroundImage2 from "./assets/backgroundImage_2.jpg"

function App() {
  return (
    <>
      <Banner />
      <div className="backgroundImage">
      <img src={backgroundImage2} />
      </div>
     
    </>
  );
}


export default App;
