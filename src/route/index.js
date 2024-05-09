import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import CityWeatherDetails from "../pages/city-weather-details";
import CityList from "../components/CityList";

function Index() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<CircularProgress h="150px" w="100%" />}>
                        <CityList />
                    </Suspense>
                }
            />

            <Route
                path="/city-weather-details"
                element={
                    <Suspense fallback={<CircularProgress h="150px" w="100%" />}>
                        <CityWeatherDetails />
                    </Suspense>
                }
            />
        </Routes>
    );
}

export default Index;