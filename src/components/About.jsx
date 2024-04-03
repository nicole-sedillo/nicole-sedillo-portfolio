import React, { useEffect, useState } from 'react';
import { getPages, fetchImageUrlById } from '../utilities/api';

function About() {
  const [aboutData, setAboutData] = useState([]);
  const [skillsData, setSkillsData] = useState({});
  const [interestsData, setInterestsData] = useState({}); 

  useEffect(() => {
    getPages()
      .then(data => {
        setAboutData(data);
      })
      .catch(error => {
        console.error('Error fetching about data:', error);
      });
  }, []);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const codingSkills = aboutData?.[0]?.acf?.coding_skills;
        const designSkills = aboutData?.[0]?.acf?.design_skills;
        const marketingSkills = aboutData?.[0]?.acf?.marketing_skills;

        const codingPromises = codingSkills ? codingSkills.map(skill => fetchImageUrlById(skill.coding_skill_image)) : [];
        const designPromises = designSkills ? designSkills.map(skill => fetchImageUrlById(skill.design_skills_image)) : [];
        const marketingPromises = marketingSkills ? marketingSkills.map(skill => fetchImageUrlById(skill.marketing_skills_image)) : [];

        const codingImages = await Promise.all(codingPromises);
        const designImages = await Promise.all(designPromises);
        const marketingImages = await Promise.all(marketingPromises);

        const updatedSkillsData = {
          codingSkills: codingSkills ? codingSkills.map((skill, index) => ({
            label: skill.coding_skill_label,
            imageUrl: codingImages[index],
          })) : [],
          designSkills: designSkills ? designSkills.map((skill, index) => ({
            label: skill.design_skills_label,
            imageUrl: designImages[index],
          })) : [],
          marketingSkills: marketingSkills ? marketingSkills.map((skill, index) => ({
            label: skill.marketing_skills_label,
            imageUrl: marketingImages[index],
          })) : [],
        };

        setSkillsData(updatedSkillsData);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    };

    fetchSkillsData();
  }, [aboutData]);

  useEffect(() => {
    const fetchInterestsData = async () => {
      try {
        const interests = aboutData?.[0]?.acf?.interests_images;
        if (!interests) return;

        const imagesPromises = interests.map(interest => fetchImageUrlById(interest.interests_image));
        const images = await Promise.all(imagesPromises);

        setInterestsData({
          title: aboutData?.[0]?.acf?.interests_title,
          text: aboutData?.[0]?.acf?.interests_text,
          images: images.filter(image => image) 
        });
      } catch (error) {
        console.error('Error fetching interests data:', error);
      }
    };

    fetchInterestsData();
  }, [aboutData]);

  return (
    <div className='main'>
      <div className='about-intro-section'>
        <h1>About</h1>
        <p>{aboutData?.[0]?.acf?.about_overview}</p>
      </div>

      <div className='skills-section'>
        <header>
          <h2>Skills</h2>
        </header>
        <div className='skills-cards-section'>
          <div className='skills-card'>
            <h3>{aboutData?.[0]?.acf?.coding_skills_title}</h3>
            <div className='skills-elements'>
              {skillsData.codingSkills && skillsData.codingSkills.map((skill, index) => (
                <div key={index} className="skill-element">
                  <p>{skill.label}</p>
                  {skill.imageUrl && <img src={skill.imageUrl} alt={skill.label} />}
                </div>
              ))}
            </div>
          </div>

          <div className='skills-card'>
            <h3>{aboutData?.[0]?.acf?.design_skills_title}</h3>
            <div className='skills-elements'>
              {skillsData.designSkills && skillsData.designSkills.map((skill, index) => (
                <div key={index} className="skill-element">
                  <p>{skill.label}</p>
                  {skill.imageUrl && <img src={skill.imageUrl} alt={skill.label} />}
                </div>
              ))}
            </div>
          </div>

          <div className='skills-card'>
            <h3>{aboutData?.[0]?.acf?.marketing_skills_title}</h3>
            <div className='skills-elements'>
              {skillsData.marketingSkills && skillsData.marketingSkills.map((skill, index) => (
                <div key={index} className="skill-element">
                  <p>{skill.label}</p>
                  {skill.imageUrl && <img src={skill.imageUrl} alt={skill.label} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
      <div className='interests-section'>
        <header>
          <h2>Interests</h2>
        </header>
        <div className='interests-text'>
          <p dangerouslySetInnerHTML={{ __html: interestsData.text }}></p>
        </div>
        <div className='interests-images'>
          {interestsData.images && interestsData.images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Interest ${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
