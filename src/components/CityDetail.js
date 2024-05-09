import React, { useState } from 'react';

const CityDetail = ({ city }) => {
    const [notes, setNotes] = useState('');

    const handleNotesChange = event => {
        setNotes(event.target.value);
    };

    return (
        <div>
            <h2>{city.name}</h2>
            <p>Temperature: {city.temperature}</p>
            <textarea value={notes} onChange={handleNotesChange}></textarea>
            <button>Save Notes</button>
        </div>
    );
};

export default CityDetail;
