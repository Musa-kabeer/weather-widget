import { useEffect, useState } from 'react';
import { getWeather, getCountryData } from './services/getWeather';

function App() {
  const [country, setCountry] = useState('');
  const [searchLatLng, setSearchLatLng] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  const { main, sys, weather } = weatherData;

  useEffect(() => {
    const query = searchLatLng
      ? getWeather(searchLatLng)
      : getWeather();

    const fetchData = async () => {
      const weather = await query;

      setWeatherData(weather);
    };

    fetchData();
  }, [searchLatLng]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await getCountryData(country);

    setSearchLatLng(data);

    return setCountry(' ');
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          defaultValue={''}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Search for any country of your choice..."
        />
      </form>

      <div className="weatherContainer">
        <div className="todayForcast">
          <div className="sun">
            <img
              src={
                weather?.at(0).main === 'Rain'
                  ? 'rain.svg'
                  : 'sun.svg'
              }
              alt="sun"
            />
          </div>

          <div className="text">
            <p>Today</p>
            <h2>{sys?.country}</h2>

            <p>
              Temperature: <span>{main?.temp}°C</span>
            </p>
            <p>
              Humidity: <span>{main?.humidity}g.m-3</span>
            </p>
            <p>
              Pressure: <span>{main?.pressure}N/m2</span>
            </p>
            <p>
              Description: <span>{weather?.at(0).description}.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
