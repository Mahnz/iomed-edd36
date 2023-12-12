import * as React from 'react';
import {Button, Menu, MenuItem, Divider, styled, alpha, IconButton, Badge} from '@mui/material';
import {Edit, Archive, FileCopy, MoreHoriz, KeyboardArrowDown} from '@mui/icons-material';
import NotificationsPanel from "../components/NotificationsPanel.js";

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
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}))

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openPanel = Boolean(anchorEl);
    const handleClickPanel = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePanel = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="demo-customized-button"
                aria-controls={openPanel ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openPanel ? 'true' : undefined}
                onClick={handleClickPanel}
            >
                <Badge color="secondary">
                    <KeyboardArrowDown/>
                </Badge>
            </IconButton>
            {/*<NotificationsPanel handleClosePanel={handleClosePanel} anchorEl={anchorEl} openPanel={openPanel}/>*/}
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={openPanel}
                onClose={handleClosePanel}
            >
                <MenuItem onClick={handleClosePanel}>Profile</MenuItem>
                <MenuItem onClick={handleClosePanel}>My account</MenuItem>
                <MenuItem onClick={handleClosePanel}>Logout</MenuItem>
            </StyledMenu>
        </div>
    );
}