import { createContext, useContext, useState } from "react";

const ResearchContext  = createContext();

export const ResearchProvider = ({ children }) => {
  const [researchData, setResearchData] = useState({
        level: "", habit: [], find: []
    });

  return(
    <ResearchContext.Provider value={{ researchData, setResearchData }}>
      {children}
    </ResearchContext.Provider>
  );
}

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('🟡 useResearch 오류: useResearch는 ResearchProvider 내에서만 사용이 가능합니다');
  }
  return context;
};