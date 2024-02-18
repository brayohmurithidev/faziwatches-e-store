import React, {useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import {Link} from "react-router-dom";
import {AccountCircle, Email, FacebookRounded, Google, Lock, Visibility, VisibilityOff,} from "@mui/icons-material";

// formik
import {useFormik} from "formik";
import * as yup from "yup";
import {BASEURL} from "../services/apiService";
import axios from "axios";

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
};

// VALIDATION SCHEMA
const validationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required"),
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password must be atleast 8 characters long")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Field cannot be empty")
        .min(8, "Should be at least 8 characters")
        .oneOf([yup.ref("password"), null], "Password must match"),
    agreeTerms: yup
        .boolean()
        .required("Please select terms and conditions")
        .oneOf([true], "Please select terms and conditions"),
});
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        msg: "",
    });
    // INITIALIZE FORMIK
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                const res = await axios.post(`${BASEURL}/users`, values);
                setMessage({
                    type: "success",
                    msg: "Account created successfully, you can login to your account now.",
                });
                actions.resetForm({
                    values: initialValues,
                });
                actions.setSubmitting(false);
            } catch (e) {
                if (e.response) {
                    if (e.response.data.statusCode === 409) {
                        setMessage({type: "error", msg: e.response.data.error});
                        actions.setSubmitting(false);
                    }
                } else {
                    setMessage({type: "error", msg: "An error occured"});
                    actions.setSubmitting(false);
                }
            }
        },
    });

    return (
        <div className="signup-main">
            <div className="signup-title">
                <h1>Create an account</h1>
                <p>It's so quick</p>
            </div>
            <Box
                component="form"
                autoComplete="off"
                className="signup-form"
                onSubmit={formik.handleSubmit}
            >
                <div className="signup-methods">
                    <div>
                        <IconButton>
                            <FacebookRounded sx={{color: "#3b5999", fontSize: "40px"}}/>
                        </IconButton>
                        <IconButton>
                            <Google sx={{color: "#EA4335", fontSize: "40px"}}/>
                        </IconButton>
                    </div>
                    <p style={{display: "flex", alignSelf: "center"}}>or</p>
                </div>
                <TextField
                    className="text-field"
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className="text-field"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className="text-field"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className="text-field"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock/>
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="agreeTerms"
                                checked={formik.values.agreeTerms}
                                onChange={formik.handleChange}
                            />
                        }
                        label={
                            <span>
                I agree to the{" "}
                                <Link className="link" to="#">
                  terms and conditions
                </Link>
              </span>
                        }
                    />
                    <FormHelperText style={{color: "red"}}>
                        {formik.touched.agreeTerms && formik.errors.agreeTerms
                            ? formik.touched.agreeTerms && formik.errors.agreeTerms
                            : " "}
                    </FormHelperText>
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
                    disabled={formik.isSubmitting}
                    type="submit"
                    variant="contained"
                >
                    {formik.isSubmitting ? "Please wait ..." : "Sign up"}
                </Button>

                <p>
                    Already have an account?{" "}
                    <Link className="link" to="/login">
                        Login here
                    </Link>
                </p>
            </Box>
        </div>
    );
};

export default Signup;
