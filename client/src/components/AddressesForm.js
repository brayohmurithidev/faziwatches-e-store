import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as yup from 'yup'
import {useFormik} from "formik";

import {Axios} from "../services/apiService";
import {useSelector} from "react-redux";


const initialValues = {
    address: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    phone: ''
}
const phoneRegExp = /^((\\[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object({
    address: yup.string('Enter your box address').required('Address is required'),
    country: yup.string('Select Country').required('Country is required'),
    state: yup.string('Select State').required('State is required'),
    city: yup.string('Select City').required('City is required'),
    postalCode: yup.number('Enter Postal Code').required('Postal Code is required'),
    phone: yup.string('Enter Contact Number').required('Phone number is required').matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "too short")
        .max(10, "too long"),

})


const AddressForm = () => {
    const countries = useSelector(state => state.countries.countries)
    const [states, setStates] = useState(null)
    const [message, setMessage] = useState({
        type: "",
        msg: "",
    });
    const formik = useFormik({
        initialValues, validationSchema: validationSchema, onSubmit: async (values, actions) => {
            console.log(values);
            try {
                const res = await Axios.put(`/users/address`, values);
                setMessage({
                    type: "success",
                    msg: "Address Updated Successfully",
                });
                actions.resetForm({
                    values: initialValues,
                });
                actions.setSubmitting(false);
            } catch (e) {
                console.log(e)
                setMessage({type: "error", msg: "An error occured"});
                actions.setSubmitting(false);
            }
        }
    })

    useEffect(() => {
        const filteredStates = countries.filter(country => country.iso2 === formik.values.country);
        setStates(filteredStates[0]?.states)
    }, [formik.values.country]);
    return (
        <Box component='form' className='address-form' onSubmit={formik.handleSubmit}>
            <FormControl fullWidth>
                <TextField placeholder='Address' type='text' name='address'
                           value={formik.values.address}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.address && Boolean(formik.errors.address)}
                           helperText={formik.touched.address && formik.errors.address}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField placeholder='Address (Optional)' type='text' name='address2'
                           value={formik.values.address2}
                           onChange={formik.handleChange}/>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="country-label">Country</InputLabel>
                <Select labelId='country-label' label='Country' placeholder='Select Country' name='country'
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}>
                    {countries && countries.map((country, i) => (
                        <MenuItem key={i} value={country.iso2}>{country.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="state-label">State</InputLabel>
                <Select labelId='state-label' label='State' placeholder='Select State' name='state'
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}>

                    {
                        states && states.map((state, i) => (
                            <MenuItem key={i} value={state.name}>{state.name}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
            <FormControl fullWidth>
                <TextField placeholder='City' type='text' name='city'
                           value={formik.values.city}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.city && Boolean(formik.errors.city)}
                           helperText={formik.touched.city && formik.errors.city}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField placeholder='Postal Code' type='text' name='postalCode'
                           value={formik.values.postalCode}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                           helperText={formik.touched.postalCode && formik.errors.postalCode}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField placeholder='Phone Number e.g 0712345678' type='text' name='phone'
                           value={formik.values.phone}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           error={formik.touched.phone && Boolean(formik.errors.phone)}
                           helperText={formik.touched.phone && formik.errors.phone}/>
            </FormControl>
            <p
                className={
                    message.type === "success"
                        ? "notification success"
                        : message.type === "error"
                            ? "notification error"
                            : "no-notification"
                }
            >
                {message.msg}
            </p>
            <Button disabled={formik.isSubmitting} variant='contained' type='submit'>
                {formik.isSubmitting ? "Please wait ..." : "UPDATE SHIPPING ADDRESS"}

            </Button>
        </Box>
    );
};

export default AddressForm;
