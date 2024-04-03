import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjects, fetchImageUrlById } from '../utilities/api';

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('toolsUsed');

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
      <div className="single-project-top-section">
        <div className="single-projects-intro">
          <h2>{project?.title?.rendered}</h2>
          <p>{project?.acf?.project_overview}</p>
        </div>

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
      </div>

      <div className="single-project-mid-section">
        <div className="tab-navigation">
          <button className={activeTab === 'toolsUsed' ? 'active' : ''} onClick={() => setActiveTab('toolsUsed')}>Tools Used</button>
          <button className={activeTab === 'insights' ? 'active' : ''} onClick={() => setActiveTab('insights')}>Insights</button>
          <button className={activeTab === 'highlights' ? 'active' : ''} onClick={() => setActiveTab('highlights')}>Highlights</button>
        </div>

        <div className="tab-content">
          {activeTab === 'toolsUsed' && (
            <div className="tools-used-section">
              <header>
                <h3>Tools Used</h3>
              </header>
              <div className='tools-used-list'>
                <ul>
                  {project?.acf?.tools_used_text && (
                    <div dangerouslySetInnerHTML={{ __html: project.acf.tools_used_text }} />
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className='insights-section'>
              <header>
                <h3>Insights</h3>
              </header>
              <p>{project?.acf?.insights_text}</p>
            </div>
          )}

          {activeTab === 'highlights' && (
            <div className='highlights-section'>
              <header>
                <h3>Highlights</h3>
              </header>
              <p>{project?.acf?.highlights_text}</p>
            </div>
          )}
        </div>

        <div className="project-links">
          <p>
            {project?.acf?.github_link?.url && (
              <a href={project.acf.github_link.url} target="_blank" rel="noopener noreferrer">
                {project.acf.github_link.title}
              </a>
            )}
          </p>
          <p>
            {project?.acf?.live_site_link?.url && (
              <a href={project.acf.live_site_link.url} target="_blank" rel="noopener noreferrer">
                {project.acf.live_site_link.title}
              </a>
            )}
          </p>
          {project?.acf?.prototype_link?.url && (
            <p>
              <a href={project.acf.prototype_link.url} target="_blank" rel="noopener noreferrer">
                {project.acf.prototype_link.title}
              </a>
            </p>
          )}
        </div>
      </div>

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
