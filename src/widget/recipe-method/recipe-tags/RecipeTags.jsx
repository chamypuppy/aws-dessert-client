import { Separator } from "../../../shared/ui/separator/Separator";

export const RecipeTags = ({ recipeInfo }) => {
  console.log(recipeInfo);
  console.log(recipeInfo.tags);
  return(
    <>
      <div className="m-3">
        <div className='py-4'>
          <h3 className='text-[1.3rem] font-bold pb-3'>태그</h3>
          <div className='whitespace-pre-line'>{recipeInfo.tags}</div>
          {/* <div className=''>{recipeInfo.tags.split(',').map(tag => tag.trim()).join(', ')}</div> */}
          {/* mt mb 50 */}
        </div>
      </div>
    </>
  );
};