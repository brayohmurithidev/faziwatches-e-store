import React from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as yup from 'yup'
import {useFormik} from "formik";


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
    const formik = useFormik({
        initialValues, validationSchema: validationSchema, onSubmit: async (values, action) => {
        }
    })
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
                    <MenuItem value='ke'>Kenya</MenuItem>
                    <MenuItem value='ug'>Uganda</MenuItem>
                    <MenuItem value='tz'>Tanzania</MenuItem>
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

                    <MenuItem value='ke'>Kenya</MenuItem>
                    <MenuItem value='ug'>Uganda</MenuItem>
                    <MenuItem value='tz'>Tanzania</MenuItem>
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
            <Button variant='contained' type='submit'>
                UPDATE SHIPPING ADDRESS
            </Button>
        </Box>
    );
};

export default AddressForm;
