import React from 'react'
import Map from '../components/Map'
import { Box } from '@mui/material'

const Home = ({ heatmap }) => {
    return (
        <Box>
            <Map heatmap={heatmap} />
        </Box>
    )
}

export default Home