import React, {useEffect, useLayoutEffect, useState} from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {useSelector} from "react-redux";


export const EditPaymentForm = ({data}) => {
    const [values, setValues] = useState(null)

    const handleChange = (e) => {
        const {name, value, checked} = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: name === 'isPrimary' ? checked : value
        }));
    }

    useEffect(() => {
        if (data.type === 'mpesa') {
            setValues({
                number: data.details.number,
                isPrimary: data.isPrimary
            })
        }
        if (data.type === 'masterCard' || data.type === 'visa') {
            setValues({
                number: data.details.number,
                isPrimary: data.isPrimary,
                name: data.details.name,
                securityCode: '***',
                expiryDate: data.details.expiryDate
            })
        }
    }, []);

    useLayoutEffect(() => {
        console.log(values);
    }, [values]);


    if (data.type === 'mpesa' && values) {
        return (
            values &&
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <h3>Update Your <span style={{textTransform: 'capitalize'}}>{data.type}</span> details</h3>
                <FormControl>
                    <TextField onChange={handleChange} name='number' value={values?.number}/>
                </FormControl>
                <FormControl>
                    <FormControlLabel
                        control={<Checkbox checked={values?.isPrimary} name='isPrimary' onChange={handleChange}/>}
                        label='Set Primary'>
                    </FormControlLabel>
                </FormControl>
                <Button variant='contained'>Save Changes</Button>
            </div>

        )
    } else {
        console.log(data)
        return (values &&
            <>
                <h3>Update Your <span style={{textTransform: 'capitalize'}}>{data.type}</span> details</h3>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField onChange={handleChange} name='name' value={values?.name}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <FormControl fullWidth>
                            <TextField onChange={handleChange} name='number' value={values?.number}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth>
                            <TextField onChange={handleChange} name='expiryDate' value={values?.expiryDate}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField onChange={handleChange} name='securityCode' value={values?.securityCode}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <FormControlLabel control={<Checkbox name='isPrimary' checked={values?.isPrimary}
                                                                 onChange={handleChange}/>}
                                              label='Set Primary'>
                            </FormControlLabel>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button variant='contained'>Save Changes</Button>
            </>
        )
    }

}

export const EditShippingAddressForm = ({data}) => {
    const countries = useSelector(state => state.countries.countries);
    const [states, setStates] = useState(null)
    const [values, setValues] = useState({
        address: data?.address || '',
        address2: data?.address2 || '',
        country: data?.country || '',
        state: data?.state || '',
        city: data?.city || '',
        postalCode: data?.postalCode || '',
        phone: data?.phone || '',
        isPrimary: data?.isPrimary || false
    })


    const handleChange = (e) => {
        const {name, value, checked} = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: name === 'isPrimary' ? checked : value
        }));
    }

    useEffect(() => {
        const filteredStates = countries.filter(country => country.iso2 === values.country);
        setStates(filteredStates[0]?.states)
    }, [values.country]);


    return (
        <>
            <h3>Update Shipping Address</h3>
            <Grid container spacing={2} alignItems='center'>
                <Grid item sm={6}>
                    <FormControl fullWidth>
                        <TextField label='Address' id='address' onChange={handleChange} name='address'
                                   value={values?.address}/>
                    </FormControl>
                </Grid>
                <Grid item sm={6}>
                    <FormControl fullWidth>
                        <TextField label='Address 2 (Optional)' id='address2' onChange={handleChange} name='address2'
                                   value={values?.address2}/>
                    </FormControl>
                </Grid>
                <Grid item sm={6}>

                    <FormControl fullWidth>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select labelId='country-label' label='Country' placeholder='Select Country' name='country'
                                value={values?.country}
                                onChange={handleChange}>
                            {countries && countries.map((country, i) => (
                                <MenuItem key={i} value={country.iso2}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select labelId='state-label' label='State' placeholder='Select State' name='state'
                                value={values?.state}
                                onChange={handleChange}
                        >

                            {
                                states && states.map((state, i) => (
                                    <MenuItem key={i} value={state.name}>{state.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6}>
                    <FormControl fullWidth>
                        <TextField name='city' value={values?.city} onChange={handleChange}/>
                    </FormControl>
                </Grid>
                <Grid item sm={6}>
                    <FormControl fullWidth>
                        <FormControlLabel control={<Checkbox name='isPrimary' checked={values?.isPrimary}
                                                             onChange={handleChange}/>}
                                          label='Set Primary'>
                        </FormControlLabel>
                    </FormControl>
                </Grid>
            </Grid>
            <Button variant='contained'>Save Changes</Button>
        </>
    )
}


export const AddNewPaymentMethodForm = () => {
    const [value, setValue] = useState('mpesa');
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <div>
                <FormControl>
                    <RadioGroup value={value} row name='payment-type' onChange={handleChange}>
                        <FormControlLabel control={<Radio/>} value='mpesa' label='Mpesa'/>
                        <FormControlLabel
                            control={<Radio/>} value='masterCard' label='Master Card'/> <FormControlLabel
                        control={<Radio/>}
                        value='paypal'
                        label='Paypal'/>
                    </RadioGroup>
                </FormControl>
            </div>
            {/*    DIPLAY FORM CONDITIONALLY*/}
            <div>
                {
                    //     CHECK MPESA FIRST
                    value === 'mpesa' ? <div>Mpesa</div> : value === 'masterCard' ?
                        <div>MasterCard</div> : value === 'paypal' ? <div>
                            <Button variant='contained'>Connect to Paypal</Button>
                        </div> : null
                }
            </div>
        </div>
    )
}

export const RemoveBilling = ({data}) => {
    return <h1>You are about to delete {data.type} You can not undo this step.</h1>
}