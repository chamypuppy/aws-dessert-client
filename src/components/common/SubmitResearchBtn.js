import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { useResearch } from '../../app/providers/context/ResearchContext';
import axios from 'axios';

export const SubmitResearchBtn = () => {
  /* const [researchData, setResearchData] = useState({
        level: "", habit: [], find: []
  }); */
  const { researchData } = useResearch();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  async function onSubmitBtn(e) { 
    e.preventDefault();
    
    console.log(e);

    if(!researchData.level) {
      alert("베이킹 숙련도(level) 값이 누락되었습니다.");
      return;
    }
    if(researchData.habit.length === 0) {
      alert("식문화(habit) 값이 누락되었습니다.");
      return;
    }
    if(researchData.find.length === 0) {
      alert("관심 레시피(find) 값이 누락되었습니다.");
      return;
    }

    try {
      // await 해주기
      const researchResult = await axios.post(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/research/res/ok`, researchData, { withCredentials: true });

      if(researchResult.data.success){
        alert(researchResult.data.message);
        navigate("/");
      }
    } catch (err) {

    }
  }
  /* function clickLaterBtn() {
      setResearchData((prevData) => ({
        ...prevData,
        level: "없음",
        habit: ["없음"],
        find: ["없음"]
      }));

      navigate("/");
  } */
  
  return(
    <>
      <Button variant="primary" className='text-white text-xl right-6 md:right-[calc(50%-280px)]'
      style={{
          position: 'fixed',
          bottom: '50px',
          //right: 'calc(50% - 300px + 20px)', // max-width: 600px 안쪽 정렬
          color: 'white',
          border: 'none',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
        }}
        onClick={handleShow}>
          제출하기
        </Button>

        <Modal show={show} onHide={handleClose} className='pt-72'>
          <Modal.Header closeButton>
            <Modal.Title>맞춤 서비스 등록 안내</Modal.Title>
          </Modal.Header>
          <Modal.Body>제출하시겠어요? <br/> 달라진 취향은 마이페이지에서 언제든지 변경하실 수 있어요!😄</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              아니오, 조금 더 고민해 볼게요
            </Button>
            <Button variant="primary" onClick={(e) => {
              handleClose();
              onSubmitBtn(e);
            }}>
              네! 제출 할게요
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};