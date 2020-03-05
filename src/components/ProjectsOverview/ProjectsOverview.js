import React, { useState, useEffect } from 'react';
import apiCache from '../../utils/apiCache';
import { Button, Chip } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams, useHistory } from 'react-router-dom';

export default function ProjectOverview() {
    const { tag } = useParams();
    const history = useHistory();

    const [projectsOverview, setProjectsOverview] = useState([]);
    const [forceReload, setForceReload] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [needInternetConnection, setNeedInternetConnection] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTag, setCurrentTag] = useState(tag);
    const [pageCount, setPageCount] = useState(1);

    // Got new data, refresh list
    useEffect(() => {
        if(currentTag !== tag) {
            setCurrentTag(tag);
            setCurrentPage(1);
        }

        setForceReload(true);
    }, [tag, currentPage]);

    // Need new data
    if(forceReload) {
        setIsLoading(true);
        setForceReload(false);

        apiCache(`/projects?page=${currentPage}&limit=5${currentTag ? `&tag=${currentTag}` : ''}`)
            .then(({ projects, pagination }) => { 
                setProjectsOverview(projects);
                setPageCount(pagination.totalPages);
            })
            .catch(e => {
                setNeedInternetConnection(true);
            })
            .then(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className={"taglist"}>
            <Pagination 
                count={pageCount}
                page={currentPage} 
                onChange={(e, value) => {
                    setCurrentPage(value);
                }}
                style={{
                    margin: '20px 0'
                }}
                />
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Titel</TableCell>
                        <TableCell>Auteur(s)</TableCell>
                        <TableCell>Slogan</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? 
                        <TableRow key={-1}><TableCell colSpan={5} style={{ textAlign: 'center' }}>Projecten laden...</TableCell></TableRow> 
                    : (
                        needInternetConnection ? (
                            <TableRow key={-1}><TableCell colSpan={5} style={{ textAlign: 'center' }}>Helaas staat deze pagina niet in de cache. Verbind met het internet en probeer het daarna opnieuw.</TableCell></TableRow> 
                        ) : projectsOverview.map((projectData, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {projectData.title}
                                </TableCell>
                                <TableCell>{projectData.author}</TableCell>
                                <TableCell>{projectData.tagline}</TableCell>
                                <TableCell>
                                    {projectData.tags.map((projectTag, tagKey) => (
                                        <Chip key={tagKey} label={projectTag} style={{ marginRight: 5, marginBottom: 5 }} onClick={() => history.push(`/tag/${projectTag}`)} />)
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button variant={"contained"} color={"primary"} onClick={() => history.push(`/project/${projectData.slug}`)}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}

                    {!isLoading && !needInternetConnection && projectsOverview.length === 0 && <TableRow key={-1}><TableCell colSpan={5} style={{ textAlign: 'center' }}>Er is geen data in deze tag</TableCell></TableRow>}
                </TableBody>
            </Table>
            </TableContainer>
    
            <Pagination 
                count={pageCount}
                page={currentPage} 
                onChange={(e, value) => {
                    setCurrentPage(value);
                }}
                style={{
                    margin: '20px 0'
                }}
                />
        </div>
    );
}