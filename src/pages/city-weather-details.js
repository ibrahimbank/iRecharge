import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Grid, Stack, TextField, Typography} from "@mui/material";
import cloud from "../asset/sun.png"
import {useDispatch, useSelector} from "react-redux";
import {createNote, deleteNote, getNotes, updateNote} from "../feature/note/slice";
import Spinner from "../components/Spinner";

function CityWeatherDetails() {
    const [query, setQuery] = useState("")
    const [edit, setEdit] = useState(false)
    const [noteId, setNoteId] = useState("")

    const dispatch = useDispatch()

    const {notes} = useSelector(state => state.note)

    const {
       city,
        isLoading,
    } = useSelector(state => state.city)

    const handleInputChange = event => {
        setQuery(event.target.value);
    };
    const handleSubmit = event => {
        event.preventDefault();

        dispatch(createNote(query))
        setQuery('');
    };

    const handleUpdateNote = async (event) => {
        event.preventDefault();

    const res = await  dispatch(updateNote({query, noteId}))



        setQuery('');
        setNoteId('');
        setEdit(false)
    };

    const items = [
        {
            name: "Wind Degree",

            value: city?.weather?.current?.wind_degree,
        }, {
            name: "Humidity",

            value: city?.weather?.current?.humidity
        }, {
            name: "UV Index",

            value: city?.weather?.current?.uv,
        }, {
            name: "Pressure",

            value: city?.weather?.current?.pressure_in,
        },
        {
            name: "gust kph",

            value: city?.weather?.current?.gust_kph
        }, {
            name: "Lat",

            value: city?.weather?.location?.lat
        }, {
            name: "Lon",

            value: city?.weather?.location?.lon
        },
    ]

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch]);

    if (isLoading) {
        return <Spinner/>;
    }



    return (
        <Grid container spacing={2} sx={{background: "#efefef", height: "100vh", }}>
            <Grid item xs={12} lg={4} sx={{background: "#fff", padding: "2rem"}}>
                <Stack p={4} spacing={4} alignItems={"center"} component={"form"} onSubmit={(e)=>{
                    if (edit){
                        handleUpdateNote(e)
                    }else handleSubmit(e)


                }}>
                    <TextField required fullWidth variant={"outlined"} type="text" size={"small"} value={query}
                               onChange={handleInputChange} placeholder="Add Note..."/>
                    <Button variant={"contained"} size={"small"} sx={{width: "30%"}} type="submit">{edit ? "Edit" : "Add"}</Button>
                </Stack>

                {notes?.length === 0 ?
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"}
                           height={"200px"}>
                        <Typography>No Note Added</Typography>
                    </Stack> : <Box component={"ul"} display={"flex"} flexDirection={"column"} gap={2}>
                        {React.Children.toArray(
                            notes?.map(note => (
                                <Stack direction={{xs: "column", lg: "row"}} justifyContent={"space-between"}
                                       alignItems={"center"} spacing={2} padding={"2rem"}>
                                    <Box component={"li"} textTransform={"capitalize"}>{note.text}</Box>
                                    <Stack direction={{xs: "column", lg: "row"}} justifyContent={"flex-end"} spacing={2}>
                                    <Button onClick={() => {
                                        setQuery(note.text)
                                            setEdit(true)
                                        setNoteId(note.id)
                                    }} variant={"contained"} size={"small"} sx={{width: "30%"}} color={"primary"}
                                            type="button">Edit</Button>
                                    <Button onClick={() => {
                                        dispatch(deleteNote(note.id))
                                    }} variant={"contained"} size={"small"} sx={{width: "30%"}} color={"error"}
                                            type="button">Remove</Button>
                                </Stack>
                                </Stack>
                            ))
                        )}
                    </Box>
                }

            </Grid>

            <Grid item xs={12} lg={8} sx={{padding: "2rem !important "}}>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Typography variant={"h4"} >{city?.city}</Typography>
                    <img src={cloud} alt={"cloud"} width={"150px "} height={"150px"}/>
                    <Typography variant={"h4"}>
                        {city?.weather?.current?.temp_c}°C
                    </Typography>
                </Box>

                <Stack spacing={4}>
                    <Typography variant={"h4"} fontSize={"18px"} fontWeight={700}>
                        Today
                    </Typography>
                    <Grid container spacing={2}>
                        {
                            React.Children.toArray(
                                items.map(({name, value, wind_dir}) => (
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Card sx={{padding: "2rem !important"}}>
                                            <Typography variant={"subtitle2"} sx={{textTransform: "capitalize"}}>
                                                {name}
                                            </Typography> <Typography variant={"h4"} fontSize={"18px"} fontWeight={"700"}>
                                            {value}
                                        </Typography>
                                        </Card>
                                    </Grid>
                                ))
                            )
                        }
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default CityWeatherDetails;