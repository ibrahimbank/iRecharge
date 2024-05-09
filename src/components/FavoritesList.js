import React from 'react';
import WeatherCard from './WeatherCard';

const FavoritesList = ({ favorites, onRemove }) => {
    return (
        <div>
            <h2>Favorites</h2>
            {favorites.map(city => (
                <WeatherCard key={city.id} city={city} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default FavoritesList;
