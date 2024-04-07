import './App.css';
import { useState } from 'react';

const api = {
  key:'18799736e5181461241f53c39e40b1e7',
  base : 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null); // Initialize weather state as null initially

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === 200) { // Check if API response is successful
          setWeather(result);
        } else {
          // Handle error case, maybe show a message to the user
          console.error('Weather data not found');
        }
      })
      .catch((error) => {
        // Handle fetch error
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Weather App</h2>
        {/* Search box */}
        <div>
          <input 
            type="text"  
            placeholder="Enter city/town"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* Display weather information */}
        {weather && (
          <div>
            {/* Location */}
            <p>{weather.name}</p>
            {/* Temperature */}
            <p>{weather.main.temp}</p>
            {/* Weather condition */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
