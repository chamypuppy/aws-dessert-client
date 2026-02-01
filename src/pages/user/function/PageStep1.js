import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useResearch } from "../../../app/providers/context/ResearchContext";

export const PageStep1 = () => {
  /* 
  // 중요중요중요
  const [researchData, setResearchData] = useState({
      level: "", habit: [], find: []
  }); */
  const { researchData, setResearchData } = useResearch();

  
  const [selectedLevel, setSelectedLevel] = useState("");
  const [levelData, setLevelData] = useState([
    {
      key: "level",
      levelValue: "0",
      text: "간단한 노오븐 디저트 만들어 본 경험이 있어요~",
    },
    {
      key: "level",
      levelValue: "1",
      text: "종종 홈베이킹을 즐겨해서 핸드믹서 같은 기본적인 장비는 가지고 있어요~",
    },
    {
      key: "level",
      levelValue: "2",
      text: <>기본적인 장비 + 전문적인 재료를 가지고 있어요! <br/> 반죽의 준비 과정이 익숙해요 :D</>,
    },
    {
      key: "level",
      levelValue: "3",
      text: "반죽의 결, 숙성시간과 버터의 양 등 세밀한 밑작업까지 신경쓰고 있어요!",
    },
    {
      key: "level",
      levelValue: "4",
      text: "제누와즈 굽기, 생크림 아이싱 작업 등 전문적인 장비 또는 노하우를 알고 있어요!",
    }
  ]);
  //const [selectedHabit, setSelectedHabit] = useState([]);
    const [habitData, setHabitData] = useState([
    {
      key: "habit",
      habitValue: "저당"
    }, 
    {
      key: "habit",
      habitValue: "통밀"
    }, 
    {
      key: "habit",
      habitValue: "비건"
    }, 
    {
      key: "habit",
      habitValue: "없음"
    }
  ]);
    const [findData, setFindData] = useState([
    {
      key: "find",
      findValue: "제과"
    }, 
    {
      key: "find",
      findValue: "제빵"
    }, 
    {
      key: "find",
      findValue: "음료"
    }, 
    {
      key: "find",
      findValue: "없음"
    }
  ]);

  const onClickButton1 = (e) => {
    //console.log(e.currentTarget.dataset.key, e.currentTarget.dataset.value);
    const level_key = e.currentTarget.dataset.key;
    const level_value = e.currentTarget.dataset.value;

    console.log(level_key, level_value);
    setResearchData((prevData) => ({
      ...prevData,
      [level_key] : level_value
    }));
  };
  console.log(researchData);

  const onClickButton2 = (e) => {
    const habit_key = e.currentTarget.dataset.key;
    const habit_value = e.currentTarget.dataset.value;

    console.log(habit_key, habit_value);

    setResearchData((prevData) => ({
      ...prevData,
      ["habit"] : 
      habit_value === "없음" 
        ? prevData["habit"].includes("없음") 
          ? [] 
          : ["없음"] 
        : prevData["habit"].includes("없음") 
          ? [habit_value] 
          : prevData["habit"].includes(habit_value)
            ? prevData["habit"].filter(originItem => originItem !== habit_value)
            : [...prevData["habit"], habit_value]
    }));
  };
  console.log(researchData);

  const onClickButton3 = (e) => {
    const find_key = e.currentTarget.dataset.key;
    const find_value = e.currentTarget.dataset.value;

    console.log(find_key, find_value);

    setResearchData((prevData) => ({
      ...prevData,
      ["find"] : 
      find_value === "없음" 
        ? prevData["find"].includes("없음")     // 없음일 때
          ? [] 
          : ["없음"]     
        : prevData["find"].includes("없음")     // 없음이 아닐 때
          ? [find_value] 
          : prevData["find"].includes(find_value) // 클릭된 값이 배열에 이미 있냐?
            ? prevData["find"].filter(originItem => originItem !== find_value) // 토글 필터링
            : [...prevData["find"], find_value]
    }));
  };
  
  console.log(researchData);



  

  return(
    <div className="p-8">
      <h1 className="font-semibold text-xl">만나서 반갑습니다😄 <br/>
      나만의 맞춤 서비스를 위해 몇 가지 응답을 받고 있어요<br/>:)</h1>
      <div className="font-medium text-gray-300 text-sm pt-6">시간 내어 응답해 주시면 더 좋은 추천 서비스로 찾아뵐게요😊</div><br/><br/>

      <span className="baking_exp font-semibold text-gray-300">홈베이킹 숙련도</span>
      <ButtonGroup className="d-grid gap-2 pt-2">
        {levelData.map((level, index) => {
          return(
            <Button
            variant={selectedLevel === level.levelValue ? "success" : "light"} size="lg" data-key={level.key} data-value={index} 
            onClick={(e) => {onClickButton1(e); setSelectedLevel(level.levelValue)}}>
              <div className={`font-semibold text-gray-800 ${selectedLevel === level.levelValue ? "text-white" : ""}`}>{index}단계</div>
              <div className={`
                ${index === 2 ? "text-xs text-gray-500" : "text-sm text-gray-500"}
                ${selectedLevel === level.levelValue ? "text-white-50" : ""}
                `}>{level.text}</div>
            </Button> 
          );
          })
        }
      </ButtonGroup>

      <div className="my-14">
        <span className="font-semibold text-gray-300">식문화 &nbsp; (중복 선택 가능)</span>
        <div className="d-grid gap-2 grid-cols-2 pt-2">
          {habitData.map((habit, index)=> {
            return (
              <Button variant={researchData.habit.includes(habit.habitValue) ? "success" : "light"} size="lg" className="w-full" data-key={habit.key} data-value={habit.habitValue} onClick={(e) => {onClickButton2(e)}}>
                <div className={`font-semibold text-gray-800 ${researchData.habit.includes(habit.habitValue) ? "text-white" : ""}`}>{habit.habitValue}</div>
              </Button>
            );
            })
          }
        </div>
      </div>

      <span className="baking_exp font-semibold text-gray-300">관심 레시피 &nbsp; (중복 선택 가능)</span>
      <div className="d-grid gap-2 pt-2">
        {
          findData.map((find, index) => {          
            return (
            <Button variant={researchData.find.includes(find.findValue) ? "success" :"light"} size="lg" data-key={find.key} data-value={find.findValue}
            onClick={(e) => {onClickButton3(e)}}>
              <div className={`font-semibold text-gray-800 ${researchData.find.includes(find.findValue) ? "text-white" : ""}`}>{find.findValue === "없음" ? "둘러보고 결정할래요~" : find.findValue}</div>
            </Button>
          );
          })
        }

        {/* <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">제빵</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">음료</div>
        </Button>
        <Button variant="light" size="lg">
          <div className="font-semibold text-gray-800">둘러보고 결정할래요!</div>
        </Button> */}

      </div>

    {/* <label for="baking_exp" class="form-label">* 베이킹 경험여부</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="radio" id="baking_exp" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}


      {/* <label for="baking_service" class="form-label">* 베이킹 경험여부</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="selectBox" id="baking_service" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}


      {/* <label for="baking_service" class="form-label">* 베이킹 레벨</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="radioBox" id="baking_service" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}
      
      {/* <label for="users_intro" class="form-label">원하는 레시피</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="checkbox" id="users_intro" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" required/>
      </div> */}
      </div>
  )
}