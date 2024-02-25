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

// VALIDATE CARDS
const cardsValidationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
number: yup.number("Enter your card number").required("Card number is required"),
  securityCode: yup
    .number("Enter 3 digit security code")
    .required("Security is required")
    .test("len", "Must be 3 digits", (val) => val.toString().length === 3),
  expiryDate: yup
    .string("Enter card expiry date")
    .required("Expiry date is required"),
});

// VAL SCHEMA FOR ADDRESS
const addressValidationSchema = yup.object({
  address: yup.string("Enter your box address").required("Address is required"),
  country: yup.string("Select Country").required("Country is required"),
  state: yup.string("Select State").required("State is required"),
  city: yup.string("Select City").required("City is required"),
  postalCode: yup
    .number("Enter Postal Code")
    .required("Postal Code is required"),
});

export const EditPaymentForm = ({ data }) => {
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });
  const formik = useFormik({
    initialValues:
      data.type === "mpesa"
        ? { number: data.details.number, isPrimary: data.isPrimary }
        : data.type === "masterCard"
        ? {
            number: data.details.number,
            isPrimary: data.isPrimary,
            name: data.details.name,
            securityCode: data.details.securityCode,
            expiryDate: data.details.expiryDate,
          }
        : null,
    validationSchema:
      data.type === "mpesa"
        ? phoneValidationSchema
        : data.type === "masterCard"
        ? cardsValidationSchema
        : null,
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
          <h3 style={{ marginBottom: "20px" }}>
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
          <Button
            sx={{ marginTop: "20px" }}
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
          <h3 style={{ marginBottom: "20px" }}>
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
                  error={
                    formik.touched.expiryDate &&
                    Boolean(formik.errors.expiryDate)
                  }
                  helperText={
                    formik.touched.expiryDate && formik.errors.expiryDate
                  }
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
                  error={
                    formik.touched.securityCode &&
                    Boolean(formik.errors.securityCode)
                  }
                  helperText={
                    formik.touched.securityCode && formik.errors.securityCode
                  }
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
          <Button
            sx={{ marginTop: "20px" }}
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
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });
  const [states, setStates] = useState(null);
  const initialValues = {
    address: data?.address || "",
    address2: data?.address2 || "",
    country: data?.country || "",
    state: data?.state || "",
    city: data?.city || "",
    postalCode: data?.postalCode || "",
    phone: data?.phone || "",
    isPrimary: data?.isPrimary || false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addressValidationSchema,
    onSubmit: async (values, action) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const filteredStates = countries.filter(
      (country) => country.iso2 === formik.values.country
    );
    setStates(filteredStates[0]?.states);
  }, [countries, formik.values.country]);

  return (
    <>
      <h3>Update Shipping Address</h3>
      <Grid
        component="form"
        onSubmit={formik.handleSubmit}
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Address"
              id="address"
              onChange={formik.handleChange}
              name="address"
              value={formik.values?.address}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Address 2 (Optional)"
              id="address2"
              onChange={formik.handleChange}
              name="address2"
              value={formik.values?.address2}
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
              value={formik.values?.country}
              onChange={formik.handleChange}
              nBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
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
              value={formik.values?.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
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
              value={formik.values?.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <TextField
              placeholder="Postal Code"
              type="text"
              name="postalCode"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.postalCode && Boolean(formik.errors.postalCode)
              }
              helperText={formik.touched.postalCode && formik.errors.postalCode}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
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
        <Grid item sm={12}>
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
          <Button
            fullWidth
            disabled={formik.isSubmitting}
            variant="contained"
            type="submit"
          >
            {formik.isSubmitting
              ? "Please wait ..."
              : "UPDATE SHIPPING ADDRESS"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export const AddNewPaymentMethodForm = () => {
  const [value, setValue] = useState("mpesa");
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });
  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  const formik = useFormik({
    initialValues:
      value === "mpesa"
        ? { number: "", isPrimary: false }
        : value === "masterCard"
        ? {
            number: "",
            isPrimary: false,
            name: "",
            securityCode: "",
            expiryDate: "",
          }
        : null,
    validationSchema:
      value === "mpesa"
        ? phoneValidationSchema
        : value === "masterCard"
        ? cardsValidationSchema
        : null,
    onSubmit: async (values, action) => {
      console.log("values", values);
    },
  });

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
            <form
              onSubmit={formik.handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
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
              <Button
                sx={{ marginTop: "20px" }}
                disabled={formik.isSubmitting}
                type="submit"
                variant="contained"
              >
                {" "}
                {formik.isSubmitting ? "Please wait ..." : "Save Changes"}
              </Button>
            </form>
          ) : value === "masterCard" ? (
            <form onSubmit={formik.handleSubmit}>
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
                      onBlur={formik.handleBlur}
                      error={formik.touched.number && Boolean(formik.errors.number)}
                      helperText={formik.touched.number && formik.errors.number}
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
                      error={
                        formik.touched.expiryDate &&
                        Boolean(formik.errors.expiryDate)
                      }
                      helperText={
                        formik.touched.expiryDate && formik.errors.expiryDate
                      }
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
                      error={
                        formik.touched.securityCode &&
                        Boolean(formik.errors.securityCode)
                      }
                      helperText={
                        formik.touched.securityCode &&
                        formik.errors.securityCode
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPrimary"
                  checked={formik.values.isPrimary}
                  onChange={formik.handleChange}
                />
              }
              label="Set Primary"
            ></FormControlLabel>
          </FormControl>
                </Grid>
                <Grid item xs={6}>
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
              <Button
                sx={{ marginTop: "20px" }}
                disabled={formik.isSubmitting}
                type="submit"
                variant="contained"
              >
                {formik.isSubmitting ? "Please wait ..." : "Save Changes"}
              </Button>
                </Grid>
               
              </Grid>
             
            </form>
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
