import React from 'react';
import styles from './Display.module.css'
import {DisplayProps} from '../../types.ts'

const Display: React.FC<DisplayProps> = ({data}) => {
    return (<div className={styles.container}>
        <h2>Weather Information:</h2>
        <p>Temperature: {data.main.temp}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Condition: {data.weather[0].main}
            {data.weather && <span> ({data.weather[0].description})</span>}
        </p>
        {data.wind && <p>Wind Speed: {data.wind.speed} m/s</p>}
    </div>);
};

export default Display;