# CMGT PRG09 Progressive Web Application assignment
School assignment, build in React using material-ui.com components. Using the CMGT Showcase https://cmgt.hr.nl:8000/api API.

Caches content/fetch requests for offline usage by using the browser `indexedDB` api.

### Feedback
A better approach would be to remove `apiCache.js` and move the logic to the `serviceWorker.js`. Then manipulate the `fetch` results from this file. 

### Application example
https://prg9-pwa.vriends.co/