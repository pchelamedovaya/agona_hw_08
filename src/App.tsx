import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css'
import Input from './components/Input/Input.tsx';
import Button from './components/Button/Button.tsx';
import Display from "./components/Display/Display.tsx";
import {CityData, WeatherData} from "./types.ts";

function App() {
    const OPENWEATHER_KEY = 'OPENWEATHER_KEY';
    const RAPIDAPI_KEY = 'RAPIDAPI_KEY';

    const [city, setCity] = useState<string>('');
    const [cityOptions, setCityOptions] = useState<CityData[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
                    headers: {
                        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com', 'x-rapidapi-key': RAPIDAPI_KEY,
                    },
                });
                setCityOptions(response.data.data);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchCities();
    }, []);

    const handleInputChange = (value: string) => {
        setCity(value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (<div className={'container'}>
        <h1>The weather of any city in the world</h1>
        <div className={'input-container'}>
            <Input placeholder="Search city" value={city} onChange={handleInputChange}/>
            <Button onClick={handleSearch}>Search</Button>
        </div>
        <ul>
            {cityOptions.map((city: CityData) => (<li key={city.id}>{city.city}</li>))}
        </ul>
        {weatherData && <Display data={weatherData}/>}
    </div>);
}

export default App;