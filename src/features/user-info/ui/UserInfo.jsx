import { Separator } from "../../../shared/ui/separator/Separator";

export const  UserInfo = () => {
  return(
    <>
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

        <Separator/>

        <Button variant="success" onClick={handleShow}>로그아웃</Button>

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
    </>
  );
};