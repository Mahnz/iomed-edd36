// UserIconPanel.js
import React from 'react'
import {useNavigate} from "react-router-dom";
import {
    Menu,
    Divider,
    IconButton,
    styled,
    List, ListItemText, ListItemSecondaryAction,
    Tooltip, ListItemButton
} from '@mui/material'
import {Logout, Settings} from "@mui/icons-material";
import Cookies from "universal-cookie";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 3,
        marginTop: theme.spacing(1),
        minWidth: 220,
        maxWidth: 220,
        fontSize: 14,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },
}));

export default function UserIconPanel({
                                          anchorEl,
                                          handleClose,
                                          openPanel,
                                          setSelectedTab,
                                          setLoggedUser
                                      }) {

    const navigate = useNavigate()
    const cookies = new Cookies()

    const logout = () => {
        cookies.remove('token', {path: '/'})
        cookies.remove("lastName", {path: '/'})
        cookies.remove("firstName", {path: '/'})
        cookies.remove("type", {path: '/'})
        cookies.remove("notifications", {path: '/'})
        navigate("/homepage")
    }

    const getHandler = (tab) => {
        return () => {
            setSelectedTab(tab)
            handleClose()
        }
    }

    return (
        <StyledMenu
            id="user-icon-panel"
            anchorEl={anchorEl}
            open={openPanel}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'notification-button',
            }}
            sx={{p: 0, m: 0}}
        >
            <List sx={{p: 0, m: 0}}>
                <ListItemButton alignItems="flex-start" onClick={getHandler("P")}>
                    <ListItemText primary="Il mio profilo"/>
                </ListItemButton>
                <Divider/>

                <ListItemButton alignItems="flex-start" onClick={getHandler("S")}>
                    <ListItemText primary="Impostazioni"/>
                    <ListItemSecondaryAction>
                        <Tooltip title='Impostazioni'>
                            <IconButton
                                edge="end"
                                onClick={getHandler("S")}
                            >
                                <Settings/>
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItemButton>

                <Divider/>

                <ListItemButton alignItems="flex-start" onClick={logout}>
                    <ListItemText primary="Esci dal profilo"/>
                    <ListItemSecondaryAction>
                        <Tooltip title='Logout'>
                            <IconButton
                                edge="end"
                                onClick={logout}
                            >
                                <Logout/>
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </List>
        </StyledMenu>
    )
}