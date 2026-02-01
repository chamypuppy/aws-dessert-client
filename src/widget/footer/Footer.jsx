import { Link } from "react-router-dom"

export const Footer = () => {
  return(
    <footer className="bg-[#f7f7f773] py-[30px] px-[20px] text-[#8a8a8a] text-right
">
      <h3 className="text-[1.1rem] font-medium">dessert-recipe-project</h3>
      <div className="mt-[20px] leading-[23px]">
        <div className="text-[#8a8a8a]"><Link to='https://github.com/chamypuppy'>개발자 깃허브</Link></div>
        <div className="">ⓒ 2025. 푸딩비 All rights reserved.</div>
      </div>
    </footer>
  )
}