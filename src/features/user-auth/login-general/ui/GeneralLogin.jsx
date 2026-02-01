import { useLogin } from "../model/useLogin";
import Button from 'react-bootstrap/Button';

export const GeneralLogin = () => {
  const { loginData, onChangeInput, onSubmitLogin } = useLogin();

  return(
    <>
      <hr className="mx-8 mt-12 mb-20 border-gray-300" />
      <form className='max-w-xl mx-auto px-8'>
        <h2 className="font-bold mb-[30px] text-[1.2rem]">일반 로그인</h2>
        <div className="input-group pb-1.5">
          <input type="text" className="form-control" placeholder="아이디" aria-label="Username" aria-describedby="basic-addon1" id="id" name="login_id" value={loginData.login_id} required onChange={onChangeInput}/>
        </div>
        <div className="input-group pb-4">
          <input type="password" className="form-control" placeholder="비밀번호" aria-label="Username" aria-describedby="basic-addon1" id="pwd" name="login_pwd" value={loginData.login_pwd} required onChange={onChangeInput}/>
        </div>
        <div className="d-grid gap-2 pb-3">
          <Button variant="success" size="lg" onClick={(e) => onSubmitLogin(e)}>
            로그인
          </Button>
        </div>
      </form>
    </>
    
  );
};