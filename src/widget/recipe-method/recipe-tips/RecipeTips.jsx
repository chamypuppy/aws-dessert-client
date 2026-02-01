import { Separator } from "../../../shared/ui/separator/Separator";

export const RecipeTips = ({ recipeInfo }) => {
  console.log(recipeInfo);
  console.log(recipeInfo.tips);
  return(
    <>
      <Separator/>
      {recipeInfo.tips ?
        <>
          <div className="m-3 ">
            <div className='py-4'>
              <h3 className='text-[1.3rem] font-bold'>Baking tip</h3>
              <div className='whitespace-pre-line'>{recipeInfo.tips}</div>
            </div>
          </div>
          <Separator/>
        </>
      : ""}
    </>
  );
};