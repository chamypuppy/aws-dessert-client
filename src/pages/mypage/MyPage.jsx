import { useMyPageScreen } from "./model/useMyPageScreen";
import { MyPageView } from "./ui/MyPageView";

export default function MyPage() {
  const screen = useMyPageScreen();
  return <MyPageView {...screen} />;
}
