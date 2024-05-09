import React, { useState } from 'react';
import {Box, Button, TextField} from "@mui/material";

const SearchBar = ({ onSearch,onClick}) => {
    const [query, setQuery] = useState('');

    const handleInputChange = event => {
        setQuery(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSearch(query);
        setQuery('');
    };

    return (
        <Box component={"form"}  onSubmit={handleSubmit} display={"flex"} flexDirection={"row"} gap={"10px"} alignItems={"center"} justifyContent={"center"}>
            <TextField variant={"outlined"} type="text" size={"small"} value={query} onChange={handleInputChange} placeholder="Search for a city..." />
            <Button variant={"contained"} type="submit">Search</Button>
            <Button variant={"outlined"} color={"error"} type={'button'} onClick={onClick}>Reset</Button>
        </Box>
    );
};

export default SearchBar;
