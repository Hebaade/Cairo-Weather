import "./App.css";
import {  useEffect,useState } from "react";
import CloudIcon from '@mui/icons-material/Cloud';
import Container from "@mui/material/Container";
import axios from "axios";
import moment from "moment"; 
import "moment/locale/ar";   
import "moment/locale/en-gb";

import { useTranslation } from 'react-i18next';

let axiosConnection = null;
function App() {
    const { t, i18n } = useTranslation();
  const apiKey = import.meta.env.VITE_WEATHER_API;
  const [temp,setTemp]=useState(null)
  const [min,setMin]=useState(null)
  const [max,setMax]=useState(null)
  const [desc,setDesc]=useState("")
  const [icon,setIcon]=useState("")
 function toggleLanguage() {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang)
  }

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=30.044&lon=31&appid=${apiKey}`,
        {
cancelToken: new axios.CancelToken((c) => {
            axiosConnection = c;
          }),
        }
      )
      .then((res) => {
        setTemp(Math.round(res.data.main.temp-272.15))
        setMin(Math.round(res.data.main.temp_min-272.15))
        setMax(Math.round(res.data.main.temp_max-272.15))
        setIcon(res.data.weather[0].icon)
        setDesc(res.data.weather[0].description)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      console.log("cleanup");
        axiosConnection();
      }
  }, []);
  return (
    <>
      <Container maxWidth="sm">
        <div
          className="content-container"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          style={{
            height: "100vh",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <div className="card">
            <div className="content">
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
              >
                <h1>{t("Cairo")}</h1>
                <h4 style={{ marginLeft: "20px" }}>  {moment().locale(i18n.language === "ar" ? "ar" : "en-gb")
           .format("MMMM Do YYYY, h:mm:ss a")}</h4>
              </div>
              <hr />
              <div className="weather">
                <div>
               <div className="temp">
                <h2>{temp}°</h2>
                <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="img" />
               </div>
                <h3>{t(desc)}</h3>
                <div className="minmax">
                  <h4>{t("Min")}:{min}</h4>
                  <h4>{t("Max")}:{max}</h4>
                  </div>
                </div>
                
                  <CloudIcon style={{ fontSize: 200, color:'white' }} className="cloud" />
                
              </div>
            </div>
          </div>
         <button className="trans" onClick={() => toggleLanguage()}>
  {i18n.language === 'ar' ? 'English' : 'عربي'}
</button>

        </div>
      </Container>
    </>
  );
}

export default App;
