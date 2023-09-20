import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import {
  userProps,
  profileProps,
  friendProps,
  roomProps,
  groupResDtoType,
} from "types/types";

const { persistAtom } = recoilPersist();

export const IsDark = atom<boolean>({
  key: "IsDark",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const FriendList = atom<friendProps[]>({
  key: "FriendList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const NomalFriendList = selector({
  key: "NomalFriendList",
  get: ({ get }) => {
    const friendList = get(FriendList);
    return friendList?.filter((item) => item.friendShipStatus === "FRIEND");
  },
});

export const ReceivedFriendList = selector({
  key: "ReceivedFriendList",
  get: ({ get }) => {
    const friendList = get(FriendList);
    return friendList?.filter((item) => item.friendShipStatus === "RECEIVED");
  },
});

export const GroupResDto = atom<groupResDtoType>({
  key: "GroupResDto",
  default: {
    groupId: 0,
    roomId: 0,
    groupGender: "MALE",
    groupUser: [
      {
        userName: "",
        groupIdx: 0,
        imageUrl: "",
      },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});

export const MainStreamManager = atom({
  key: "MainStreamManager",
  default: null,
});

export const RequestFriendList = selector({
  key: "RequestFriendList",
  get: ({ get }) => {
    const friendList = get(FriendList);
    return friendList?.filter((item) => item.friendShipStatus === "REQUESTED");
  },
});

export const TokenValue = atom<string>({
  key: "TokenValue",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const IsLogin = atom<boolean>({
  key: "IsLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const UserInfo = atom<userProps>({
  key: "UserInfo",
  default: {
    userEmail: "",
    userName: "",
    phoneNumber: "",
    userAge: 0,
    userGender: undefined,
    userLike: 0,
    userStatus: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const ProfileImgSrc = atom<string>({
  key: "ProfileImgSrc",
  default: "",
});

export const InvitedList = atom<groupResDtoType[]>({
  key: "InvitedList",
  default: [],
});

export const ProfileInfo = atom<profileProps>({
  key: "ProfileInfo",
  default: {
    userSido: "",
    userSidoCode: 0,
    userGugun: "",
    userJob: "",
    userHobby: "",
    userMbti: "",
    content: "",
  },
});

export const RoomInfo = atom<roomProps>({
  key: "RoomInfo",
  default: {
    roomType: "",
    roomId: 0,
    sessionId: "",
    userList: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const UpdateUserInfoFromToken = selector({
  key: "UpdateUserInfoFromToken",
  get: ({ get }) => {
    const tokenValue = get(TokenValue);

    let updateUserInfo = {
      userEmail: "",
      userName: "",
      phoneNumber: "",
      userAge: 0,
      userGender: "MALE",
      userLike: 0,
    };
    const fetchProfile = async () => {
      console.log("tokenValue", tokenValue);
      fetch("http://localhost:9999/api/users/mypage", {
        headers: {
          Auth: tokenValue,
        },
      })
        .then((response) => response.json())
        .then((res) => (updateUserInfo = res));
    };
    fetchProfile();
    return updateUserInfo;
  },
});

export const InGameChatStatus = atom<boolean>({
  key: "InGameChatStatus",
  default: false,
});

export const GameStart = atom<boolean>({
  key: "GameStart",
  default: false,
});
