// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
    title: pixelToRem(60),
    maintitle: pixelToRem(35),
    subtitle: pixelToRem(25),
    paragraph: pixelToRem(18),
};

const colors = {
    black: '#000000',
    grey: '#EAEAEA',
    main: '#62A3F4',
    background: '#FBFBFB',
    backgroundBlue: '#62A3F4',
    buttonBlue: '#62A3F4',
    buttonGrey: '#D9D9D9',
    buttonHoverBlue: '#62A3F4',
    headerBorder: '#A7A7A7',
    unViewedNotice: '#C4E1D7',
    errorColor: '#ff6a00',
};

const radius = {
    small: '3px',
    base: '5px',
    large: '10px',
};

const fontWeigth = {
    thin: 400,
    base: 500,
    bold: 600,
};

const theme = {
    fontSizes,
    colors,
    fontWeigth,
    radius,
};

export default theme;