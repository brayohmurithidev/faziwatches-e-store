import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {main: "#5e3b00"},
        secondary: {main: "#FFD700"},
    },
    components: {
        MuiSelect: {
            "&:before": {
                borderColor: "#fff",
                borderRadius: '10px'
            },
            "&:after": {
                borderColor: "#fff",
                borderRadius: '10px'
            },
            icon: {
                fill: "#fff",
            },
        },
        // MuiTextField: {
        //     styleOverrides: {
        //         root: {
        //             '& label.Mui-focused': {
        //                 color: '#454545', // Change the label color when focused
        //             },
        //             '& .MuiOutlinedInput-root': {
        //                 '& fieldset': {
        //                     borderColor: '#454545', // Change the default border color
        //                     borderRadius: '10px'
        //                 },
        //                 '&:hover fieldset': {
        //                     borderColor: '#5e3b00', // Change the border color on hover
        //                 },
        //                 '&.Mui-focused fieldset': {
        //                     borderColor: '#5e3b00', // Change the border color on focus
        //                 },
        //             },
        //         }
        //     }
        // }
    },
});
