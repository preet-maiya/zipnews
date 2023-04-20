import React from "react";
import { Box } from "@mui/material";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
      <Home />
    </Box>
  )
}

export default App;