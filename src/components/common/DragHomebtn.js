import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export const DragHomebtn = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const bringPositionHome = () => {
    const savedPosition = JSON.parse(localStorage.getItem("homeButtonPosition"));
    return savedPosition || { x: 20, y: 70 };
  };

  const [position, setPosition] = useState(bringPositionHome);
  const [drag, setDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem("homeButtonPosition", JSON.stringify(position));
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
    if (!drag || !containerRef.current) return;
    
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    // 컨테이너 크기 가져오기
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // 버튼이 컨테이너 밖으로 나가지 않도록 제한
    const newX = Math.max(0, Math.min(clientX - offset.x, containerRect.width - 60));
    const newY = Math.max(0, Math.min(clientY - offset.y, containerRect.height - 40));

    setPosition({ x: newX, y: newY });
  };

  return (
    <div ref={containerRef} style={{ 
      minWidth: "600px", 
      height: "100vh", 
      position: "relative", 
      background: "#f5f5f5" 
    }}>
      <button
        onClick={() => navigate("/")}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={() => setDrag(false)}
        onMouseLeave={() => setDrag(false)}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={() => setDrag(false)}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: "#28a745",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: drag ? "grabbing" : "grab",
          zIndex: 1000,
        }}
      >
        홈으로 가기
      </button>
    </div>
  );
};
