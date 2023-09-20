import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import styled from "@emotion/styled";
import { UserInfo } from "atoms/atoms";
import { useRecoilState } from "recoil";

const Datepicker = ({ name }: { name: "userAge" }) => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  const onChange: DatePickerProps["onChange"] = (date: any, dateString) => {
    setUserInfo({
      ...userInfo,
      userAge: new Date().getFullYear() - date["$y"],
    });
  };
  return <StyledDatepicker onChange={onChange} />;
};

const StyledDatepicker = styled(DatePicker)`
  z-index: 10000;
  display: inline-block;
  width: 200px;
`;

export default Datepicker;
