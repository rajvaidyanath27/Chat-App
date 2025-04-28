import React, { useState } from 'react';
import { Box, Stack, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: null,
  });
  const [picLoading, setPicLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');
  const navigate = useNavigate(); // useNavigate hook for navigation in v6

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, picture } = formData;

    // Validation checks
    if (!name || !email || !password || !confirmPassword) {
      showSnackMessage("Please Fill all the Fields", "warning");
      return;
    }
    if (password !== confirmPassword) {
      showSnackMessage("Passwords Do Not Match", "warning");
      return;
    }

    setPicLoading(true);

    // Handle picture upload
    try {
      const picUrl = await uploadPicture(picture);
      if (!picUrl) {
        setPicLoading(false);
        return;
      }

      // Sending form data to the server (assumed backend URL '/api/user')
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user", 
        { name, email, password, pic: picUrl }, 
        config
      );

      showSnackMessage("Registration Successful", "success");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats"); // Use navigate instead of history.push()

    } catch (error) {
      console.error(error);
      showSnackMessage(error.response?.data?.message || "Something went wrong.", "error");
      setPicLoading(false);
    }
  };

  const uploadPicture = (pics) => {
    if (!pics) {
      showSnackMessage("Please Select an Image!", "warning");
      return;
    }

    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      showSnackMessage("Invalid Image Type! Only JPG and PNG are allowed.", "warning");
      return;
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "Chat app");
    data.append("cloud_name", "dq3zvznpi");

    return fetch("https://api.cloudinary.com/v1_1/dq3zvznpi/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.url) {
          return data.url;
        } else {
          showSnackMessage("Error uploading image", "error");
          return null;
        }
      })
      .catch((err) => {
        console.error("Error uploading image: ", err);
        showSnackMessage("Error uploading image", "error");
        return null;
      });
  };

  const showSnackMessage = (message, severity) => {
    setSnackMessage(message);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h5" textAlign="center" mb={2}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            type="password"
          />
          <Button
            variant="outlined"
            component="label"
          >
            Upload Picture
            <input
              type="file"
              name="picture"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>
          <Button variant="contained" type="submit" disabled={picLoading}>
            {picLoading ? 'Uploading...' : 'Submit'}
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackSeverity}
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignupForm;
