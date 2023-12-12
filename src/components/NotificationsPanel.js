import React, {useState} from 'react'
import {IconButton, Snackbar, SnackbarContent, Alert as MuiAlert} from '@mui/material'
import {Close} from '@mui/icons-material'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NotificationsPanel({onClose, open}) {
    const notifications = [
        {id: 1, message: 'Nuova notifica 1'},
        {id: 2, message: 'Nuova notifica 2'},
        // Aggiungi più notifiche qui
    ]

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            {notifications.map((notification) => (
                <SnackbarContent
                    key={notification.id}
                    message={notification.message}
                    action={
                        <IconButton size="small" color="inherit" onClick={onClose}>
                            {/* Icona per chiudere */}
                            {/* Puoi utilizzare un'icona come CloseIcon qui */}
                        </IconButton>
                    }
                />
            ))}
        </Snackbar>

        // <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        //     <Alert onClose={onClose} severity="info">
        //         Esempio di notifica
        //     </Alert>
        // </Snackbar>
    )
}