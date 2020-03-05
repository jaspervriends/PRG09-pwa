import React, { useState, useEffect } from 'react';
import TagList from '../components/TagList/TagList';
import ServiceWorkerSnackbars from '../components/ServiceWorkerSnackbars';
import ProjectsOverview from '../components/ProjectsOverview/ProjectsOverview';
import { useHistory, useParams, Link } from 'react-router-dom';
import { CircularProgress, Paper, Typography, Chip, Grid } from '@material-ui/core';
import apiCache from '../utils/apiCache';

export default function ProjectInfo() {
    const { projectSlug } = useParams();
    const history = useHistory();

    const [projectData, setProjectData] = useState(null);
    const [forceReload, setForceReload] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [needInternetConnection, setNeedInternetConnection] = useState(false);

    // Got new data, refresh list
    useEffect(() => {
        setForceReload(true);
    }, [projectSlug]);

    // Need new data of this project
    if(forceReload) {
        setIsLoading(true);
        setForceReload(false);

        apiCache(`/projects/${projectSlug}`)
            .then(data => setProjectData(data))
            .catch(e => {
                setNeedInternetConnection(true);
            })
            .then(() => {
                setIsLoading(false);
            })
    }

    // Still loading
    if(isLoading) {
        return (
            <div style={{ paddingTop: 150, textAlign: 'center' }}>
                <CircularProgress color={"primary"} size={70} />
            </div>
        )
    }

    // Not cached & no internet connection
    if(needInternetConnection) {
        return (
            <Paper style={{ padding: '10px 20px' }}>
                <h3>Je mist je internet</h3>
                <p>Het lijkt er op dat je geen internet hebt. Hierdoor kunnen we op dit moment deze pagina niet laden. De content is helaas eerder niet gecached.<Link to="/">Terug naar de home</Link>.</p>
            </Paper>
        );
    }

    return (
        <Paper style={{ marginTop: 50 }}>
            <div style={{ height: 300, backgroundImage: `url('https://cmgt.hr.nl:8000/${projectData.headerImage}')`, backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>
            <div style={{ padding: '20px 30px' }}>
                <Typography variant="h2">
                    {projectData.title}
                </Typography>
                <Typography variant="h5" style={{ marginTop: 15 }}>
                    {projectData.tagline}
                </Typography>
                <Typography variant="body1" style={{ marginTop: 15 }}>
                    {projectData.description}
                </Typography>

                <Typography variant="body1" style={{ marginTop: 15 }}>
                    Auteur(s): <b>{projectData.author}</b>, leerjaar <b>{projectData.year}</b>
                </Typography>

                {projectData.websites.length > 0 && (
                <div>
                    <Typography variant="h5" style={{ marginTop: 15 }}>
                        Websites
                    </Typography>

                    <div style={{ margin: '10px 0' }}>
                        {projectData.websites.map((projectWebsite, tagKey) => (
                            <Chip key={tagKey} label={projectWebsite} style={{ marginRight: 10, marginBottom: 5 }} onClick={() => window.open(projectWebsite)} />)
                        )}
                    </div>
                </div>
                )}

                <Typography variant="h5" style={{ marginTop: 15 }}>
                    Tags
                </Typography>
                
                <div style={{ margin: '10px 0' }}>
                    {projectData.tags.map((projectTag, tagKey) => (
                        <Chip key={tagKey} label={projectTag} style={{ marginRight: 10, marginBottom: 5 }} onClick={() => history.push(`/tag/${projectTag}`)} />)
                    )}
                </div>
                
                <Typography variant="h5" style={{ marginTop: 15 }}>
                    Foto's
                </Typography>
                <Grid container style={{ margin: '20px 0' }} spacing={1}>
                    {projectData.screenshots.map((image, tagKey) => (
                        <Grid item sm={6} key={tagKey}>
                            <img src={`https://cmgt.hr.nl:8000/${image}`}  style={{ maxWidth: '100%' }} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Paper>
    );
}