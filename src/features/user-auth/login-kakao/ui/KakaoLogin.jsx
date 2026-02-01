import { useKakao } from "../model/useKakao";

export const KakaoLogin = () => {
  const { handleKakao } = useKakao();

  return(
  <div className='text-center h-72 flex flex-col justify-evenly'>
    <h2 className="font-bold">로그인</h2>
    <div className='l_box'>
      <h3 className="font-bold">1초만에 회원가입하고 로그인하세요!</h3>
      <h4>다양한 맞춤형 레시피를 알려드릴게요💘</h4>
    </div>
    <button onClick={() => handleKakao()} className="flex justify-center border-0 bg-transparent">
      <img src='/imgs/kakao_login_medium_wide.webp'
      className='btn_kakao_login'
      alt="카카오 로그인 아이콘" />
    </button>
  </div>
  );
};