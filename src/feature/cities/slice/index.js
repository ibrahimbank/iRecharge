import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import citiesService from "../service";

const initialState = {
    cities: [],
    favCities: [],
    city:{},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//1. get cities
export const fetchCities = createAsyncThunk(
    "cities/getAll",
    async (_, thunkAPI) => {
        try {
            return await citiesService.fetchCities();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchCity = createAsyncThunk(
    "cities/getOne",
    async (city, thunkAPI) => {
        try {
            return await citiesService.getCity(city);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getFavCity = createAsyncThunk(
    "cities/getFav",
    async (city, thunkAPI) => {
        try {
            return await citiesService.getFavCity();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const addFavCity = createAsyncThunk(
    "cities/addFav",
    async (city, thunkAPI) => {
        try {

            return await citiesService.addFavCity(city);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchUserCity = createAsyncThunk(
    "cities/getUserCity",
    async (city, thunkAPI) => {
        try {
            return await citiesService.fetchWeatherDataByLocation();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


//search cities
export const searchCities = createAsyncThunk(
    "cities/search",
    async (e , thunkAPI) => {
        try {

            return await citiesService.searchCities(e);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCities = createAsyncThunk(
    "cities/delete",
    async (id , thunkAPI) => {
        try {

            return await citiesService.deleteCities(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const citiesSlice = createSlice({
    name: 'city',
    initialState: initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCities.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(fetchCity.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchCity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.city = action.payload;
            })
            .addCase(fetchCity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(fetchUserCity.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchUserCity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.city = action.payload;
            })
            .addCase(fetchUserCity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(searchCities.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(searchCities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cities = (action.payload);
            })
            .addCase(searchCities.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }) .addCase(deleteCities.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cities = state.cities.filter((city) => city.city.toLowerCase() !== action.payload?.toLowerCase()

            );
        }).addCase(addFavCity.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(addFavCity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.favCities?.push(action.payload);
            })
            .addCase(addFavCity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(getFavCity.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getFavCity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.favCities = state.favCities;
            })
            .addCase(getFavCity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }});

export const { reset } = citiesSlice.actions;


export default citiesSlice.reducer;