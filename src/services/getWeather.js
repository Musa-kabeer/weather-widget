import { API_KEY } from '../helper/constant';

let lat, lng;

function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        lat = latitude;
        lng = longitude;
      },
      (err) => alert(err.message)
    );
  }
}

getPosition();

export const getWeather = async (latlng) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        latlng ? latlng[0] : lat
      }&lon=${latlng ? latlng[1] : lng}&appid=${API_KEY}`
    );

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCountryData = async (name) => {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${name.toLowerCase()}?fullText=true`
    );

    const data = await res.json();

    const [lat, lng] = data[0].capitalInfo.latlng;

    return [lat, lng];
  } catch (err) {
    alert('Privided country cannot be found 🙇‍♀️');
  }
};
