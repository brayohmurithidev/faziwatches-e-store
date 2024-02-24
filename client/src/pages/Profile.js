import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Avatar, Button, Divider, Grid} from "@mui/material";
import UserPersonalInformation from "../components/UserPersonalInformation";
import BillingPayments from "../components/BillingPayments";

const currentTab = localStorage.getItem('navigateTo') || 'Personal information';

const Profile = () => {
    const {userInfo} = useSelector(state => state.auth)
    const [navigateTo, setNavigateTo] = useState(currentTab)

    // RENDER MAIN CONDITIONALLY
    const mains = [
        {
            name: 'Personal information',
            component: <UserPersonalInformation/>
        }, {
            name: 'Billing & Payments',
            component: <BillingPayments/>
        },
        {
            name: 'Order History',
            component: 'Orders'
        },
        {
            name: 'Gift Cards',
            component: 'Gift cards'
        }
    ]


    const [toRender, setToRender] = useState(mains[0].component);


    useEffect(() => {
        const elem = mains.find((main) => main.name === navigateTo)
        setToRender(elem.component)
        localStorage.setItem('navigateTo', navigateTo)
    }, [navigateTo]);


    return (
        <div className='profile-wrapper'>
            <div className='profile-title'>
                <h1 style={{textTransform: 'capitalize'}}>{userInfo.name}</h1>
                <Button variant='contained'>Sign Out</Button>
            </div>
            <Divider/>
            {/*    DISPLAY SIDEBAR AND MAIN*/}
            <Grid container spacing={2} mt={3}>
                {/*SIDEBAR*/}
                <Grid item md={4} className='profile-sidebar'>
                    <Avatar
                        sx={{
                            textTransform: 'capitalize',
                            width: 100,
                            height: 100
                        }}>
                        {/*{`${userInfo?.name.split(' ')[0][0]}${userInfo?.name.split(' ')[1][0]}`}*/}
                    </Avatar>
                    <h3 style={{textTransform: 'capitalize'}}>{userInfo.name}</h3>
                    <p>{userInfo.email}</p>

                    {/*    Navigation*/}
                    <div className='profile-navigation'>
                        {
                            mains.map((main, i) => (
                                <Button style={navigateTo === main.name ? {color: ''} : {color: '#fff'}} key={i}
                                        onClick={() => setNavigateTo(main.name)}>
                                    {main.name}
                                </Button>
                            ))
                        }
                    </div>
                </Grid>


                {/*MAIN DISPLAY*/}
                <Grid item md={8} className='profile-main'>
                    {toRender}
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
