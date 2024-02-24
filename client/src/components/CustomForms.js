import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
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
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

const phoneRegExp =
  /^((\\[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// CONST VALIDATE PHONE SCHEMA
const phoneValidationSchema = yup.object({
  number: yup
    .string("Enter Contact Number")
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
});

// VALIDATE ADDRESS
const addressValidationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  securityCode: yup.number("Enter 3 digit security code").required("Security is required").test('len', 'Must be 3 digits', val => val.toString().length===3),
  expiryDate: yup.string("Enter card expiry date").required("Expiry date is required"),
//   number: yup
//     .string("Enter Contact Number")
//     .required("Phone number is required")
//     .matches(phoneRegExp, "Phone number is not valid")
//     .min(10, "too short")
//     .max(10, "too long"),
});

export const EditPaymentForm = ({ data }) => {
  const formik = useFormik({
    initialValues:
      data.type === "mpesa"
        ? { number: data.details.number, isPrimary: data.isPrimary }
        : data.type === "masterCard" ? {
            number: data.details.number,
            isPrimary: data.isPrimary,
            name: data.details.name,
            securityCode: data.details.securityCode,
            expiryDate: data.details.expiryDate,
          }: null,
    validationSchema:
      data.type === "mpesa" ? phoneValidationSchema :data.type === "masterCard"?  addressValidationSchema : null,
    onSubmit: async (values, action) => {
      console.log("values", values);
    },
  });

  if (data.type === "mpesa" && formik.values) {
    return (
      formik.values && (
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <h3 style={{marginBottom:"20px"}}>
            Update Your{" "}
            <span style={{ textTransform: "capitalize" }}>{data.type}</span>{" "}
            details
          </h3>
          <FormControl>
            <TextField
              onChange={formik.handleChange}
              name="number"
              value={formik.values?.number}
              onBlur={formik.handleBlur}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
          </FormControl>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values?.isPrimary}
                  name="isPrimary"
                  onChange={formik.handleChange}
                />
              }
              label="Set Primary"
            ></FormControlLabel>
          </FormControl>
          <Button sx={{marginTop: "20px"}}
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {" "}
            {formik.isSubmitting ? "Please wait ..." : "Save Changes"}
          </Button>
        </form>
      )
    );
  } else {
    // console.log(formik.values)
    return (
       
      formik.values && (
        <form onSubmit={formik.handleSubmit}>
          <h3 style={{marginBottom:"20px"}}>
            Update Your{" "}
            <span style={{ textTransform: "capitalize" }}>{data.type}</span>{" "}
            details
          </h3>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={formik.handleChange}
                  name="name"
                  value={formik.values?.name}
                  onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth>
                <TextField
                  onChange={formik.handleChange}
                  name="number"
                  value={formik.values?.number}

                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <TextField
                  onChange={formik.handleChange}
                  name="expiryDate"
                  value={formik.values?.expiryDate}
                  onBlur={formik.handleBlur}
              error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  onChange={formik.handleChange}
                  name="securityCode"
                  type="password"
                  value={formik.values?.securityCode}
                  onBlur={formik.handleBlur}
              error={formik.touched.securityCode && Boolean(formik.errors.securityCode)}
              helperText={formik.touched.securityCode && formik.errors.securityCode}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isPrimary"
                      checked={formik.values?.isPrimary}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Set Primary"
                ></FormControlLabel>
              </FormControl>
            </Grid>
          </Grid>
          <Button
          sx={{marginTop: "20px"}}
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            {formik.isSubmitting ? "Please wait ..." : "Save Changes"}
          </Button>
        </form>
      )
    );
  }
};

export const EditShippingAddressForm = ({ data }) => {
  const countries = useSelector((state) => state.countries.countries);
  const [states, setStates] = useState(null);
  const [values, setValues] = useState({
    address: data?.address || "",
    address2: data?.address2 || "",
    country: data?.country || "",
    state: data?.state || "",
    city: data?.city || "",
    postalCode: data?.postalCode || "",
    phone: data?.phone || "",
    isPrimary: data?.isPrimary || false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: name === "isPrimary" ? checked : value,
    }));
  };

  useEffect(() => {
    const filteredStates = countries.filter(
      (country) => country.iso2 === values.country
    );
    setStates(filteredStates[0]?.states);
  }, [values.country]);

  return (
    <>
      <h3>Update Shipping Address</h3>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Address"
              id="address"
              onChange={handleChange}
              name="address"
              value={values?.address}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Address 2 (Optional)"
              id="address2"
              onChange={handleChange}
              name="address2"
              value={values?.address2}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              label="Country"
              placeholder="Select Country"
              name="country"
              value={values?.country}
              onChange={handleChange}
            >
              {countries &&
                countries.map((country, i) => (
                  <MenuItem key={i} value={country.iso2}>
                    {country.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              label="State"
              placeholder="Select State"
              name="state"
              value={values?.state}
              onChange={handleChange}
            >
              {states &&
                states.map((state, i) => (
                  <MenuItem key={i} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <TextField
              name="city"
              value={values?.city}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPrimary"
                  checked={values?.isPrimary}
                  onChange={handleChange}
                />
              }
              label="Set Primary"
            ></FormControlLabel>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained">Save Changes</Button>
    </>
  );
};

export const AddNewPaymentMethodForm = () => {
  const [value, setValue] = useState("mpesa");
  const [phone, setPhone] = useState({});
  const countries = useSelector((state) => state.countries.countries);
  const [states, setStates] = useState(null);
  const [values, setValues] = useState({});
  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const { name, value, checked } = e.target;
    setPhone((prevState) => ({
      ...prevState,
      [name]: name === "isPrimary" ? checked : value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: name === "isPrimary" ? checked : value,
    }));
  };

  useEffect(() => {
    const filteredStates = countries.filter(
      (country) => country.iso2 === values.country
    );
    setStates(filteredStates[0]?.states);
  }, [values.country]);

  return (
    <div>
      <h3>ADD NEW PAYMENT METHOD</h3>
      <div>
        <FormControl>
          <RadioGroup
            value={value}
            row
            name="payment-type"
            onChange={handleRadioChange}
          >
            <FormControlLabel control={<Radio />} value="mpesa" label="Mpesa" />
            <FormControlLabel
              control={<Radio />}
              value="masterCard"
              label="Master Card"
            />{" "}
            <FormControlLabel
              control={<Radio />}
              value="paypal"
              label="Paypal"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {/*    DIPLAY FORM CONDITIONALLY*/}
      <div>
        {
          //     CHECK MPESA FIRST
          value === "mpesa" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <FormControl>
                <TextField
                  onChange={handlePhoneChange}
                  name="number"
                  value={phone.number}
                />
              </FormControl>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={phone?.isPrimary}
                      name="isPrimary"
                      onChange={handleChange}
                    />
                  }
                  label="Set Primary"
                ></FormControlLabel>
              </FormControl>
              <Button variant="contained">Save Changes</Button>
            </div>
          ) : value === "masterCard" ? (
            <div style={{ marginBottom: "20px" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Address"
                      id="address"
                      onChange={handleChange}
                      name="address"
                      value={values?.address}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Address 2 (Optional)"
                      id="address2"
                      onChange={handleChange}
                      name="address2"
                      value={values?.address2}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                      labelId="country-label"
                      label="Country"
                      placeholder="Select Country"
                      name="country"
                      value={values?.country}
                      onChange={handleChange}
                    >
                      {countries &&
                        countries.map((country, i) => (
                          <MenuItem key={i} value={country.iso2}>
                            {country.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="state-label">State</InputLabel>
                    <Select
                      labelId="state-label"
                      label="State"
                      placeholder="Select State"
                      name="state"
                      value={values?.state}
                      onChange={handleChange}
                    >
                      {states &&
                        states.map((state, i) => (
                          <MenuItem key={i} value={state.name}>
                            {state.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="city"
                      value={values?.city}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isPrimary"
                          checked={values?.isPrimary}
                          onChange={handleChange}
                        />
                      }
                      label="Set Primary"
                    ></FormControlLabel>
                  </FormControl>
                </Grid>
              </Grid>
              <Button sx={{ marginTop: "20px" }} variant="contained">
                Save Changes
              </Button>
            </div>
          ) : value === "paypal" ? (
            <div>
              <Button variant="contained">Connect to Paypal</Button>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};

export const RemoveBilling = ({ data }) => {
  return (
    <h1>You are about to delete {data.type} You can not undo this step.</h1>
  );
};
