import React from "react";
import Container from "react-bootstrap/Container";
import MyPageHeader from "./MyPageHeader";
import Logout from "./Logout";

export function MyPageView({ userInfo, onBack, logout }) {
  return (
    <div className="md:px-8">
      <Container fluid className="px-3 lg:px-4">
        <div className="container_mypage_box mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
          <MyPageHeader userInfo={userInfo} onBack={onBack} />

          <div id="common_hr_box" className="detail_hr_box"></div>

          <Logout {...logout} />
        </div>
      </Container>
    </div>
  );
}
