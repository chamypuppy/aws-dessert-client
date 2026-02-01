import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { DayPicker } from "react-day-picker";
//import 'react-day-picker/dist/style.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Signup () {
  const today = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    form_id: "", form_pwd1: "", form_pwd2: "", form_name: "",
    form_tel: "", form_birthday: today, form_email: ""
  });
  
  const [date, setDate] = useState(new Date());
  const [emailIValue, setInputEmailValue] = useState("");
  const [savedEmailList, setSavedEmailList] = useState([]);
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwdCompare, setPwdCompare] = useState(false);
  const [pwdCheckText, setPwdCheckText] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const onClickFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const signupResult = await axios.post(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/signup/register`, formData, { withCredentials: true });

      console.log("결과값:",signupResult);

      if(signupResult.data.success) {    // 회원가입 성공
        alert(signupResult.data.message);
        navigate("/users/research");
      } else if (!signupResult.data.ok){ // 비밀번호 이슈
        alert(signupResult.data.alert);
      } else alert("회원가입에 실패하였습니다😔 \n다시 시도 해 주세요."); // 나머지의 가입시도 문제 이슈
    }
    catch (err) {
      console.error("🟡 Signup.jsx 오류: 다시시도 해 주세요.");

      if(err.response) {
        const errorMessage = err.response.data;
        //const statusCode = err.response.status;
        setLoginErrorMessage(errorMessage);
        console.log(loginErrorMessage);
        return;
      };
      // console.error(err.response?.data);
    }
    
  };

  useEffect(() => {
    if(loginErrorMessage) {
      console.log(loginErrorMessage);
    }
  }, [loginErrorMessage]);

  const onChangeInput = (e) => {
    const { name:formName, value:formValue } = e.target; // 구조분해할당
    //console.log(e.target.name);
    
    setFormData(liveFormData => ({
        ...liveFormData,
        [formName] : formValue
    }))
  };
    
  console.log(formData);

  function onChangeDate (date) {
    setFormData(liveFormData => ({
        ...liveFormData,
        ["form_birthday"] : date
    }))
  };

  function typingBirthday(e) {
    const dateStr = e.target.value;
    // console.log(dateStr);
    const year = dateStr.split("-");
    console.log(year);
    if (year[0].length == 4 && Number(year[0]) < 1900) {
      alert("연도는 1900년 이상부터 선택 가능합니다.");
      return setDate("");
    }
    else setDate(dateStr);
  }

    /* 생년월일 input custom */
  const CustomDateInput = React.forwardRef(({value, onClick, onChange}, ref) => (
    <>
      <label for="birthday" class="form-label">* 생년월일</label>
      <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">birthday</span>
          <input type="text" class="form-control" placeholder="생년월일" aria-label="생년월일" aria-describedby="basic-addon1"
          id="birthday" name="form_birthday"
          onClick={onClick} onChange={onChange} value={value} ref={ref}/>
      </div>
    </>
  ));

  function onChangePwd(e) {
    const { name:inputName, value:inputValue } = e.target;
    
    if (inputName === "form_pwd1") setPwd1(inputValue);
    else if (inputName === "form_pwd2") setPwd2(inputValue);

    // 최신값을 즉시 반영(비동기로 인한 오류 처리)
    const temporSavedPwd1 = (inputName === "form_pwd1") ? inputValue : pwd1;
    const temporSavedPwd2 = (inputName === "form_pwd2") ? inputValue : pwd2;

     if(temporSavedPwd1 && temporSavedPwd2) {
      const isMatched = (temporSavedPwd1 === temporSavedPwd2); // 같으면 t, 다르면 f
      setPwdCompare(isMatched); // t
      setPwdCheckText(isMatched ? "일치해요😄" : "일치하지 않아요😔");
     } else {
      setPwdCompare(false);     // f
      setPwdCheckText("");
    }
  }


  const recommDomainList = [
    "@gmail.com", "@naver.com", "@daum.net",
    "@hanmail.net", "@yahoo.com", "@outlook.com",
    "@nate.com", "@kakao.com"
  ];

  /* function savedInputEmail(emailId) {
    setInputEmailValue(emailId);
    const userEmail = recommDomainList.map((domainAddress) => 
      emailId.includes("@")
      ? emailId.split("@")[0] + domainAddress
      : emailId + domainAddress
    );
    setSavedEmailList(userEmail);
  }; */

  function savedInputEmail(emailId) {
    setInputEmailValue(emailId);
    const userEmail = recommDomainList.map((domainAddress) => {
      const pureId = emailId.split("@")[0];
      return (emailId.includes("@")) ? pureId + domainAddress : emailId + domainAddress;
    });
    setSavedEmailList(userEmail);
  };

  return(
    <form onSubmit={onClickFormSubmit} id="form_signup">
      <h2 style={{fontWeight: "500"}}>기본정보</h2>
      <hr style={{margin: "10px 30px", color:"lightgray"}}/>

      <label for="id" class="form-label">* 아이디</label> &nbsp;&nbsp;&nbsp;
      <span style={{ "color": "red" }}>{loginErrorMessage}</span>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">ID</span>
        <input type="text" class="form-control" placeholder="아이디" aria-label="아이디" aria-describedby="basic-addon1" 
        id="id" name="form_id" required
        onChange={onChangeInput}/>
      </div>

      <label label for="pwd" class="form-label">* 비밀번호</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">PWD</span>
        <input type="password" class="form-control" placeholder="비밀번호" aria-label="비밀번호" aria-describedby="basic-addon1" 
        id="pwd" name="form_pwd1" required
        onChange={(e)=>{
          onChangeInput(e);
          onChangePwd(e);
        }}/>
      </div>

      <label for="pwdcheck" class="form-label">* 비밀번호 확인</label> &nbsp;&nbsp;&nbsp;
      <span style={{ "color": pwdCompare ? "blue" : "red" }}>{pwdCheckText}</span>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">PWD</span>
        <input type="password" class="form-control" placeholder="비밀번호 확인" aria-label="비밀번호 확인" aria-describedby="basic-addon1" 
        id="pwdcheck" name="form_pwd2" required
        onChange={(e)=>{
          onChangeInput(e);
          onChangePwd(e);
        }}
          />
      </div>
        
      <label for="name" class="form-label">* 이름</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="text" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" 
        id="name" name="form_name" required
        onChange={onChangeInput}/>
      </div>

      <label for="tel" class="form-label">* 휴대전화</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Tel</span>
        <input type="text" class="form-control" placeholder="전화번호" aria-label="휴대전화" aria-describedby="basic-addon1" 
        id="tel" name="form_tel" required
        onChange={onChangeInput}/>
      </div>

      

      <DatePicker 
        selected={formData.form_birthday} 
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        yearDropdownItemNumber={105}
        showMonthDropdown
        scrollableYearDropdown
        locale={ko}
        onChange={(datePickerDateValue) => {
          const prettyDate = datePickerDateValue.toISOString().slice(0, 10);
          onChangeDate(prettyDate);
        }}

        customInput={<CustomDateInput/>}
      />
      <br/>

      {/* <DayPicker animate mode="single" selected={date} onSelect={setDate}/> */}

      <label for="email" class="form-label">* 이메일</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Name</span>
        <input type="email" class="form-control" placeholder="ooo@gmail.com" aria-label="이메일" aria-describedby="basic-addon1"
        list="emails"
        id="email" name="form_email" required
        // onChange={(e) => savedInputEmail(e.target.value)}
        onChange={(e) => {
          savedInputEmail(e.target.value);
          onChangeInput(e);
        }} />
        <datalist id="emails">
          {savedEmailList != null 
          ? savedEmailList.map((email, index) => <option value={email} key={index} />)
          : null }
        </datalist>
      </div>

      

      {/* <h3 style={{fontWeight: "500", marginTop: "30px"}}>추가정보</h3>
      <hr style={{margin: "10px 30px", color:"lightgray"}}/>

      <label for="users_intro" class="form-label">나의 소개</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">intro</span>
        <input type="email" id="users_intro" class="form-control" placeholder="한줄 소개" aria-label="한줄 소개" aria-describedby="basic-addon1" required/>
      </div> */}

      


      {/* <div class="mb-3">
        <label for="formFile" class="form-label">프로필 사진</label>
        <input class="form-control" type="file" id="formFile" />
      </div> */}
      
      {/* <button type="submit" customInput={<CustomSubmitButton/>}>가입하기</button>   */}
      <div className="d-grid gap-2">
      <Button variant="secondary" size="lg" type="submit" style={{backgroundColor: "var(--color-strawberry3)", border: "var(--color-drak--strawberry)"}}>
        가입하기
      </Button>
      </div>
    </form>
  )
}

export default Signup;