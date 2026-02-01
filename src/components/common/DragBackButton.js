import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const DragBackButton = () => {
  const navigate = useNavigate();
  
  // 🔹 localStorage에서 위치 불러오기 (없으면 기본값)
  const bringPositionBack = () => {
    const savedPosition = JSON.parse(localStorage.getItem("buttonPosition"));
    return savedPosition || { x: 20, y: 20 };
  };

  const [position, setPosition] = useState(bringPositionBack);
  const [drag, setDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem("buttonPosition", JSON.stringify(position));
  }, [position]);

  const handleStart = (e) => {
    setDrag(true);
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    setOffset({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  const handleMove = (e) => {
    if (!drag) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    setPosition({
      x: clientX - offset.x,
      y: clientY - offset.y
    });
  };

  const handleEnd = () => setDrag(false);

  return (
    <button
      onClick={() => navigate(-1)}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        padding: "10px 20px",
        fontSize: "0.8rem",
        width:"65px",
        height: "65px",
        borderRadius: "50%",
        /* background: "#007bff", */
        background: "rgb(255, 129, 162)",
        color: "#fff",
        border: "none",
        /* borderRadius: "5px", */
        cursor: drag ? "grabbing" : "grab",
        zIndex: 1000,
        userSelect: "none",
        lineHeight: "15px",
      }}
    >
      {/* ◀ 🏃‍♀️🏃‍♂️ */}
      {/* 이전으로 */}
      {/* 돌아가기 */}
      뒤로가기
    </button>
  );
};

/* export default DraggBackbtn;
 */