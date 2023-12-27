// NotificationsPanel.js
import React from 'react'
import {
    Menu,
    MenuItem,
    Divider,
    IconButton,
    styled,
    List, ListItemText, ListItemAvatar, ListItemSecondaryAction, ListItemButton,
    Tooltip, Avatar, Typography
} from '@mui/material'
import {Cancel, Delete, PersonAdd, AddCircleOutline} from "@mui/icons-material";

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
        minWidth: 300,
        maxWidth: 400,
        fontSize: 14,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },
}));

export default function NotificationsPanel({
                                               anchorEl,
                                               handleClose,
                                               openPanel,
                                               notifArray,
                                               deleteNotification,
                                               deleteAllNotifications
                                           }) {
    return (
        <StyledMenu
            id="notification-panel"
            anchorEl={anchorEl}
            open={openPanel}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'notification-button',
            }}
        >
            <List>
                <ListItemButton>
                    <ListItemText primary='Notifiche'/>
                    <ListItemSecondaryAction>
                        <Tooltip title='Elimina tutte le notifiche'>
                            <IconButton
                                variant="outlined"
                                size="small"
                                onClick={deleteAllNotifications}
                            >
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItemButton>
                {notifArray.map((ntf, index) => (
                    <React.Fragment key={index}>
                        <Divider variant="inset" component="li"/>
                        <ListItemButton alignItems="flex-start"
                            // onClick={{ntf.type === "Nuovo referto aggiunto" ? viewFile : viewMedic}}
                        >
                            <ListItemAvatar>
                                {ntf.type === "Nuovo referto aggiunto"
                                    ? <Avatar sx={{bgcolor: '#81c784'}}>
                                        <AddCircleOutline/>
                                    </Avatar>
                                    : <Avatar sx={{bgcolor: '#e57373'}}>
                                        <PersonAdd/>
                                    </Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText
                                primary={ntf.type}
                                secondary={
                                    <Typography
                                        sx={{display: 'inline'}}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {ntf.message}
                                    </Typography>
                                }
                                sx={{marginRight: '48px'}}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip title='Cancella notifica'>
                                    <IconButton
                                        edge="end"
                                        onClick={() => deleteNotification(ntf.id)}
                                    >
                                        <Cancel/>
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </React.Fragment>
                ))}
            </List>
            {notifArray.length === 0 && (
                <MenuItem disabled onClick={handleClose}>
                    Nessuna notifica
                </MenuItem>
            )}
        </StyledMenu>
    )
}