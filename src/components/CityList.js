import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import SearchBar from "./SearchBar";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, Stack,
    Typography
} from "@mui/material";
import {deleteCities, fetchCities, fetchCity, fetchUserCity, getFavCity, searchCities} from "../feature/cities/slice";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "./Spinner";
import {useNavigate} from "react-router-dom";
import {fetchPopulationData} from "../feature/cities/service";

const CityList = () => {
    const [accept, setAccept] = useState(false)
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAccept(false)
        dispatch(fetchUserCity())
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        cities,
        favCities,
        isLoading,
    } = useSelector(state => state.city)


    useEffect(() => {
        const local = localStorage.getItem("called")

        if(!local){
            setAccept(true)
        }

        dispatch(fetchCities())
        dispatch(getFavCity())
    }, [dispatch]);


    const removeCity = id => {
        dispatch(deleteCities(id))
    };

    if (accept) {
        return <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want us to use your location to show you your weather details?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={async ()=>{
                    handleClose()
                  const res =  await dispatch(fetchUserCity())
                    if(res?.payload?.message) {
                        navigate("/city-weather-details")
                    }

                }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    }

    if (isLoading) {
        return <Spinner/>;
    }

    console.log(favCities )
    return (
        <Box p={6} display={"flex"} flexDirection={"column"} gap={4}>
            <SearchBar onSearch={(e) => {
                dispatch(searchCities(e))
            }} onClick={() => {
                dispatch(fetchCities())
            }}/>
            {favCities?.length === 0 || favCities === undefined ? (
                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"}
                       height={"200px"}>
                    <Typography>No Favorites Added</Typography>
                </Stack>
            ) : <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography>Favorites Cities</Typography>
                </Grid>
                {React.Children.toArray(
                    favCities?.map(city => (
                        <Grid item xs={12} sm={6} md={4}>
                            <WeatherCard key={city.city} city={city} onRemove={removeCity}/>
                        </Grid>
                    ))
                )}
            </Grid>}
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography>Largest Cities</Typography>
                </Grid>
                {React.Children.toArray(
                    cities?.map(city => (
                        <Grid item xs={12} sm={6} md={4}>
                            <WeatherCard key={city.city} city={city} onRemove={removeCity}/>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default CityList;
