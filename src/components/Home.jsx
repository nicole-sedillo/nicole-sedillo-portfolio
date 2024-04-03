import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // Import Link component
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

            <div className="home-main">
              <section className="home-projects-section" id="projects-section">
                  {projects.map(project => (
                      <div className="project-card" key={project.id}>
                          <Link to={`/project/${project.id}`}> {/* Link to individual project page */}
                              <h3>{project?.title?.rendered}</h3>
                          </Link>
                          <p>{project?.acf?.project_overview}</p>
                          <ul className="tools-used">
                              {project?.acf?.tools_used_text && (
                                  <div dangerouslySetInnerHTML={{ __html: project.acf.tools_used_text }} />
                              )}
                          </ul>
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
                          <div className="project-images-section">
                              <div className="desktop-image">
                                  {project?.desktopImageUrl && (
                                      <img
                                          src={project.desktopImageUrl}
                                          alt={project?.title?.rendered}
                                      />
                                  )}
                              </div>
                              <div className="mobile-image">
                                  {project?.mobileImageUrl && (
                                      <img
                                          src={project.mobileImageUrl}
                                          alt={project?.title?.rendered}
                                      />
                                  )}
                              </div>
                          </div>
                          <Link to={`/project/${project.id}`} className="view-details-link">View Details</Link>
                      </div>
                  ))}
              </section>
            </div>
        </div>
    );
}

export default Home;
