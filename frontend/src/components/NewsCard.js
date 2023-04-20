import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dummyImg from "../assets/images/live-from-space.jpg"
import { Link } from 'react-router-dom';

export default function NewsCard() {
    const theme = useTheme();
    let title = `Two Options the NFL Has for the Bills - Bengals Game`;
    const MAX_WORDS = 8;
    const words = title.split(' ');

    if (words.length > MAX_WORDS) {
        title = words.slice(0, MAX_WORDS).join(' ') + '...';
    }

    return (
        <Link to={'https:\\google.com'} style={{ textDecoration: 'none' }}>
            <Card sx={{
                display: 'flex', width: { lg: '450px', sm: '300px' },
                height: { lg: '125px', sm: '30px' },
                justifyContent: 'space-between',
                ':hover': {
                    backgroundColor: '#D5EEEF',
                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    transform: 'scale(1.02)'
                }
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" >
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" fontSize="10px">
                            determining between right now the first option is the nfl essentially cancels the game or
                            gives both team a tie that would mean both teams play one less game than the 30 other nfl teams and the kansas city chiefs
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={'https://townsquare.media/site/10/files/2023/01/attachment-gettyimages-1453891744-594x594.jpg?&zc=1&s=0&a=t&q=89'}
                    alt="Live from space album cover"
                />
            </Card>
        </Link>
    );
}
