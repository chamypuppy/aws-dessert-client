import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import { PageStep1 } from "./function/PageStep1";
import { ResearchProvider } from "../../app/providers/context/ResearchContext";
import { LaterResearchBtn } from "../../components/common/LaterResearchBtn";
import { SubmitResearchBtn } from "../../components/common/SubmitResearchBtn";


function Research() {
  const [selectedData, setSelectedData] = useState({
    level: "", habit: "", type: ""
  });
  const [researchData, setResearchData] = useState({
    level: "", habit: "", type: ""
  });

  const [pageStep, setPageStep] = useState(1);

  return(
    <ResearchProvider>
      <PageStep1/>
      <LaterResearchBtn/>
      <SubmitResearchBtn/>
    </ResearchProvider>
    
  );
}

export default Research;