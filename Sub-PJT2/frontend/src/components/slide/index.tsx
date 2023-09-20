import * as S from './Slide.styled';

const Slider = () => {
  const settings = {
    dots: true,
    // className: "center",
    // centerMode: true,
    infinite: false,
    // centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 4,
    // speed: 500
  };
  // const imgUrl = require('./image/temp.jpg');
  const imgUrl = "https://miro.medium.com/v2/resize:fit:828/format:webp/0*iupD8x5q54eBL5Lc.jpg"
  const items = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
    { id: 4, url: imgUrl },
    { id: 5, url: imgUrl },
    { id: 6, url: imgUrl },
    { id: 7, url: imgUrl },
    { id: 8, url: imgUrl },
    { id: 9, url: imgUrl },
    { id: 10, url: imgUrl },
  ];

  return (
    <S.Container>
      <S.StyledSlider {...settings}>
        {items.map(item => {
          // if (item.id===2) {
          //   return (
          //     <S.ImageContainer>
          //       <S.BigImage src={item.url} />
          //     </S.ImageContainer>
          //   )
          // }
          return (
            <div key={item.id}>
              <S.ImageContainer>
                <S.Image src={item.url} />
              </S.ImageContainer>
            </div>
          );
        })}
      </S.StyledSlider>
    </S.Container>
  );
}

export default Slider;
