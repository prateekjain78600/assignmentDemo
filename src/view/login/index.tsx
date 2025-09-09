import React, { useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import CustomTextField from "../../components/customTextfield";
import LoginImg from "../../assets/image/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export type FormState = {
  email: string;
  password: string;
  username?: string;
};

const AuthPage: React.FC = () => {
  const { loginWithGoogle, registerWithEmail, loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
    clearErrors,
    reset,
  } = useForm<FormState>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue(name as keyof FormState, value);
    if (errors[name as keyof FormState]) {
      clearErrors(name as keyof FormState);
    }
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await loginWithGoogle();
      if (result) {
        navigate("/upload");
      } else {
        setError("Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: FormState) => {
    try {
      setLoading(true);
      setError("");
      
      let result;
      if (activeTab === 0) {
        result = await loginWithEmail(data.email, data.password);
      } else {
        if (!data.username?.trim()) {
          setError("Username is required for registration");
          return;
        }
        result = await registerWithEmail(data.username.trim(), data.email, data.password);
      }
      
      if (result) {
        navigate("/upload");
      } else {
        setError(activeTab === 0 ? "Login failed. Please check your credentials." : "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setError(activeTab === 0 ? "Login failed. Please try again." : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_, newValue: number) => {
    setActiveTab(newValue);
    setError("");
    reset(); 
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid size={6} sx={{ height: "100vh" }}>
        <img
          src={LoginImg}
          alt="login"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </Grid>
      <Grid
        size={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: 420,
          }}
        >
          <Typography variant="h5" align="center" sx={{ fontWeight: 600 }}>
            {activeTab === 0 ? "Welcome Back" : "Create an Account"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {activeTab === 0
              ? "Login to access your dashboard"
              : "Sign up and start using the dashboard"}
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Log In" />
            <Tab label="Sign Up" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="outlined"
            fullWidth
            startIcon={<FcGoogle />}
            onClick={handleGoogleLogin}
            disabled={loading}
            sx={{
              textTransform: "none",
              borderColor: "#ccc",
              color: "#555",
              mb: 2,
              height: "46px",
            }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Continue with Google"
            )}
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {activeTab === 1 && (
              <Box>
                <Typography>Username</Typography>
                <CustomTextField
                  {...register("username", {
                    required: activeTab === 1 ? "Username is required" : false,
                    minLength: {
                      value: 2,
                      message: "Username must be at least 2 characters"
                    }
                  })}
                  name="username"
                  placeholder="Enter your username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  onChange={handleInputChange}
                />
              </Box>
            )}

            <Box>
              <Typography>Email</Typography>
              <CustomTextField
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                name="email"
                field="email"
                placeholder="Enter your email"
                error={!!errors.email}
                helperText={errors.email?.message}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <Typography>Password</Typography>
              <CustomTextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                name="password"
                field="password"
                type="password"
                placeholder="Enter your password"
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={handleInputChange}
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ height: "48px" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={23} color="inherit" />
              ) : activeTab === 0 ? (
                "Log In"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "text.secondary" }}
          >
            {activeTab === 0
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Box
              component="span"
              sx={{
                color: "#1976d2",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onClick={() => handleTabChange(null, activeTab === 0 ? 1 : 0)}
            >
              {activeTab === 0 ? "Sign Up" : "Log In"}
            </Box>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthPage;