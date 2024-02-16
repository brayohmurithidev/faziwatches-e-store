import React, {useEffect} from "react";
import {Box, Typography} from "@mui/material";
import SearchForm from "./SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserDetailsQuery} from "../services/authApi";
import {setCredentials} from "../features/user/userSlice";

const Header = () => {
    const {userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const {data, isFetching} = useGetUserDetailsQuery(
        'userDetails', {
            // perform a refetch every 15mins
            pollingInterval: 900000,
        }
    )
    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])
    return (
        <div className="header-section">
            <Box className="header-wrapper" sx={{alignItems: {md: "start"}}}>
                <Box className="header-logo" sx={{alignText: "right"}}>
                    <Typography
                        className="logo"
                        sx={{
                            fontSize: {md: "2rem", xs: "2rem"},
                            marginLeft: {md: "30px"},
                        }}
                    >
                        <span>F</span>
                        <span>A</span>
                        <span>Z</span>
                        <span>I</span>
                        <span>W</span>
                        <span>A</span>
                        <span>T</span>
                        <span>C</span>
                        <span>H</span>
                        <span>E</span>
                        <span>S</span>
                    </Typography>
                </Box>
                <Box sx={{display: {md: "none"}}}>
                    <SearchForm
                        btnName="Search"
                        type="text"
                        placeholder="Search products..."
                    />
                </Box>
            </Box>
        </div>
    );
};

export default Header;
