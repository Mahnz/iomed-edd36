// HomePage.js
import React from 'react'
import {createTheme, ThemeProvider, CssBaseline} from '@mui/material'
import Hero from "../components/HomePage_comp/Hero.js"
import Header from "../components/HomePage_comp/Header.js"
import Funzioni from "../components/HomePage_comp/Funzioni.js"
import Contattaci from "../components/HomePage_comp/Contattaci.js"
import Cards from "../components/HomePage_comp/Cards.js";


export default function HomePage() {
    const newTheme = createTheme({
        typography: {
            fontFamily: [
                'Poppins',
                'sans-serif',
            ].join(','),
        }
    })
    return (
        <ThemeProvider theme={newTheme}>
            <CssBaseline/>
            <Header/>
            <section id="home" style={{mt: '64px'}}>
                <Hero/>
            </section>
            <section id="funzioni" style={{mt: '64px'}}>
                <Funzioni/>
            </section>
            <section id="inizia" style={{mt: '64px'}}>
                <Cards/>
            </section>
            <section id="contattaci" style={{mt: '64px'}}>
                <Contattaci/>
            </section>
        </ThemeProvider>
    )
}
