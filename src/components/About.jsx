import React, { useEffect, useState } from 'react';
import { getPages, fetchImageUrlById } from '../utilities/api'; // Import fetchImageUrlById function

function About() {
  const [aboutData, setAboutData] = useState([]);
  const [codingSkillsElements, setCodingSkillsElements] = useState(null); // State for coding skills elements
  const [designSkillsElements, setDesignSkillsElements] = useState(null); // State for design skills elements
  const [marketingSkillsElements, setMarketingSkillsElements] = useState(null); // State for marketing skills elements

  useEffect(() => {
    getPages()
      .then(data => {
        setAboutData(data);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    // Function to fetch image URLs and render coding skills elements
    const renderCodingSkills = async () => {
      const codingSkills = aboutData?.[0]?.acf?.coding_skills;
      if (!codingSkills) return null;

      const elements = await Promise.all(codingSkills.map(async (skill, index) => {
        const imageUrl = await fetchImageUrlById(skill.coding_skill_image);
        return (
          <div key={index}>
            <p>{skill.coding_skill_label}</p>
            {imageUrl && <img src={imageUrl} alt={skill.coding_skill_label} />}
          </div>
        );
      }));

      setCodingSkillsElements(elements); // Update state with resolved elements
    };

    renderCodingSkills(); // Call the function to fetch image URLs and render elements
  }, [aboutData]); // Re-run effect when aboutData changes

  useEffect(() => {
    // Function to fetch image URLs and render design skills elements
    const renderDesignSkills = async () => {
      const designSkills = aboutData?.[0]?.acf?.design_skills;
      if (!designSkills) return null;

      const elements = await Promise.all(designSkills.map(async (skill, index) => {
        const imageUrl = await fetchImageUrlById(skill.design_skills_image);
        return (
          <div key={index}>
            <p>{skill.design_skills_label}</p>
            {imageUrl && <img src={imageUrl} alt={skill.design_skills_label} />}
          </div>
        );
      }));

      setDesignSkillsElements(elements); // Update state with resolved elements
    };

    renderDesignSkills(); // Call the function to fetch image URLs and render elements
  }, [aboutData]); // Re-run effect when aboutData changes

  useEffect(() => {
    // Function to fetch image URLs and render marketing skills elements
    const renderMarketingSkills = async () => {
      const marketingSkills = aboutData?.[0]?.acf?.marketing_skills;
      if (!marketingSkills) return null;

      const elements = await Promise.all(marketingSkills.map(async (skill, index) => {
        const imageUrl = await fetchImageUrlById(skill.marketing_skills_image);
        return (
          <div key={index}>
            <p>{skill.marketing_skills_label}</p>
            {imageUrl && <img src={imageUrl} alt={skill.marketing_skills_label} />}
          </div>
        );
      }));

      setMarketingSkillsElements(elements); // Update state with resolved elements
    };

    renderMarketingSkills(); // Call the function to fetch image URLs and render elements
  }, [aboutData]); // Re-run effect when aboutData changes

  return (
    <div className='main'>
      <div className='about-intro-section'>
        <h1>
          {aboutData?.[0]?.title?.rendered}
        </h1>
        <p>
          {aboutData?.[0]?.acf?.about_overview}
        </p>
      </div>

     
    
      <div className='skills-section'>

        <header>
          <h2>{aboutData?.[0]?.acf?.skills_title}</h2>
        </header>
        
        <div className='coding-skills-card'>
          <h3>{aboutData?.[0]?.acf?.coding_skills_title}</h3>
          <div>{codingSkillsElements}</div>
        </div>{/* Render coding skills elements */}

        <div className='design-skills-card'>
          <h3>{aboutData?.[0]?.acf?.design_skills_title}</h3>
          <div>{designSkillsElements}</div>
        </div> {/* Render design skills elements */}

        <div className='marketing-skills-card'>
          <h3>{aboutData?.[0]?.acf?.marketing_skills_title}</h3>
          <div>{marketingSkillsElements}</div>
        </div>{/* Render marketing skills elements */}
      </div>
    </div>
  );
}

export default About;
