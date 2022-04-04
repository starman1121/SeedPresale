import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  // * {
  //   font-family: 'Poppins', sans-serif;
  // }
  body {
    // background-image: linear-gradient(
    //   188deg
    //   ,#000000 0%,#31abb3 100%);
    background-image: ${({ theme }) => (theme.isDark ? 'url(/images/bg.png)' : 'url(/images/bg.png)')};
    img {
      height: auto;
      max-width: 100%;
    }

   
  }
`

export default GlobalStyle
