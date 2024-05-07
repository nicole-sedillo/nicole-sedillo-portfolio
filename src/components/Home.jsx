import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import { getPages, getProjects, fetchImageUrlById } from "../utilities/api";




function Home() {
    const [homeData, setHomeData] = useState([]);
    const [projects, setProjects] = useState([]);
    const [developerText, setDeveloperText] = useState("Front-End Web Developer");

    // Function for dynamic text
    useEffect(() => {
        const textOptions = ["Front-End Web Developer", "Web Designer", "Digital Marketer"];
        let index = 0;
    
        const intervalId = setInterval(() => {
            setDeveloperText(textOptions[index]);
            index = (index + 1) % textOptions.length;
        }, 2000);
    
        // Show mouse scroll after 2 seconds
        const showMouseScroll = setTimeout(() => {
            const mouseScroll = document.querySelector('.mouse_scroll');
            if (mouseScroll) {
                mouseScroll.style.display = 'block';
            }
        }, 2000);
    
        return () => {
            clearInterval(intervalId);
            clearTimeout(showMouseScroll);
        };
    }, []);


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
                    

                    return {
                        ...project,
                        desktopImageUrl,
                        
                    };
                }));
                setProjects(projectsWithImages);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Smooth scroll to projects section when page loads with a hash in the URL
        const hash = window.location.hash;
        if (hash === '#projects-section') {
            const projectsSection = document.getElementById('projects-section');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);


    return (
        <div className="main-home">
            <header className="home-banner">
                <section className="home-banner-text">
                    <p>Hi, I'm Nicole. </p>
                    <p> I'm a <strong className="dynamic-text">{developerText}</strong></p>
                </section>
                
                <div className="mouse_scroll">
                    <span className="m_scroll_arrows one"></span>
                    <span className="m_scroll_arrows two"></span>
                    <span className="m_scroll_arrows three"></span>
                </div>
            </header>

            <div className="home-main">
                <a href="#main-content" className="skip-link">Skip to content</a>
                <h2>Projects</h2>
                <section id="projects-section" className="home-projects-section">
                    {projects.map(project => (
                        <div className="project-card" key={project.id}>
                            <Link to={`/project/${project.id}`}>
                                <div className="project-overlay">
                                    <h3>{project?.title?.rendered}</h3>
                                    <ul className="tools-used">
                                        {project?.acf?.tools_used_text && (
                                            <div dangerouslySetInnerHTML={{ __html: project.acf.tools_used_text }} />
                                        )}
                                    </ul>
                                </div>
                            </Link>
                            <div className="project-images-section">
                                <div className="desktop-image">
                                    {project?.desktopImageUrl && (
                                        <img
                                            src={project.desktopImageUrl}
                                            alt={project?.title?.rendered}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Home;
