import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';

import Login from '../compo/Login';
import Signup from '../compo/Signup';

const Homepage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-start',
        pt:10,
        alignItems: 'center',
        flexDirection: 'column',
        background: 'transparent',
      }}
    >
      <Container maxWidth="xs">
        {/* Talk-A-Tive Heading */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            fontFamily="Work Sans"
          >
            Talk-A-Tive
          </Typography>
        </Box>

        {/* Tabs Box */}
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 2,
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            <Tab label="LOGIN" />
            <Tab label="SIGN UP" />
          </Tabs>

          {tabIndex === 0 && (
            <Typography align="center"><Login /></Typography>
          )}
          {tabIndex === 1 && (
            <Typography align="center"><Signup /></Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Homepage;
