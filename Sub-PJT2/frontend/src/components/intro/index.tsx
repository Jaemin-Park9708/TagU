import * as S from "./Intro.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useState } from "react";

const Intro = (props: { data: any }) => {
  const theme: themeProps = useTheme();
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(props.data);

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    setEditing(false);
    setEditedData(editedData);
    // 여기서 editedData로 수정하는 post 요청 보내야 함
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditedData(event.target.value);
  }

  return (
    <>
      <S.FavoriteIconStyled theme={theme} onClick={handleEdit} />
      {editing ? (
        <S.Container>
          <S.Input value={editedData} onChange={handleChange} theme={theme}/>
          <S.Button onClick={handleSave} theme={theme}>저장</S.Button>
        </S.Container>
      ) : (
        <S.Content theme={theme}>{editedData}</S.Content>
      )}
    </>
  );
};

export default Intro;
