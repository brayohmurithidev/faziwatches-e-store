import React, {useEffect, useState} from "react";
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
import {Link, useNavigate} from "react-router-dom";
import {Email, FacebookRounded, Google, Lock, Visibility, VisibilityOff,} from "@mui/icons-material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../features/user/userSlice";

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        msg: "",
    });
    const {status, error, token, userInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // CHECK IF USER LOGGED IN AND REDIRECT
    useEffect(() => {
        console.log(userInfo)
        if (token) {
            navigate('/cart')
        }
    }, [navigate, userInfo]);

    const formik = useFormik({
        initialValues: {email: "", password: "", rememberMe: false},
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            try {
                dispatch(loginUser(values))
            } catch (e) {
                if (e.response) {
                    if (e.response.data.statusCode) {
                        setMessage({type: "error", msg: e.response.data.error});
                    }
                } else {
                    setMessage({type: "error", msg: "An error occured"});
                    actions.setSubmitting(false);
                }
            }
        },
    });

    return (
        <div className="login-main">
            <div className="login-title">
                <h1 style={{marginBottom: "20px"}}>Welcome back!</h1>
                <p>Login to complete your orders</p>
            </div>
            <Box
                component="form"
                autoComplete="off"
                className="login-form"
                onSubmit={formik.handleSubmit}
            >
                <TextField
                    className="text-field"
                    type="text"
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
                    type="password"
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
                <FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="rememberMe"
                                checked={formik.values.rememberMe}
                                onChange={formik.handleChange}
                            />
                        }
                        label="Remeber me"
                    />
                    <FormHelperText style={{color: "red"}}>
                        {formik.touched.rememberMe && formik.errors.rememberMe
                            ? formik.touched.rememberMe && formik.errors.rememberMe
                            : " "}
                    </FormHelperText>
                </FormControl>

                <Link className="link" to="#">
                    Lost Password?
                </Link>
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
                <Button variant="contained" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? "Please wait ..." : "Sign in "}
                </Button>
                <p style={{display: "flex", alignSelf: "center"}}>or login with</p>
                <div className="login-methods">
                    <div>
                        <IconButton>
                            <FacebookRounded sx={{color: "#3b5999", fontSize: "40px"}}/>
                        </IconButton>{" "}
                        <IconButton>
                            <Google sx={{color: "#EA4335", fontSize: "40px"}}/>
                        </IconButton>
                    </div>
                </div>
                <p>
                    Not registered?{" "}
                    <Link className="link" to="/signup">
                        Create account
                    </Link>
                </p>
            </Box>
        </div>
    );
};

export default Login;
