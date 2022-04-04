import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light as lightBase, dark as darkBase, PancakeTheme } from '@pancakeswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    // setIsDark((prevState) => {
    //   localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
    //   return !prevState
    // })
  }

  // customize light theme
  const light: PancakeTheme = lightBase
  light.card.background = '#4e4e4eab'
  light.colors.background = '#FF914D'
  light.modal.background = '#213b60'
  light.colors.primary = '#111'
  light.colors.primaryBright = '#FF914D'
  light.colors.secondary = '#FF914D'
  light.colors.tertiary = '#FF914D'
  light.button.primary.background = '#303030'
  light.button.primary.backgroundHover = '#f4f4f4'

  // customize dark theme
  const dark: PancakeTheme = darkBase
  dark.card.background = '#4e4e4eab'
  dark.button.primary.background = '#303030'
  dark.button.primary.backgroundHover = '#f4f4f4'

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? darkBase : lightBase}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
