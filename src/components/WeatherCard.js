import React from 'react';
import {Button, Card, IconButton, Stack, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {addFavCity, fetchCity} from "../feature/cities/slice";
import {useDispatch} from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';

const WeatherCard = ({ city, onRemove }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    return (
        <Card sx={{cursor:"pointer", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",position:"relative"}} >
            <Stack p={2} spacing={2} direction={"column"} alignItems={"center"} justifyContent={"center"} onClick={()=>{
                dispatch(fetchCity(city))
                navigate("/city-weather-details")
            }}>
                <Typography variant={"h4"} sx={{fontSize:"18px"}}>{city.city}</Typography>
                <Typography variant={"subtitle1"} sx={{fontSize:"14px"}}>Temperature: {city?.weather?.current?.temp_c}°C</Typography>
                <Typography variant={"subtitle2"} sx={{fontSize:"14px"}}>Population: {new Intl.NumberFormat().format(city?.populationCounts?.[0]?.value)}</Typography>

            </Stack>
            <Stack p={2} spacing={2} direction={"column"} alignItems={"center"} justifyContent={"center"} >
            <Button variant={"contained"} size={"small"} sx={{background: theme.palette.error.main,width:"30%"}}  onClick={() => onRemove(city.city)}>Remove</Button>
                <IconButton aria-label="delete" size="small" sx={{position:"absolute", top:"-1rem",right:0}} onClick={()=>{
                   dispatch(addFavCity(city))
                }} >
                    <FavoriteIcon fontSize="inherit" />
                </IconButton>
            </Stack>
            </Card>
    );
};

export default WeatherCard;
