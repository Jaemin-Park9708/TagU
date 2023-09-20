import RightContainer from "containers/rightContainer/rightContainer-chatList/ChatList";
import { testUserData } from "types/types";

function ChatList() {
  const dataList: Array<testUserData> = [
    {
      profileImage: "pic1",
      name: "송강",
      region: "서울 은평구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 13:56",
      age: 25,
      mbti: "ENTP",
    },
    {
      profileImage: "pic2",
      name: "차은우",
      region: "경기 군포시",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 14:56",
      age: 24,
      mbti: "ENFP",
    },
    {
      profileImage: "pic3",
      name: "고민시",
      region: "대전 광역시",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 15:56",
      age: 23,
      mbti: "INTP",
    },
    {
      profileImage: "pic4",
      name: "로운",
      region: "서울 영등포구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 17:46",
      age: 21,
      mbti: "ISTP",
    },
    {
      profileImage: "pic5",
      name: "윈터",
      region: "서울 영등포구",
      lastMessage: "ㅎㅇㅎㅇㅎㅁㄴㅇㄹㅇ",
      lastMessageTime: "2023.07.11 15:46",
      age: 23,
      mbti: "ENTJ",
    },
    {
      profileImage: "pic6",
      name: "A",
      region: "서울 동작구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.10 17:46",
      age: 28,
      mbti: "ENFJ",
    },
    {
      profileImage: "pic7",
      name: "B",
      region: "서울 은평구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.09 17:46",
      age: 30,
      mbti: "INFP",
    },
  ];

  return <RightContainer testUserData={dataList} />;
}

export default ChatList;
