import React, { useEffect, useState } from "react";
import { getPages, getProjects, fetchImageUrlById } from "../utilities/api";

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
        const fetchProjectImages = async () => {
            const updatedProjects = await Promise.all(projects.map(async (project) => {
                const desktopImageUrl = project?.acf?.desktop_image ? await fetchImageUrlById(project.acf.desktop_image) : null;
                const mobileImageUrl = project?.acf?.mobile_image ? await fetchImageUrlById(project.acf.mobile_image) : null;

                return {
                    ...project,
                    desktopImageUrl,
                    mobileImageUrl
                };
            }));
            
            setProjects(updatedProjects);
        };

        fetchProjectImages();
    }, [projects]);

    return (
        <div>
          <header className="home-banner"> 
            <h1>{homeData?.[1]?.title?.rendered}</h1>
            <p>Front-End Web Developer</p>
          </header>
          <section className="home-projects-title">
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
