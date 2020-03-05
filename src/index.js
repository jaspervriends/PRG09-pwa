import React from 'react';
import ReactDOM from 'react-dom';
import "./serviceWorker";
import { ThemeProvider } from '@material-ui/core';
import theme from './theme.js';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Overview from './pages/Overview';
import Header from './components/Header/Header';
import ProjectInfo from './pages/ProjectInfo';
import ServiceWorkerSnackbars from './components/ServiceWorkerSnackbars';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header />

                <div style={{ margin: '20px auto', maxWidth: '90%' }}>
                    <Switch>
                        <Route path="/" exact component={Overview} />
                        <Route path="/tag/:tag" component={Overview} />
                        <Route path="/project/:projectSlug" component={ProjectInfo} />
                        <Route path="*" exact>
                            <h4>404</h4>
                            <p>Deze pagina werd niet gevonden. <Link to="/">Keer terug naar de homepagina</Link></p>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
            
            <ServiceWorkerSnackbars />
        </ThemeProvider>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));
