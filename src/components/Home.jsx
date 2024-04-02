import React, { useEffect, useState } from "react";
import { getPages, getProjects, fetchImageUrlById } from "../utilities/api";
import arrow from "../images/arrow.svg";

function Home() {
    const [homeData, setHomeData] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getPages()
          .then(data => {
            setHomeData(data);
          })
          .catch(error => {
            alert(error);
          });

        getProjects()
          .then(data => {
            setProjects(data);
          })
          .catch(error => {
            console.error("Error fetching projects:", error);
          });
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const projectsData = await getProjects();
              const projectsWithImages = await Promise.all(projectsData.map(async project => {
                  const desktopImageUrl = project?.acf?.desktop_image ? await fetchImageUrlById(project.acf.desktop_image) : null;
                  const mobileImageUrl = project?.acf?.mobile_image ? await fetchImageUrlById(project.acf.mobile_image) : null;
  
                  return {
                      ...project,
                      desktopImageUrl,
                      mobileImageUrl
                  };
              }));
              setProjects(projectsWithImages);
          } catch (error) {
              console.error("Error fetching projects:", error);
          }
      };
  
      fetchData();
  }, []);
  
  

    const handleScrollToProjects = () => {
      const projectsSection = document.getElementById('projects-section');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
        <div>

          <header className="home-banner">
            <section className="home-banner-text">
              <h1>{homeData?.[1]?.title?.rendered}</h1>
              <p>Front-End Web Developer</p>
            </section> 
            <a className="projects-link" onClick={handleScrollToProjects}>
            <img src={arrow} alt="" />
          </a>
          </header>

          

          <section className="home-projects-title" id="projects-section">
            <h2>{homeData?.[1]?.acf?.projects_title}</h2>
            <p>{homeData?.[1]?.acf?.projects_intro}</p>
          </section>
          <section className="home-projects-section">
            {projects.map(project => (
              <div key={project.id}>
                <h3>{project?.title?.rendered}</h3>
                <p>{project?.acf?.project_overview}</p>
                <ul>
                  {project?.acf?.tools_used_text && (
                    <div dangerouslySetInnerHTML={{ __html: project.acf.tools_used_text }} />
                  )}
                </ul>
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
                
                {project?.desktopImageUrl && (
                  <img
                    src={project.desktopImageUrl}
                    alt={project?.title?.rendered}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
                
                {project?.mobileImageUrl && (
                  <img
                    src={project.mobileImageUrl}
                    alt={project?.title?.rendered}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
              </div>
            ))}
          </section>
        </div>
    );
}

export default Home;
