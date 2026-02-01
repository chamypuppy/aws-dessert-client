import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export const HomeButton = () => {
  const navigate = useNavigate();
  const [userPkId, setUserPkId] = useState(null);
  const [show, setShow] = useState(false);

  const clickHomeBtn = () => navigate('/');


  return (
    <>
      {/* + 버튼 */}
      <Button
        onClick={clickHomeBtn}
        variant="success"
        style={{
          position: 'fixed',
          bottom: '105px',
          right: 'calc(50% - 300px + 20px)', // max-width: 600px 안쪽 정렬
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          //backgroundColor: '#FF6B6B',
          color: 'white',
          border: 'none',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          fontSize: '24px',
          transition: 'all 0.3s ease',
        }}
      >
        <FontAwesomeIcon icon={faHouse} />
      </Button>

      {/* 모달 박스 (작은 메뉴창) */}
      {show && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: 'calc(50% - 300px + 20px)', // 버튼과 동일 위치
            width: '220px',
            padding: '15px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '15px',
            zIndex: 999,
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
            animation: 'fadeInUp 0.3s ease forwards',
          }}
        >

        </div>
      )}

      {/* 애니메이션 정의 */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};
