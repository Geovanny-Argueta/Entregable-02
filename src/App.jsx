import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import bgImage from "./VIdeo/production ID_4828773.mp4";

function App() {
  const [data, setData] = useState({});
  const [cel, setCel]   = useState(0)
  const [buttonFare, setButtonFare] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01a8ab82812e3d334b454a44efb8c672`
        )
        .then((res) => {
          setData(res.data);
          setCel(res.data.clouds.all)
        });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(data);

  const convert = () =>{
    if(buttonFare){
      setCel((cel * 1.8) + 32)
      setButtonFare(false)
    }else{
      setCel (data.clouds.all)
      setButtonFare(true)
    }
  }

  return (
    <div className="App">
      <video autoPlay loop muted>
        <source src={bgImage} type="video/mp4" />
      </video>
      <div className="appMainContenedor">
        <div className="appContainer">
          <div className="appImg">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div className="appInfoContainer">
            <h1>Weather App</h1>
            <h2>{data.name}</h2>
            <h2>{data.sys?.country}</h2>
            <div className="appwords">
              <b className="appwords">Wind Speed: </b>
              {data.wind?.speed}
            </div>
            <div className="appwords">
              <b className="appwords">Pressure: </b>
              {data.main?.pressure}
            </div>
            <div className="appwords">
              <b className="appwords">Tempeture: </b>
              {data.main?.temp}
            </div>
          </div>
        </div>
        <div className="appwordsMain">
          <b className="appwordsMain">F°: </b>
          {cel}
        </div>
        <button onClick={convert}>Degrees °F/°C</button>
      </div>
    </div>
  );
}

export default App;
