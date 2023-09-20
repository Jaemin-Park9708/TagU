import React, { useCallback, useEffect, useState } from "react";
import * as S from './Tags.styled';
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import { TokenValue } from "atoms/atoms";
import { string } from "prop-types";
import axios from "axios";


const Tags = () => {
  const isBrowser = typeof window !== 'undefined';
  const theme : themeProps = useTheme();
  const [hashtag, setHashtag] = useState<string>('')
  const [hashArr, setHashArr] = useState<string[]>([])
  const token = useRecoilValue(TokenValue);

  useEffect(() => {
    // console.log("hobby api 실행 전 token 확인", token)
    const fetchHobbySrc = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/profile/hobby`, {
        headers: {
          Auth: token,
        },
      })
        .then((response) => response.json())
        .then((res) =>
          { if (res['hobby'] === undefined) {

          } else if (res['hobby'] === '') {
            setHashArr([])
          } else {
            setHashArr(res['hobby'].split('/').filter((item: string) => item !== ''));
          }})
      }
    token && fetchHobbySrc();
  }, [token]);

  // input 입력 시 hashtag 변경
  const onChangeHashtag = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHashtag(e.target.value);
    },
    []
  );

  // Enter 시 hashArr에 넣기, post 요청


  const onKeyUp = useCallback(
    (e:React.KeyboardEvent<HTMLInputElement>) => {
      if (isBrowser) {
        /* 요소 불러오기, 만들기*/
        const $HashWrapOuter = document.querySelector('.HashWrapOuter')
        const $HashWrapInner = document.createElement('div')
        $HashWrapInner.className = 'HashWrapInner'
        
        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener('click', () => {
          $HashWrapOuter?.removeChild($HashWrapInner)
          setHashArr(hashArr.filter((hashtag) => hashtag))
        })

        /* enter 키 코드 :13 */
        if (e.key === 'Enter' && hashtag.trim() !== '') {
          console.log('Enter Key 입력됨!', hashtag)
          $HashWrapInner.innerHTML = '#' + hashtag
          $HashWrapOuter?.appendChild($HashWrapInner)
          setHashArr((hashArr) => [...hashArr, hashtag])
          setHashtag('')
        }
      }
    },
    [hashtag, hashArr]
  )


  // onKeyUp = useCallback(
  //   (e:React.KeyboardEvent<HTMLInputElement>) => {
  //   if (hashtag !== '') {
  //     try {
  //       await axios.post(
  //         `${process.env.REACT_APP_BASE_URL}/profile/hobby`,
  //         {
  //           hobby: hashtag,
  //         },
  //         {
  //           headers: {
  //             Auth: token,
  //           },
  //         }
  //       );
  //       setHashArr((prevHashArr) => [...prevHashArr, hashtag]);
  //     } catch (error) {
  //       console.error(error);
  //     }
  // }
  //   setHashtag('');
  // }
  
  // useEffect(() => {
  //   const $HashWrapOuter = document.querySelector('.HashWrapOuter')
  //   const $HashWrapInner = document.createElement('div')
  //   $HashWrapInner.className = 'HashWrapInner'

  //   if (hashtag !== '') {
  //     $HashWrapInner.innerHTML = '#' + hashtag
  //     $HashWrapOuter?.appendChild($HashWrapInner)
  //     setHashArr((prevHashArr) => [...prevHashArr, hashtag]);

  //     /* 클릭 시 사라짐 */
  //     $HashWrapInner.addEventListener('click', () => {
  //     $HashWrapOuter?.removeChild($HashWrapInner)
  //     setHashArr(hashArr.filter((hashtag) => hashtag))
  //     // let new_content = new_content.replace(data.hobby, 'ff')
  //     // console.log(new_content)
  //   })
  //   }
  // }, [hashArr])

  return (
    <>
    <S.HashWrap theme={theme}>
      <div className="HashWrapOuter"></div>
    </S.HashWrap>
      <S.HashInput
        theme={theme}
        className="HashInput"
        type="text"
        value={hashtag}
        onChange={onChangeHashtag}
        onKeyUp={onKeyUp}
        placeholder="취미 추가하기"
      />
    </>
  );
}
  
export default Tags;
