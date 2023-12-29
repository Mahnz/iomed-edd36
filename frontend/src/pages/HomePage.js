// HomePage.js
import React from 'react'
import {CssBaseline} from '@mui/material'
import Hero from "../components/HomePage_comp/Hero.js"
import Header from "../components/HomePage_comp/Header.js"
import Funzioni from "../components/HomePage_comp/Funzioni.js"
import Contattaci from "../components/HomePage_comp/Contattaci.js"
import Cards from "../components/HomePage_comp/Cards.js";


export default function HomePage() {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Hero/>
            <Funzioni/>
            <Cards/>
            <Contattaci/>
        </>
    )
}
