import React from 'react';
import TagList from '../components/TagList/TagList';
import ServiceWorkerSnackbars from '../components/ServiceWorkerSnackbars';
import ProjectsOverview from '../components/ProjectsOverview/ProjectsOverview';

export default function Overview() {
    return (
        <div>
            <TagList />

            <ProjectsOverview />
        </div>
    );
}