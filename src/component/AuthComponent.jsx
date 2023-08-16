import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../store/redux/authSlice";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const AuthComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role_id: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://laravel-api-10.cerise.id/api/register",
        formData
      );
      console.log("Registrasi Sukses", response.data);

      const user = response.data.user;
      const token = response.data.token;
      dispatch(setUser(user));
      dispatch(setToken(token));
      window.location.href = "/login";
    } catch (error) {
      console.log("Registrasi Error:", error);
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
    <Box p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>

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
          <FormLabel>Role ID</FormLabel>
          <Input
            type="text"
            name="role_id"
            value={formData.role_id}
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

        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type={showPassword ? "text" : "password"}
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleRegister}
          disabled={
            formData.password !== formData.password_confirmation
          }
        >
          Register
        </Button>
        {formData.password !== formData.password_confirmation && (
          <p style={{ color: "red" }}>Passwords do not match.</p>
        )}
      </VStack>
    </Box>
  );
};

export default AuthComponent;
