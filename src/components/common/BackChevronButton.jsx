import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export function BackChevronButton({ onClick, position = "absolute", style = {} }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="뒤로가기"
      style={{
        position,
        top: "24px",
        left: "20px",
        zIndex: position === "fixed" ? 1000 : undefined,
        border: "none",
        background: "rgba(0, 0, 0, 0.35)",
        color: "#ffffff",
        width: "36px",
        height: "36px",
        borderRadius: "999px",
        fontSize: "16px",
        lineHeight: 1,
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
}
