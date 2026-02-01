import { KakaoLogin } from "../../../features/user-auth/login-kakao/ui/KakaoLogin";
import { GeneralLogin } from "../../../features/user-auth/login-general/ui/GeneralLogin";
import { Signup } from "../../../features/user-auth/signup/ui/Signup";

export const Login = () => {

  return(
    <div className='text-center leading-6'>
      <KakaoLogin/>
      <GeneralLogin/>
      <Signup/>
    </div>
  );
};