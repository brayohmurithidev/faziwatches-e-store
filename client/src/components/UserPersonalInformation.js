import React from 'react';
import {Grid, Paper} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useSelector} from "react-redux";

const UserPersonalInformation = () => {
    const {userInfo} = useSelector(state => state.auth)
    return (
        <div>
            <h3>Personal Information</h3>
            <p>Manage your personal information, including phone numbers and email address where you can be
                contacted</p>
            <Grid mt={2} container spacing={2} rowGap={2}>
                <Grid item md={6} spacing={2} rowGap={2}>
                    <Paper sx={{boxSizing: 'border-box', padding: '20px'}} elevation={3}>
                        <div className='card-title-wrapper'>
                            <h4>Name</h4>
                            <AccountCircle/>
                        </div>
                        <p style={{textTransform: 'capitalize'}}>{userInfo.name}</p>
                    </Paper>
                </Grid>
                <Grid item md={6} spacing={2} rowGap={2}>
                    <Paper sx={{boxSizing: 'border-box', padding: '20px'}} elevation={3}>
                        <div className='card-title-wrapper'>
                            <h4>Name</h4>
                            <AccountCircle/>
                        </div>
                        <p>Brian Murithi</p>
                    </Paper>
                </Grid>
                <Grid item md={6} spacing={2} rowGap={2}>
                    <Paper sx={{boxSizing: 'border-box', padding: '20px'}} elevation={3}>
                        <div className='card-title-wrapper'>
                            <h4>Name</h4>
                            <AccountCircle/>
                        </div>
                        <p>Brian Murithi</p>
                    </Paper>
                </Grid>
                <Grid item md={6} spacing={2} rowGap={2}>
                    <Paper sx={{boxSizing: 'border-box', padding: '20px'}} elevation={3}>
                        <div className='card-title-wrapper'>
                            <h4>Name</h4>
                            <AccountCircle/>
                        </div>
                        <p>Brian Murithi</p>
                    </Paper>
                </Grid>
                <Grid item md={6} spacing={2} rowGap={2}>
                    <Paper sx={{boxSizing: 'border-box', padding: '20px'}} elevation={3}>
                        <div className='card-title-wrapper'>
                            <h4>Name</h4>
                            <AccountCircle/>
                        </div>
                        <p>Brian Murithi</p>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserPersonalInformation;
