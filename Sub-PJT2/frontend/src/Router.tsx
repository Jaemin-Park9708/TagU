import { Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
// import Landing from "containers/landing/Landing";

import Home from "./containers/home";
import MyPage from "containers/myPage/MyPage";
import Openvidu from "containers/openvidu";
import ChatList from "containers/chatList/ChatList";
import ChatRoom from "containers/chatRoom/ChatRoom";
import Meeting from "containers/meeting";
import LandingContainer from "containers/landingContainer/Landing";
import InputContainer from "containers/inputContainer";
import PageNotFound from "containers/pageNotFound/PageNotFound";
import InGameChat from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
import MyPageTmp from "containers/mypagetmp";

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<LandingContainer />} />
      <Route path="/input" element={<InputContainer />} />
      <Route path="/home" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/mypage" element={<MyPageTmp />} />
      <Route path="/openvidu" element={<Openvidu />} />
      <Route path="/chatRoom/:userId" element={<ChatRoom />} />
      <Route path="/chatList" element={<ChatList />} />
      <Route path="/meeting/:roomId" element={<Meeting />} />
      <Route path="/chatTest" element={<InGameChat />} />
      <Route id="pnf" path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default Router;
