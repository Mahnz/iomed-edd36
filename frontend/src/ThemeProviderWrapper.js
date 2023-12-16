import React, {useState} from 'react'
import {createTheme, responsiveFontSizes, useMediaQuery, ThemeProvider} from '@mui/material'


export default function ThemeProviderWrapper({children}) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const mode = darkMode ? 'dark' : prefersDarkMode ? 'dark' : 'light';

    const theme = createTheme({
        palette: {
            mode,
        },
        typography: {
            fontFamily: [
                'Poppins',
                'sans-serif',
            ].join(','),
            fontSize: 14,
        },
    })

    const responsiveTheme = responsiveFontSizes(theme)

    return (
        <ThemeProvider theme={responsiveTheme}>
            {children}
        </ThemeProvider>
    )
}