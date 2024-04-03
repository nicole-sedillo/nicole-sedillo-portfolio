import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjects, fetchImageUrlById } from '../utilities/api';

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the project by ID
        const projectsData = await getProjects();
        const foundProject = projectsData.find(proj => proj.id === parseInt(projectId));
        if (foundProject) {
          // Fetch image URLs for the project
          const desktopImageUrl = foundProject?.acf?.desktop_image ? await fetchImageUrlById(foundProject.acf.desktop_image) : null;
          const mobileImageUrl = foundProject?.acf?.mobile_image ? await fetchImageUrlById(foundProject.acf.mobile_image) : null;
          
          // Set the project with image URLs
          setProject({
            ...foundProject,
            desktopImageUrl,
            mobileImageUrl
          });
        } else {
          console.error('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchData();
  }, [projectId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all projects except the current one
        const projectsData = await getProjects();
        const filteredProjects = projectsData.filter(proj => proj.id !== parseInt(projectId));
        setOtherProjects(filteredProjects);
      } catch (error) {
        console.error('Error fetching other projects:', error);
      }
    };

    fetchData();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{project?.title?.rendered}</h2>
      <p>{project?.acf?.project_overview}</p>

      <div className="single-project-images-section">
        <div className="single-desktop-image">
          {project.desktopImageUrl && (
            <img
              src={project.desktopImageUrl}
              alt={project.title.rendered}
            />
          )}
        </div>
        <div className="single-mobile-image">
          {project.mobileImageUrl && (
            <img
              src={project.mobileImageUrl}
              alt={project.title.rendered}
            />
          )}
        </div>
      </div>

      <h3>Tools Used</h3>
      <ul>
        {project?.acf?.tools_used_text && (
          <div dangerouslySetInnerHTML={{ __html: project.acf.tools_used_text }} />
        )}
      </ul>
      <h3>Insights</h3>
      <p>{project?.acf?.insights_text}</p>
      <h3>Highlights</h3>
      <p>{project?.acf?.highlights_text}</p>

      <h3>Other Projects</h3>
      <ul>
        {otherProjects.map(proj => (
          <li key={proj.id}>
            <Link to={`/project/${proj.id}`}>{proj.title.rendered}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetails;
