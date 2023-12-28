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
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    })

    return React.cloneElement(children, {
        elevation: trigger ? 2 : 0,
    })
}

export default function Header(props) {
    return (
        <Box sx={{marginBottom: '70px'}}>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar sx={{
                        height: '8vh',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px',
                        backgroundColor: 'white'
                    }}>
                        <Link href="/homepage" underline="none">
                            <Typography variant="h5" color="primary" sx={{cursor: 'pointer'}}>
                                <b>IOMed</b>
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </Box>
    )
}