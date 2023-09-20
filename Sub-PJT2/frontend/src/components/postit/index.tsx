import * as S from "./Postit.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import "./Postit.css";

const Postit = () => {
  const theme: themeProps = useTheme();
  window.onload = init; 

  function init() { 
    const addButton = document.getElementById("add_button") as HTMLButtonElement;
    addButton.onclick = createSticky;

    let stickiesArray = getStickiesArray();
    for (const key of stickiesArray) {
      const value = JSON.parse(localStorage.getItem(key) || "");
      addStickyToDOM(key, value);
    } 
  } 
  
  function getStickiesArray(): string[] {
    let stickiesArray = localStorage.getItem("stickiesArray");
    if (!stickiesArray) {
      localStorage.setItem("stickiesArray", JSON.stringify([]));
      stickiesArray = "[]";
    }
    return JSON.parse(stickiesArray);
  }
  
  function createSticky() { 
    const stickiesArray = getStickiesArray();
    const Input = document.getElementById("note_text") as HTMLInputElement
    const value = Input.value;
    const colorSelectObj = document.getElementById("note_color") as HTMLSelectElement;
    const index = colorSelectObj.selectedIndex;
    const color = colorSelectObj.options[index].value;
      
    // json으로 value와 color가 유지되는 스티키 노트를 생성 
    const currentDate = new Date();
    const key = "sticky_" + currentDate.getTime();
    const stickyObj = {
      value: value,
      color: color,
    };
      
    // 새 스티키 노트를 배열에 추가하고 localStorage에 저장된 notes 배열을 업데이트함 
    localStorage.setItem(key, JSON.stringify(stickyObj));
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    addStickyToDOM(key, stickyObj);
  }

  function deleteSticky(e: MouseEvent) {
    let key: string | null = null;
    if ((e.target as HTMLSpanElement).tagName.toLowerCase() === "span") {
      const parentNode = (e.target as HTMLSpanElement).parentNode as HTMLElement;
      key = parentNode?.id;
    } else {
      key = (e.target as HTMLElement)?.id;
    }
  
    if (key !== null) {
      const stickiesArray = getStickiesArray();
      const index = stickiesArray.indexOf(key);
      if (index !== -1) {
        stickiesArray.splice(index, 1);
        localStorage.removeItem(key);
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
        removeStickyFromDOM(key);
      }
    }
  }
  
  function addStickyToDOM(key: string, stickyObj: { value: any; color: any; }) { 
    const stickies = document.getElementById("stickies") as HTMLUListElement;
    const sticky = document.createElement("li") as HTMLLIElement;
       
    // 스티키 배열에 저장된 아이디로 찾을 수 있게 id속성에 key값을 지정 
    sticky.setAttribute("id", key); 
      
    // stickyObj의 color를 이용해서 CSS 배경색 스타일을 지정 
    sticky.style.backgroundColor = stickyObj.color; 
      
    let span = document.createElement("span"); 
    span.setAttribute("class", "sticky"); 
      
    // stickyObj의 value를 이용해서 스티키 노트의 내용을 할당 
    span.innerHTML = stickyObj.value; 
      
    // 모든 것을 DOM에 추가 
    sticky.appendChild(span); 
    stickies.appendChild(sticky); 
      
    // 스티키 노트를 클릭하면 삭제되도록 이벤트 리스너를 붙임 
    sticky.onclick = deleteSticky; 
  } 

  function removeStickyFromDOM(key: string) {
    const sticky = document.getElementById(key) as HTMLElement;
    sticky?.parentNode?.removeChild(sticky);
  }
  
  return (
    <>
    <S.InputContainer>
      <S.Label htmlFor="note_color" theme={theme}>색상</S.Label>
      <S.Select id="note_color" theme={theme}>
        <option value="LightGoldenRodYellow">노란색</option>
        <option value="#D9EAD3">녹색</option>
        <option value="LightPink">분홍</option>
        <option value="LightBlue">파란색</option>
      </S.Select>
    </S.InputContainer>
    <S.InputContainer>
      <S.Label htmlFor="note_text" theme={theme}>내용</S.Label>
      <S.Input id="note_text" theme={theme} required maxLength={50}></S.Input>
      <S.Add theme={theme} id="add_button">작성하기</S.Add>
    </S.InputContainer>
    <S.Container>
      <ul id="stickies"></ul>
    </S.Container>
    </>
  );
};
export default Postit;
