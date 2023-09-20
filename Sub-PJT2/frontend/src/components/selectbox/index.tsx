import { Select } from "antd";
import { ProfileInfo, TokenValue, UserInfo } from "atoms/atoms";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState, useRecoilValue } from "recoil";

let placeholderType: string = "";

let optionList:
  | { value: string; label: string }[]
  | useSidoEleProps[]
  | undefined = [];

type getSidoEleProps = {
  sido_code: string;
  sido_name: string;
};

type getGugunEleProps = {
  gugun_code: number;
  gugun_name: string;
  sido_code: number;
};

type useSidoEleProps = {
  code: string;
  value: string;
  label: string;
};

type useGugunProps = {
  value: string;
  label: string;
};

const mbtiList = [
  { value: "ISTJ", label: "ISTJ" },
  { value: "ISTP", label: "ISTP" },
  { value: "ISFJ", label: "ISFJ" },
  { value: "ISFP", label: "ISFP" },
  { value: "INTJ", label: "INTJ" },
  { value: "INTP", label: "INTP" },
  { value: "INFJ", label: "INFJ" },
  { value: "INFP", label: "INFP" },
  { value: "ESTJ", label: "ESTJ" },
  { value: "ESTP", label: "ESTP" },
  { value: "ESFJ", label: "ESFJ" },
  { value: "ESFP", label: "ESFP" },
  { value: "ENTJ", label: "ENTJ" },
  { value: "ENTP", label: "ENTP" },
  { value: "ENFJ", label: "ENFJ" },
  { value: "ENFP", label: "ENFP" },
];

const genderList = [
  { value: "MALE", label: "남자" },
  { value: "FEMALE", label: "여자" },
];

const SelectBox = ({
  name,
}: {
  name: "userMbti" | "userGender" | "userSido" | "userGugun";
}) => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [profileInfo, setProfileInfo] = useRecoilState(ProfileInfo);
  const [sidoList, setSidoList] = useState<useSidoEleProps[]>();
  const [gugunList, setGugunList] = useState<useGugunProps[]>();
  const token = useRecoilValue(TokenValue);
  const cookies = new Cookies();
  const [authToken, setAuthToken] = useState<string>("");
  const handleChange = (value: any, all: any) => {
    name === "userSido" &&
      setProfileInfo({
        ...profileInfo,
        userSidoCode: all.code,
        userSido: all.value,
      });
    name === "userGender" && setUserInfo({ ...userInfo, userGender: value });
    name === "userMbti" && setProfileInfo({ ...profileInfo, userMbti: value });
    name === "userGugun" &&
      setProfileInfo({ ...profileInfo, userGugun: value });
  };

  useEffect(() => {
    setAuthToken(cookies.get("Auth"));
  }, []);

  useEffect(() => {
    console.log("fetchSido 전 token", authToken);
    const fetchSido = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/areas`, {
        headers: {
          Auth: authToken,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          res?.length > 0 &&
            res?.forEach((item: getSidoEleProps) =>
              setSidoList((pre) => [
                ...(pre ?? []),
                {
                  code: item.sido_code,
                  value: item.sido_name,
                  label: item.sido_name,
                },
              ])
            );
        });
    };
    authToken && name === "userSido" && fetchSido();
  }, [authToken]);

  useEffect(() => {
    console.log("fetchGugun 전 token", authToken);
    const fetchGugun = async () => {
      setGugunList([]);
      fetch(
        `${process.env.REACT_APP_BASE_URL}/areas/${profileInfo.userSidoCode}`,
        {
          headers: {
            Auth: authToken,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          res?.length > 0 &&
            res?.forEach((item: getGugunEleProps) =>
              setGugunList((pre) => [
                ...(pre ?? []),
                {
                  value: item.gugun_name,
                  label: item.gugun_name,
                },
              ])
            );
        });
    };
    authToken && name === "userGugun" && fetchGugun();
  }, [profileInfo.userSidoCode]);

  if (name === "userGender") {
    placeholderType = "성별";
    optionList = genderList;
  } else if (name === "userSido") {
    placeholderType = "시도";
    optionList = sidoList;
  } else if (name === "userGugun") {
    placeholderType = "구군";
  } else if (name === "userMbti") {
    placeholderType = "MBTI";
    optionList = mbtiList;
  }

  return (
    <Select
      placeholder={placeholderType}
      style={{
        width: 100,
        display: "inline-block",
        marginRight: "3px",
      }}
      onChange={handleChange}
      options={name === "userGugun" ? gugunList : optionList}
    />
  );
};

export default SelectBox;
