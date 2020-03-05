import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useHistory } from 'react-router-dom';

export default function Header() {
    const history = useHistory();
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const updateIndicator = e => setIsOnline(navigator.onLine);

    useEffect(() => {
        window.addEventListener('online',  updateIndicator);
        window.addEventListener('offline', updateIndicator);

        return () => {
            window.removeEventListener("online", updateIndicator);
            window.removeEventListener("offline", updateIndicator);
        }
    });

    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex' }}>
                <IconButton
                    onClick={() => history.push("/")}
                    color="inherit"
                    style={{ marginRight: 15 }}>
                    <SvgIcon>
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </SvgIcon>
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    CMGT Projecten
                </Typography>

                <div>
                    <Typography variant="subtitle1">
                        {isOnline ? "Je bent online" : "Je bent offline"}
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}