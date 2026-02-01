import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { useResearch } from '../../app/providers/context/ResearchContext';
import axios from 'axios';

export const LaterResearchBtn = () => {
  /* const [researchData, setResearchData] = useState({
        level: "", habit: [], find: []
  }); */

  const { researchData, setResearchData } = useResearch();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  async function submitLaterBtn() {
      setResearchData((prevData) => ({
        ...prevData,
        level: null,
        habit: null,
        find: null
        /* habit: [],
        find: [] */
        /* level: "없음",
        habit: ["없음"],
        find: ["없음"] */
      }));

      try {
        await axios.post(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users/research/res/no`, researchData, { withCredentials: true });
        navigate("/");
      } catch(err) {
        console.log("신탁스 에러:", researchData);
      }

      
  }
  
  return(
    <>
      <Button variant="secondary" className='text-white text-xl right-6 md:right-[calc(50%-280px)]'
      style={{
          position: 'fixed',
          bottom: '100px',
          //right: 'calc(50% - 300px + 20px)', // max-width: 600px 안쪽 정렬
          color: 'white',
          border: 'none',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
        }}
        onClick={handleShow}>
          다음에 응답할게요😄
        </Button>

        <Modal show={show} onHide={handleClose} className='pt-72'>
          <Modal.Header closeButton>
            <Modal.Title>맞춤 서비스 등록 안내</Modal.Title>
          </Modal.Header>
          <Modal.Body>다음에 작성하시겠어요? <br/> 마이페이지에서 언제든지 등록하실 수 있어요!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              아니오
            </Button>
            <Button variant="primary" onClick={() => {
              handleClose();
              submitLaterBtn();
            }}>
              네, 그렇게 할게요
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};