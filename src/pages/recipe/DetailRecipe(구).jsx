import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie } from '@fortawesome/free-solid-svg-icons';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { DragBackButton } from '../../components/common/DragBackButton';

function DetailRecipe({ recipes, recipeMethods }) {
  const { recipe_pk_id } = useParams();

  /* 유저 소개글만 따로 가져오기 */
  const [usersInfo, setUsersInfo] = useState({users_name: '', users_intro: ''});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CLOUDTYPE_BACKEND_URL}/api/users_info/${recipe_pk_id}`);
        setUsersInfo({
          users_name: response.data.users_name,
          users_intro: response.data.users_intro
        });
        
      } catch (error) {
        setError('유저 소개글을 가져오는 중 오류가 발생했습니다.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersInfo();
  }, [recipe_pk_id]);

  /* 각 recipe와 recipe_method */
  const recipe = recipes.find((r) => r.recipe_pk_id === parseInt(recipe_pk_id, 10));
  const method = recipeMethods
    .filter((m) => m.recipe_pk_id === parseInt(recipe_pk_id, 10))
    .sort((a, b) => a.method_number - b.method_number);

  if (!recipe) {
    return <p>레시피를 찾을 수 없습니다.</p>;
  }

  

  console.log(recipe.recipe_servings);
  console.log(recipe);

  return (
    <div key={recipe.recipe_pk_id}>
      <DragBackButton/>
      {/* <h1>상세 레시피</h1> */}
      <ul>          
          <>
            <div>
              <img src={`/imgs/${recipe.recipe_image}`} className='recipe_img'/>
              <div id='detail_margin_special' className='recipe_title detail_page_box'>
                <h1 className='recipe_name' id='common_recipe_name'>{recipe.recipe_name}</h1>
                <span>{recipe.recipe_intro}</span>
              </div>
            </div>
            
            <div /* id='common_container' */>
              <div className='recipe_info' id='detail_margin_special'>
                <div className='r_info'>
                  <div><FontAwesomeIcon icon={faCookie} /></div>
                  <div>{recipe.recipe_servings}개 분량</div>
                </div>
                <div className='r_info'>
                  <div><FontAwesomeIcon icon={faChessRook} /></div>
                  <div>{
                        recipe.baking_level === 0 
                      ? '입문용'
                      : recipe.baking_level === 1
                      ? '초급'
                      : recipe.baking_level === 2
                      ? '초중급'
                      : recipe.baking_level === 3
                      ? '중급'
                      : recipe.baking_level === 4
                      ? '중상급'
                      : '마스터'
                    }</div>
                </div>
                <div className='r_info'>
                    <div><FontAwesomeIcon icon={faHeart} /></div>
                    <span>저장</span>
                    <div>{
                        recipe.scrap_count === 0
                        ? ''
                        : recipe.scrap_count
                  }</div>
                </div>
              </div>

              <div id='common_hr_box' className='detail_hr_box'></div>

              <div className='author_info' id='detail_margin_special'>
                <div><img src=""/></div>
                <div className='au_info'>
                  <div>
                    <span>{usersInfo.users_name}({recipe.author_id})</span>  
                  </div>
                  <div>{usersInfo.users_intro ? usersInfo.users_intro : '소개글이 없습니다.'}</div>
                </div>
              </div>

              <div id='common_hr_box' className='detail_hr_box'></div>

{/* ingredient 영역 */}              
              <ul id='detail_margin_special' className='dr_ingredient'>
                <li>
                  <h3 className='detail_ingredient'>재료</h3>
                  <hr/>
                </li>
                <li>
                  <h3 className='detail_ingredient'>재료1</h3>
                  <div className='dr_i'>{recipe.ingredient1}</div>
                </li>
                <li>
                  <h3 className='detail_ingredient'>재료2</h3>
                  <div className='dr_i'>{recipe.ingredient2}</div>
                </li>
              </ul>
{/* baking_step 영역 */}
              <div id='detail_margin_special'>
                  <h3 className='detail_ingredient'>레시피</h3>
                  <hr/>
                    <ol className='dr_i_ol'>
                      {method.map((m) => (
                        <li key={m.method_pk_id} className='method_step'>
                          <h4 className='dr_i_ol_step'>{m.method_number}</h4> {/* 레시피 단계 출력 */}
                          {m.method} {/* 레시피 단계 출력 */}<br/><br/>
                        </li>
                      ))}
                    </ol>
              </div>

                <div id='common_hr_box' className='detail_hr_box'></div>


{/* Baking tip 영역 */}
                <section id='detail_margin_special' className='dr_bk_tip'>
                  <h3 className='dr_b_t'>Baking tip</h3>
                  <div className='recipe_tips'>{recipe.tips}</div>
                </section>

                <div id='common_hr_box' className='detail_hr_box'></div>

                <section id='detail_margin_special' className='dr_tag'>
                  <h3 className='dr_t'>태그</h3>
                  <div className='dr_t1'>{recipe.tags.split(',').map(tag => tag.trim()).join(', ')}</div>
                </section>

              
              
              {console.log(recipe.recipe_image)}
              {console.log(recipe.recipe_image)}
            </div>
          </>
          
        
      </ul>
    </div>
  );
}

export default DetailRecipe;
