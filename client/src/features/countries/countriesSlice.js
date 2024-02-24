import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "",
    error: "",
    countries: [],
};

export const countriesSlice = createSlice({
    name: "countries",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchCountries.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.countries = state.countries.concat(action.payload);
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

// FETCH DATA
export const fetchCountries = createAsyncThunk("/countries", async () => {
    const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states",
    );
    const countries = res.data.data;
    const filteredCountries = countries.filter(country => country.iso2 === 'KE' || country.iso2 === 'UG' || country.iso2 === 'TZ');

    return filteredCountries;
});

export default countriesSlice.reducer;
