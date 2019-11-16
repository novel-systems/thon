import React, { useState, useEffect, useCallback } from 'react';

import { Box } from '@material-ui/core';
import PageWrapper from 'components/layouts/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';
import ProjectsGrid from 'components/projects/ProjectsGrid';

import ProjectsService from 'services/projects';

const ProjectsChallengeAdmin = ({ match }) => {
    const { slug, token } = match.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const data = await ProjectsService.getProjectsWithToken(slug, token);
            setData(data);
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    }, [slug, token]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <PageWrapper
            loading={loading || !data}
            error={error}
            render={() => (
                <CenteredContainer>
                    <PageHeader heading={data.challenge.name} subheading={data.projects.length + ' projects'} />
                    <ProjectsGrid projects={data.projects} event={data.event} />
                    <Box height={200} />
                </CenteredContainer>
            )}
        ></PageWrapper>
    );
};

export default ProjectsChallengeAdmin;