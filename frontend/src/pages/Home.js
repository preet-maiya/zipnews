import React, { useState } from 'react'
import Map from '../components/Map'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'

const Home = () => {
    const [heatmap, setHeatmap] = useState(false)
    const [search, setSearch] = useState("");
    const heatmapSelection = (e) => {
        setHeatmap(e);
    }
    const searchedValue = (e) => {
        setSearch(e);
    }
    return (
        <Box>
            <Navbar heatmapSelection={heatmapSelection} searchedValue={searchedValue} />
            <Map heatmap={heatmap} searchValue={search} />
        </Box>
    )
}

export default Home