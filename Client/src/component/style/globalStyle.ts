import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    box-sizing:border-box;
    overflow-x: hidden;
  }
  *{
    font-family: "GmarketSansMedium";
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  #root{
    height: 100vh;
  }
body {
  margin: 0;

 
}
.flex> p> img{
  width : 100%
}
.flex> p{
  width : 100%
}
.my-editor .ql-editor {
  max-width: 600px; /* Change this value to your desired maximum width */
  margin: 0 auto; /* Center the editor horizontally */
}
.slick-slider{
  display:flex;
  align-items: center;
}

@font-face {
  font-family: 'GmarketSansMedium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
    font-family: 'HSSaemaul-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSSaemaul-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

`;
