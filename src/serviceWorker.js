// Please, don't do it while developing
const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

  
// First check if the service worker is available in this browser
if ('serviceWorker' in navigator && !isLocalhost) {
    // Check if the service worker is available
    fetch("./service-worker.js", {
        headers: { "Service-Worker": "script" },
    })
    .then(() => {
        registerServiceWorker();
    })
    .catch(() => {
        console.log("CMGT APP is offline");
    });
}

// Register service worker
function registerServiceWorker() {
    navigator.serviceWorker.register("/service-worker.js")
        .then(registration => {
            console.log("SW is registered 🥳");

            // Interval every 15 minutes for auto updates
            setInterval(() => {
                registration.update();
            }, 900000);

            registration.onupdatefound = () => {
                const installingWorker = registration.installing;

                if (installingWorker == null) {
                    return;
                }

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === "installed") {
                        if (navigator.serviceWorker.controller) {
                            console.log("Service worker has just been updated! ✔️")
                            console.log("Please reload in the background...")
                            serviceWorkerHasUpdate(installingWorker);
                        } else {
                            console.log("Service worker has just been installed! 📥");
                            serviceWorkerRegistered();
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error("❌ Error during service worker registration:", error);
        });
}

