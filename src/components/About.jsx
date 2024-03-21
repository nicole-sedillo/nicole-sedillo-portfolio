import React, { useEffect, useState } from 'react'
import { getPages } from '../utilities/api'


function About() {

  const [aboutData, setAboutData] = useState([])

    useEffect( () => {
    getPages()
    .then((data) => {
        // console.log("Data", data);
        setAboutData(data)
    })
    .catch((error) => {
        alert(error);
      });
    }, [])

    //Optional chaining ?.
    //or
    //Logical operator &&
    console.log(aboutData?.[0]?.acf?.about_overview);
    // console.log(aboutData && aboutData[0] && aboutData[0].acf && aboutData[0].acf.about_overview);




  return (
    <div>{aboutData?.[0]?.acf?.about_overview}</div>
  )
}

export default About