import { useAuthor } from "../../../../entities/recipe/model/useAuthor";
import { Separator } from "../../../../shared/ui/separator/Separator";

export const AuthorInfo = ({ recipeInfo }) => {

  const { userName, loading, error } = useAuthor(recipeInfo.author_id);

  console.log("🟡🟡🟡:",userName);
  return(
    <>
      <div className='author_info m-3' id='detail_margin_special'>
        <div><img src=""/></div>
        <div className='au_info'>
          <div>
            <span>{userName}({recipeInfo.author_id})</span> {/* author_id를 띄울 필요가 있을까... user정보 API를 usersName 뿐만아니라 user 정보 다 가져오는 것도 나쁘지 않을 것 같다.*/}  
          </div>
          <div>{recipeInfo.users_intro ? recipeInfo.users_intro : '소개글이 없습니다.'}</div>
        </div>
      </div>
      <Separator/>
    </>
  );

};