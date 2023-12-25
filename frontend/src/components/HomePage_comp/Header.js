import React from 'react'
import {
    AppBar,
    Typography,
    Link,
    Box,
    Toolbar, useScrollTrigger
} from '@mui/material'
import PropTypes from 'prop-types'

function ElevationScroll(props) {
    const {children, window} = props
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    })

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    })
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

export default function Header(props) {
    return (
        <Box sx={{marginBottom: '70px'}}>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar sx={{
                        height: '10vh',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px',
                        backgroundColor: 'white'
                    }}>
                        <Link href="#" underline="none">
                            <Typography variant="h5"
                                        sx={{
                                            color: 'blue',
                                            cursor: 'pointer'
                                        }}>
                                MEDPlatform
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </Box>
    )
}