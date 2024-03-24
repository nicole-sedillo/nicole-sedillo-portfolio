import React, { useEffect, useState } from "react";
import { getPages } from "../utilities/api";

function Home() {
    const [homeData, setHomeData] = useState([]);

    console.log(homeData);
    
    useEffect(() => {
        getPages()
          .then(data => {
            setHomeData(data);
          })
          .catch(error => {
            alert(error);
          });
      }, []);

    // Add JSX to render homeData as needed

    return (
        <div>
            <h1>{homeData?.[1]?.title?.rendered}</h1>
        </div>
    );
}

export default Home;
