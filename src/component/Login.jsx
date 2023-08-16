import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken, clearAuth } from "../store/redux/authSlice";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userToken, setUserToken] = useState(""); // Add userToken state

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const user = response.data.user;
      const token = response.data.token;
      dispatch(setUser(user));
      dispatch(setToken(token));
      setUserToken(token); // Store the token
      setLoginSuccess(true); // Set login success to true
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://laravel-api-10.cerise.id/api/logout", null, {
        headers: {
          Authorization: `Bearer ${userToken}`
        },
      });
      dispatch(clearAuth());
      setUserToken("");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" maxW="md" mx="auto">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button onClick={handleShowPassword}>
          {showPassword ? "Hide Password" : "Show Password"}
        </Button>

        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>

        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>

        {loginSuccess && (
          <p style={{ color: "green" }}>Login successful! Redirecting...</p>
        )}
      </VStack>
    </Box>
  );
};

export default LoginPage;
