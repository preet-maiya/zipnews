import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(8)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

const SearchBar = ({ handleSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const onSearch = () => {
        console.log(searchValue);
        handleSearch(searchValue);
        // Call a function to process the search value here
    };

    return (
        <Box>
            <Search>
                <SearchIconWrapper>
                    <IconButton onClick={onSearch}>
                        <SearchIcon />
                    </IconButton>
                </SearchIconWrapper>
                <StyledInputBase
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />

            </Search>
        </Box>
    )
}

export default SearchBar