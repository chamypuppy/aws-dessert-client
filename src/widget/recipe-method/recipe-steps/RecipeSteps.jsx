import { useMemo } from "react";


export const RecipeSteps = ({ methodInfo }) => {

  
/*   const steps = useMemo(() => {
    return Object.keys(methodInfo);
  }, [methodInfo]); */

  // setStep(Object.keys(methodInfo));

  console.log(methodInfo);
  console.log("🎊🎊", Object.keys(methodInfo));
  return(
    <div className="m-3">
        <h3 className='text-[1.3rem] font-bold mb-2 whitespace-pre-line'>레시피</h3>
        <hr/>
          <ol className='dr_i_ol'>
            {methodInfo.map((method, index) => (
              <li key={method.method_pk_id} className='mb-[25px] leading-[25px] whitespace-pre-line'>
                <h4 className='text-2xl font-extrabold'>{index+1}</h4>
                {method.method}<br/><br/>
              </li>
            ))}
          </ol>
    </div>
  );
};