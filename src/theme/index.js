import PropTypes from "prop-types";
import { useSettings } from "../contexts/SettingsContext";
import { useMemo } from "react";
import palette from "./base/palette";
import typography from "./base/typography";
import breakpoints from "./base/breakpoints";
import shadows, { customShadows } from "./base/shadows";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

const ThemeProvider = ({ children }) => {
  const { themeMode, themeDirection } = useSettings();
  const isLightMode = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLightMode ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLightMode ? shadows.light : shadows.dark,
      customShadows: isLightMode
        ? customShadows.light
        : customShadows.dark,
    }),
    [isLightMode, themeDirection]
  );

  const theme = createTheme(themeOptions);
  //   theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};
