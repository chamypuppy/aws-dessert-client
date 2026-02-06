import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

/* import CSS */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';  // 아이콘 추가

function Mypage() {
  const [userInfo, setUserInfo] = useState({});
  /* const [userInfo, setUserInfo] = useState({
    users_kakao_id: "",
    users_id: "",
    users_name: "",
    nickname: "",
    format_signup_date: "",
    users_img: ""
  }); */
  const [userPkId, setUserPkId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [researchInfo, setResearchInfo] = useState({
    level: "", habit: [], find: []
  });
  const navigate = useNavigate();

  /* Button 라이브러리 */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*  */


  // 세션 검사 API
  useEffect(() => { 
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/session`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })
    .then((response) => response.json())
    .then((data) => {
      setUserPkId(data.USER_PK_ID);
      setAccessToken(data.ACCESS_TOKEN);
      
      console.log("data:", data);
      console.log("userPkId:", data.USER_PK_ID);
      console.log("ACCESS_TOKEN:", data.ACCESS_TOKEN);

      if (!data.USER_PK_ID) { // 서버기준 (state는 x) // !data.isLogin도 ok
        alert("로그인 후 방문해 주세요!");
        return navigate("/users/login");
      }
      
      // 사용자 정보 불러오기
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${data.USER_PK_ID}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data.userInfo: ", data.userInfo);
          console.log("유저인포:", userInfo);
          console.log("data.researchInfo: ", data.researchInfo);
          setUserInfo(data.userInfo);
          setResearchInfo({
            level: data.researchInfo.level,
            habit: data.researchInfo.habit,
            find: data.researchInfo.find
          });
        })
        .catch((error) => console.error('🟡 안 쪽 catch문 (Mypage): 사용자 정보 불러오기 실패:', error));
           
    })
    .catch((error) => console.error('🟡 첫 번째 catch문 (Mypage): 로그인 상태 확인 오류', error));
  }, [navigate]);

  /*
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/session`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true,
    })
    .then((response) => response.json())
    .then((data) => {
      setUserPkId(data.USER_PK_ID);
      setACCESS_TOKEN(data.ACCESS_TOKEN);
      
      console.log("data:", data);
      console.log("userPkId:", data.USER_PK_ID);
      console.log("ACCESS_TOKEN:", data.ACCESS_TOKEN);

      if (!data.USER_PK_ID) { // 서버기준 (state는 x) // !data.isLogin도 ok
        alert("로그인 후 방문해 주세요!");
        navigate("/users/login");
        
      } else { // 사용자 정보 불러오기
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${data.USER_PK_ID}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("data.userInfo: ", data.userInfo);
            console.log("data.researchInfo: ", data.researchInfo);
            setUserInfo(data.userInfo);
            setResearchInfo({
              level: data.researchInfo.level,
              habit: data.researchInfo.habit,
              find: data.researchInfo.find
            });
          })
          .catch((error) => console.error('🟡 Mypage.jsx 사용자 정보 불러오기 실패:', error));
      }      
    })
    .catch((error) => console.error('🟡 Mypage.jsx 로그인 상태 확인 오류:', error));
    */

    

/*   if (!userInfo) {
    return <div>로딩 중...</div>;
  } */
  
    

  

  async function submitKakaoLogout () {
    //const accessToken = localStorage.getItem('kakao_access_token', accessToken);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/kakao/logout`, {
          method: 'POST',  
          credentials: 'include',
      });

      const result = await response.json(); // {message: "🔵 쿠키 삭제 성공!"}
      console.log('로그아웃 응답:', result);

      if (response.ok) {
          alert('로그아웃 되었습니다!');
          window.location.href = '/';
      } else {
          alert('로그아웃에 실패하였습니다.' + result.message);
      }
    } catch (error) {
        console.error('react 로그아웃 요청 실패:', error);
    } 

  };

  async function submitPrimaryLogout () { 
    if (!userPkId) {
        alert("세션이 만료되었습니다");
        navigate("/");
        /* return; */
    } 
    
    try {
      const primaryLogoutResults = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`, null, { withCredentials: true });

      if(primaryLogoutResults.data.success) {
        alert(primaryLogoutResults.data.message);
        navigate("/");
      }

    } catch(err) {
      const errorMessage = err.response.data;
      //const statusCode = err.response.status;
      //setLoginErrorMessage(errorMessage);
      console.log("🟡 ", errorMessage);
    }
  };

  
  
  return (
    <div className='container_mypage_box'>
      <div className='mypage_box' id='mypage_margin_special'>
          <div className='mp_img_box'><img src={userInfo.users_img === null ? "http://localhost:3000/imgs/default_profile.png" : `/imgs${userInfo.users_img}`} className='mp_img'/></div>
          <div className='mp_box'>
            {/* <h2>내 정보</h2> */}
            <p className='mp_name'><span style={{fontWeight: "600"}}>{userInfo.nickname}</span> 님
            </p>
            <p className='mp_hello'>오늘도 달콤한 베이킹 시간되세요!</p>
          </div>
      </div>

      <div id='common_hr_box' className='detail_hr_box'></div>

      {/* <p>가입일: {userInfo.format_signup_date}</p> */}
      {/* <section>
          <h3></h3>
          <div>
            <div className='my_box'>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <span>관심 디저트</span>
          </div>
          <div>
            <div className='my_box'></div>
            <span>관심 디저트</span>
          </div>
        </section> */}

        {/* <hr/> */}
        {/* <div id='common_hr_box' className='detail_hr_box'></div> */}

        {/* <button onClick={() => submitKakaoLogout()} className='btn_logout'><div>로그아웃</div></button> */}

        <Button variant="success" onClick={handleShow}>
            로그아웃
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>로그아웃</Modal.Title>
          </Modal.Header>
          <Modal.Body>로그아웃 하시겠어요?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              아니오, 이따가 로그아웃 할게요
            </Button>
            <Button variant="primary" onClick={() => {
              handleClose();
              if(!accessToken) submitPrimaryLogout();
              else submitKakaoLogout();
            }}>
              네! 로그아웃 할게요
            </Button>
          </Modal.Footer>
        </Modal>
        
    </div>
  );
}

export default Mypage;
