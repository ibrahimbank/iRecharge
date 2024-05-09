import axios from "axios";

export const fetchPopulationData = async () => {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities', {maxRedirects: 0});
    return response.data.data;
};

const fetchWeatherData = async (cities) => {
    const weatherPromises = cities?.sort((a, b) => b.populationCounts?.[0]?.value - a.populationCounts?.[0]?.value)?.slice(0, 15)?.map(async con => {
        try {
            const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=f318b3ec678f49a9b50193808240705&q=${con?.city}&aqi=no`);
            return {city: con.city, populationCounts: con?.populationCounts, weather: weatherResponse.data};
        } catch (err) {
            return null
        }
    });
    return Promise.all(weatherPromises);
};

const fetchCities = async () => {
    try {

        const populationData = await fetchPopulationData();

        const weatherData = await fetchWeatherData(populationData);

        const nonEmptyWeatherDats = weatherData.filter(item => item !== null)


        const combinedData = nonEmptyWeatherDats?.slice(0, 15)?.map(popData => {
            const matchingWeather = weatherData.find(weather => weather?.city === popData?.city);
            return {
                populationCounts: popData.populationCounts,
                city: popData.city,
                country: popData.country,
                weather: matchingWeather ? matchingWeather.weather : null
            };
        });


        return combinedData
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const searchCities = async (noteText) => {
   const allCities = await fetchPopulationData()
        const res = allCities.filter(city => city?.city.toLowerCase() === noteText.toLowerCase())
        const newres = await fetchWeatherData(res)

    return  newres;
};

const getCity = async (city) => {
    return city
}

const getFavCity = async (city) => {
    return city
}

const addFavCity = async (city) => {

    return city
}

const fetchWeatherDataByLocation = async () => {
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;
                const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=f318b3ec678f49a9b50193808240705&q=${latitude},${longitude}&aqi=no`);

                const populationData = await (fetchPopulationData());

                const filterCity = populationData?.filter(pop => pop?.city?.toLowerCase() === weatherResponse?.data?.location?.name?.toLowerCase())

                if (filterCity?.length === 0) {
                    resolve({error: "Can't find your location details"});
                    alert("Can't find your location details")
                    localStorage.setItem("called", "true")
                    return
                } else {
                    resolve({message: "Can't find your location details", data:filterCity?.[0]});
                    localStorage.setItem("called", "true")
                    return filterCity?.[0]
                }

            },
            (error) => {
                reject(error);
            }
        );
    });
};

const deleteCities = async (id) => {
    return id;
};

const noteService = {

    fetchCities,
    deleteCities,
    searchCities,
    getCity,
    fetchWeatherDataByLocation,
    addFavCity,
    getFavCity
};

export default noteService;