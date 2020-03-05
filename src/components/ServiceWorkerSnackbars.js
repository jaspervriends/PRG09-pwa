import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default function ServiceWorkerSnackbars() {
    const [registeredRef, setRegisteredRef] = useState(null);
    const [updateRef, setUpdateRef] = useState(null);
  
    global.serviceWorkerRegistered = () => setRegisteredRef(true);
    global.serviceWorkerHasUpdate = serviceWorker => setUpdateRef(serviceWorker);
  
    const updateServiceWorker = () => {
      const registrationWaiting = updateRef.waiting;

      // If available, then activate the new version
      if (registrationWaiting) {
        registrationWaiting.postMessage({ type: "SKIP_WAITING" });

        // Wait until the new service worker is activated, then reload the webpage
        registrationWaiting.addEventListener("statechange", e => {
          if (e.target.state === "activated") {
            window.location.reload();
          }
        });
      }

      setUpdateRef(null);
    };

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={registeredRef !== null}
          autoHideDuration={6000}
          onClose={() => setRegisteredRef(null)}
          message="Content is cached voor eventueel offline gebruik."
        />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={updateRef !== null}
          onClose={updateServiceWorker}
          message="Er is een update beschikbaar."
          action={<Button onClick={updateServiceWorker} color={"primary"}>UPDATE</Button>}
        />
      </div>
    );
  }
  