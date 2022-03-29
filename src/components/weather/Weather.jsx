import React, { useEffect, useState } from "react";
import './Weather.scss';


const Weather = () => {
    let today = new Date()
    let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({});
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [dateToday, setDateToday] = useState(date);

    useEffect(() => {
        setDateToday(today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
    }, [])

    const api = {
        url: "https://api.openweathermap.org/data/2.5/",
        key: "f0d13552fca2a73d7f1f708b4f45414f",
    }
    const iconUrl = "https://openweathermap.org/img/w/";

    const getInput = (e) => {
        setInput(e.target.value)
    };

    const getWeatherData = (e) => {
        if (e.key === "Enter" && input === "") {
            setErrorMsg("Input cannot be Empty")
            setError(true)
        }
        if (e.key === "Enter" && input !== "") {
            setIsloading(true);
            setError(true);
            fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Failed to Fetch Data")
                    }
                    return res.json();
                }).then((data) => {
                    console.log(data);
                    setWeather(data);
                    setInput("");
                    setError(false);
                    setIsloading(false);
                })
                .catch((err) => {
                    console.log(err.message);
                    setError(true);
                    setErrorMsg(err.message);
                    setIsloading(false);
                })
        }
    }

    return (
        <div className="Container">
            <div className="col-8 col-lg-3 col-md-4 a">
                <div className="Toppart my-3">
                    <h1>Weather App</h1>
                    <p>{dateToday}</p>

                    <input type="text"
                        placeholder="Search city name"
                        onChange={getInput}
                        value={input}
                        onKeyPress={getWeatherData}
                    />
                </div>
                {error ? (
                    <p className={errorMsg !== "" ? "error" : ""}>{errorMsg}</p>
                ) : (
                    <div className="lowerpart my-4">
                        <h3>{weather.name},{weather.sys.country}</h3>
                        <div className="figure">
                            <img src={iconUrl + weather.weather[0].icon + ".png"} alt={weather.weather[0].main} />
                        </div>
                        <span>Temp: {Math.round(weather.main.temp)} &#8451;</span>
                        <span>Weather: {weather.weather[0].main}</span>
                        <span>Temp Range: {Math.round(weather.main.temp_min)}&#8451;/{Math.round(weather.main.temp_max)}&#8451;</span>
                    </div>
                )}
                {isloading && <h3>Loading...</h3>}
            </div>
        </div>
    );
}

export default Weather;