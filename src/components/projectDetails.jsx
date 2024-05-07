import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjects, fetchImageUrlById } from '../utilities/api';


function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [highlightsOpen, setHighlightsOpen] = useState(false);

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
        const projectsData = await getProjects();
        const filteredProjects = projectsData.filter(proj => proj.id !== parseInt(projectId));
        
       
        const otherProjectsData = await Promise.all(filteredProjects.map(async (proj) => {
          const desktopImageUrl = proj?.acf?.desktop_image ? await fetchImageUrlById(proj.acf.desktop_image) : null;
          return { ...proj, desktopImageUrl };
        }));
        
        setOtherProjects(otherProjectsData);
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
    <div className='project-single-main'>
      <div className="single-project-top-section">
        <header>
          <h2>{project?.title?.rendered}</h2>
        </header>
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
      <div className="single-projects-intro">
        <div className="tools-used-section">
          <div className='tools-used-list'>
            <ul>
              {project?.acf?.tools_used_text && (
                <div dangerouslySetInnerHTML={{ __html: project.acf.tools_used_text }} />
              )}
            </ul>
          </div>
        </div>
        <p className="project-paragraph-section">{project?.acf?.project_overview}</p>
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
      
      <section className="extras-section">
        <div className='insights-section'>
          <header onClick={() => setInsightsOpen(!insightsOpen)} style={{ cursor: 'pointer' }}>
            <h3>Insights {insightsOpen ? '▼' : '►'}</h3>
          </header>
          {insightsOpen && (
            <div>
              <p>{project?.acf?.insights_text}</p>
            </div>
          )}
        </div>
        <div className='highlights-section'>
          <header onClick={() => setHighlightsOpen(!highlightsOpen)} style={{ cursor: 'pointer' }}>
            <h3>Highlights {highlightsOpen ? '▼' : '►'}</h3>
          </header>
          {highlightsOpen && (
            <div>
              <p>{project?.acf?.highlights_text}</p>
            </div>
          )}
        </div>
      </section>

      </div>
      <div className='other-projects-section'>
        <h3>Other Projects</h3>
        {otherProjects.length > 0 && (
          <div className="other-projects-all">
            {otherProjects.map((proj, index) => (
              <div className="other-projects-card" key={proj.id}>
                <Link to={`/project/${proj.id}`}>
                  <h4>{proj.title.rendered}</h4>
                  {proj.desktopImageUrl && (
                    <img src={proj.desktopImageUrl} alt={proj.title.rendered} />
                  )}
                  <div className="project-tools-used" dangerouslySetInnerHTML={{ __html: proj.acf.tools_used_text }} />
                  
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
