/**************************************************************
 *  Copyright 2024, All rights reserved, For internal use only
 *
 *  FILE:        Roadmap.jsx
 *  PROJECT:     Parson's Problem
 *  MODULE:      Front_end
 *
 *  Description:
 *  A informative page containing all topics and contexts.
 *  Analyses student data inside student page.
 *
 *  Notes:
 *  
 *
 *  REVISION HISTORY
 *  Date:        By:             Description:
 *  2024-09-04   Yiwen Zhang     Initial creation and setup of
 *                               Roadmap.jsx
 *
 **************************************************************/

import React from "react";
import NavbarRoadMap from "../components/RoadMap_Navbar";
import SlidesRoadMap from "../components/RoadMap_Slides";
import TopicsGridRoadMap from "../components/RoadMap_TopicsGrid";
import ContextGridRoadMap from "../components/RoadMap_ContextGrid";

export default function RoadMap() {
  return (
    <>
      <NavbarRoadMap></NavbarRoadMap>
      <SlidesRoadMap></SlidesRoadMap>
      <div
          style={{
            marginTop:"20px",
            borderTop: "2px solid #f5f5f5 ",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <h2 style={{margin:"50px", textAlign:"center"}}>Topic Cards</h2>
      <TopicsGridRoadMap></TopicsGridRoadMap>
      <div
          style={{
            marginTop:"20px",
            borderTop: "2px solid #f5f5f5 ",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <h2 style={{margin:"50px", textAlign:"center"}}>Context Cards</h2>
        <ContextGridRoadMap></ContextGridRoadMap>
    </>
  );
}
