import React, { useState } from "react";
import { Box } from "@mui/material";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  const [heatmap, setHeatmap] = useState(false)
  const heatmapSelection = (e) => {
    setHeatmap(e);
  }
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar heatmapSelection={heatmapSelection} />
      <Home heatmap={heatmap} />
    </Box>
  )
}

export default App;