import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link, useLocation} from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BreadCramps() {
    const location = useLocation()
    console.log(location.pathname)

    let currentLink = ''

    const crumps = location.pathname.split('/').filter(cramp => cramp !== '').map((cramp, index) => {
        currentLink += `/${cramp}`
        console.log(currentLink)

        return (
            <div className='cramp' style={{color: "#fff",}} key={index}>
                <Link style={{color: "#fff", textDecoration: 'underline var(--primary-color)'}}
                      to={currentLink}>{cramp}</Link>
            </div>
        )
    })


    return (
        <Stack spacing={2} sx={{marginLeft: '20px', marginBottom: '20px'}}>
            <Breadcrumbs
                sx={{color: '#fff',}}
                separator={<NavigateNextIcon fontSize="small"/>}
                aria-label="breadcrumb"
            >
                {crumps}
            </Breadcrumbs>
        </Stack>

        // <div className='breadcrumps'>{crumps}</div>
    );
}

