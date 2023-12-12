import React from 'react'
import {Menu, MenuItem, Divider, IconButton, Badge} from '@mui/material'
import {Close} from "@mui/icons-material";

export default function NotificationsPanel({anchorEl, handleClose, openPanel, notifArray}) {
    return (
        <Menu
            id="notification-panel"
            anchorEl={anchorEl}
            open={openPanel}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'notification-button',
            }}
        >
            {notifArray.length > 0 ? (
                notifArray.map((ntf) => (
                    <MenuItem key={ntf.id} onClick={handleClose}>
                        {ntf.label}
                        <IconButton>
                            <Badge color="secondary">
                                <Close/>
                            </Badge>
                        </IconButton>
                    </MenuItem>
                    // <Divider sx={{ my: 0.5 }} />
                ))
            ) : (
                <MenuItem disabled onClick={handleClose}>
                    Nessuna notifica
                </MenuItem>
            )}
        </Menu>
    )
}