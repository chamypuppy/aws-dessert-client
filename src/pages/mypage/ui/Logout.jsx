import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Logout({ show, handleClose, handleShow, handleConfirm }) {
  return (
    <>
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
            아니요, 이따가 로그아웃 할게요
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            네! 로그아웃 할게요
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
