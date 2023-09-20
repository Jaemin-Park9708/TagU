// import { rest } from "msw";
// const friendList = [
//   {
//     id: "hongjaeyeon",
//     name: "hongjaeyeon",
//     img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
//   },

//   {
//     id: "taegue",
//     name: "taegue",
//     img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
//   },

//   {
//     id: "dd",
//     name: "Jgfdgdfsgsfd",
//     img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
//   },

//   {
//     id: "dd",
//     name: "dsdsds",
//     img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
//   },
// ];

// const getChatData = [
//   {
//     profileImage: "pic1",
//     name: "송강",
//     region: "서울 은평구",
//     lastMessage: "ㅎㅇㅎㅇㅎㅇ",
//     lastMessageTime: "2023.07.13 13:56",
//     age: 25,
//     mbti: "ENTP",
//   },
//   {
//     profileImage: "pic2",
//     name: "차은우",
//     region: "경기 군포시",
//     lastMessage: "ㅎㅇㅎㅇㅎㅇ",
//     lastMessageTime: "2023.07.13 14:56",
//     age: 24,
//     mbti: "ENFP",
//   },
//   {
//     profileImage: "pic3",
//     name: "고민시",
//     region: "대전 광역시",
//     lastMessage: "ㅎㅇㅎㅇㅎㅇ",
//     lastMessageTime: "2023.07.13 15:56",
//     age: 23,
//     mbti: "INTP",
//   },
//   {
//     profileImage: "pic4",
//     name: "로운",
//     region: "서울 영등포구",
//     lastMessage: "ㅎㅇㅎㅇㅎㅇ",
//     lastMessageTime: "2023.07.13 17:46",
//     age: 21,
//     mbti: "ISTP",
//   },
//   {
//     profileImage: "pic5",
//     name: "윈터",
//     region: "서울 영등포구",
//     lastMessage: "ㅎㅇㅎㅇㅎㅁㄴㅇㄹㅇ",
//     lastMessageTime: "2023.07.11 15:46",
//     age: 23,
//     mbti: "ENTJ",
//   },
//   {
//     profileImage: "pic6",
//     name: "A",
//     region: "서울 동작구",
//     lastMessage: "ㅎㅇㅎㅇㅎㅇ",
//     lastMessageTime: "2023.07.10 17:46",
//     age: 28,
//     mbti: "ENFJ",
//   },
//   {
//     profileImage: "pic7",
//     name: "B",
//     region: "서울 은평구",
//     lastMessage: "ㅎㅇㅎㅇㅎㅇ",
//     lastMessageTime: "2023.07.09 17:46",
//     age: 30,
//     mbti: "INFP",
//   },
// ];

// const getProfileData = {
//   imgSrc:
//     "https://i.namu.wiki/i/e-AmZjk-7-VjN_p7qbd18eIcRUnqfIfeFIlgCtu9A36AXHT4aW4Kk9ScHToD4EvG4Aqswe4CfhscQRTxGa7ivQ.webp",
//   name: "스티븐",
//   age: 32,
//   email: "taguzzang@gmail.com",
//   mbti: "ISFP",
//   job: "개발자",
//   hobby: "강아지 밥주기",
//   like: 100,
//   region_sido: "서울특별시",
//   region_sigungu: "은평구",
// };

// const chatList_jaeyeon = [
//   {
//     from: "A",
//     to: "B",
//     content: "안녕",
//     time: "2023.07.09 17:46",
//   },
//   {
//     from: "B",
//     to: "A",
//     content: "반가워 A야",
//     time: "2023.07.09 17:47",
//   },
//   {
//     from: "A",
//     to: "B",
//     content: "응 B야 ",
//     time: "2023.07.09 17:48",
//   },
//   {
//     from: "B",
//     to: "A",
//     content: "정말 반가워 A야",
//     time: "2023.07.10 14:02",
//   },
//   {
//     from: "A",
//     to: "B",
//     content: "맞아 B야",
//     time: "2023.07.11 14:02",
//   },
//   {
//     from: "A",
//     to: "B",
//     content: "나는 A이다",
//     time: "2023.07.12 17:48",
//   },

//   {
//     from: "B",
//     to: "A",
//     content: "fdsfsfsddsfsdfsdfdsfdsfdsfdsfsdfdsfdsfdsfsdfsdfsdfsdf나는 A이다",
//     time: "2023.07.12 17:48",
//   },
// ];

// const chatList_taegue = [
//   {
//     from: "A",
//     to: "B",
//     content: "랴 조태규ㅓ1!!!!!!!!!!!!!!!!!!!!!!",
//     time: "2023.07.09 17:46",
//   },
//   {
//     from: "B",
//     to: "A",
//     content: "반가워 재연아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ야",
//     time: "2023.07.09 17:47",
//   },
//   {
//     from: "A",
//     to: "B",
//     content: "응 B야 ",
//     time: "2023.07.09 17:48",
//   },
//   {
//     from: "B",
//     to: "A",
//     content: "정말 반가워 A야",
//     time: "2023.07.10 14:02",
//   },
// ];

// export const handlers = [
//   rest.get("/friends/list", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(friendList));
//   }),

//   rest.get("/chatlist/:nickName", (req, res, ctx) => {
//     const { nickName } = req.params;
//     return nickName === "hongjaeyeon"
//       ? res(ctx.status(200), ctx.json(chatList_jaeyeon))
//       : res(ctx.status(200), ctx.json(chatList_taegue));
//   }),

//   rest.get("/profile", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(getProfileData));
//   }),

//   rest.post("/chatlist/:nickName", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(req));
//   }),
// ];
