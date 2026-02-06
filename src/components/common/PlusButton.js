import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const PlusButton = () => {
  const navigate = useNavigate();
  const [userPkId, setUserPkId] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUserPkId(data.userPkId || null);
      })
      .catch(err => {
        console.error('세션 확인 실패:', err);
      });
  }, []);

  const handlePlusClick = () => setShow(!show);
  const handleClose = () => setShow(false);

  const goToInsertRecipe = () => {
    if (userPkId) navigate('/recipe/add');
    else {
      alert('로그인이 필요합니다!');
      navigate('/users/login');
    }
    handleClose();
  };

  const goToScrapRecipe = () => {
    if (userPkId) navigate('/scraps');
    else {
      alert('로그인이 필요합니다!');
      navigate('/users/login');
    }
    handleClose();
  };

  return (
    <>
      {/* + 버튼 */}
      <Button
        onClick={handlePlusClick}
        variant="success"
        style={{
          position: 'fixed',
          bottom: '30px',
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
        <FontAwesomeIcon icon={faPlus} />
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
            zIndex: 9999,
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
            animation: 'fadeInUp 0.3s ease forwards',
          }}
        >
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>무엇을 하시겠어요?</p>
          <div className="d-grid gap-2">
            <Button variant="danger" size="sm" onClick={goToInsertRecipe}>
              레시피 작성하기
            </Button>
            <Button variant="secondary" size="sm" onClick={goToScrapRecipe}>
              스크랩 레시피 확인
            </Button>
          </div>
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
