import React from 'react'
import Hero from "../components/HomePage_comp/Hero.js"
import Header from "../components/HomePage_comp/Header.js"
import Section from "../components/HomePage_comp/Section.js"
import ContactUs from "../components/HomePage_comp/ContactUs.js"
import {ThemeProvider, CssBaseline} from '@mui/material'

export default function HomePage() {
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Hero/>
            <Section/>
            <ContactUs/>
        </>
    )
}
