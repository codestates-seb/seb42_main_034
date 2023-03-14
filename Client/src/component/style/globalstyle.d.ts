import 'styled-components';
import { ColorTypes, FontSizeTypes, Theme } from './theme';
import { CSSProp } from 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    color: ColorTypes;
    fontSize: FontSizeTypes;
  }
}
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}
