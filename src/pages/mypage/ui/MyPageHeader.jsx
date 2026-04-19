import React from "react";
import { BackChevronButton } from "../../../components/common/BackChevronButton";

export default function MyPageHeader({ userInfo, onBack }) {
  const profileSrc =
    userInfo?.users_img === null
      ? "http://localhost:3000/imgs/default_profile.png"
      : `/imgs${userInfo?.users_img}`;

  return (
    <div
      className="mypage_box"
      id="mypage_margin_special"
      style={{ position: "relative" }}
    >
      <BackChevronButton
        onClick={onBack}
        position="absolute"
        style={{ top: "36px" }}
      />
      <div className="mp_img_box">
        <img src={profileSrc} className="mp_img" alt="profile" />
      </div>
      <div className="mp_box">
        <p className="mp_name">
          <span style={{ fontWeight: "600" }}>{userInfo?.nickname}</span> 님
        </p>
        <p className="mp_hello">오늘도 달콤한 베이킹 시간되세요!</p>
      </div>
    </div>
  );
}
