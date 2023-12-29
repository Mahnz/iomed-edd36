// Header.js
import React from 'react'
import {
    AppBar,
    Typography,
    Link,
    Box,
    Toolbar, useScrollTrigger, Button
} from '@mui/material'

function ElevationScroll(props) {
    const {children, window} = props
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    })

    return React.cloneElement(children, {
        elevation: trigger ? 2 : 0
    })
}

export default function Header(props) {
    return (
        <Box sx={{mb: 7}}>
            <ElevationScroll {...props}>
                <AppBar component="nav">
                    <Toolbar sx={{
                        height: '8vh',
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: 'white'
                    }}>
                        <Link href="/homepage" underline="none">
                            <Typography variant="h5" color="primary" sx={{cursor: 'pointer'}}>
                                <b>IOMed</b>
                            </Typography>
                        </Link>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            <Button component={Link} href="#home"
                                    color="primary" sx={{fontSize: 15, ml: 2}}>
                                Home
                            </Button>
                            <Button component={Link} href="#funzioni"
                                    color="primary" sx={{fontSize: 15, ml: 2}}>
                                Funzioni
                            </Button>
                            <Button component={Link} href="#contattaci"
                                    color="primary" sx={{fontSize: 15, ml: 2}}>
                                Contattaci
                            </Button>
                            <Button component={Link} href="#nizia"
                                    variant="contained" sx={{width: 100, fontSize: 15, borderRadius: 5, ml: 2}}>
                                Inizia
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </Box>
    )
}