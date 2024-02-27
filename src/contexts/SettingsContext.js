import useLocalStorage from "../hooks/useLocalStorage";
import { defaultSettings } from "../config";
import getColorPresets, {
  colorPresets,
  defaultPreset,
} from "../utils/getColorPresets";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  ...defaultSettings,
  onChangeMode: () => {},
  onToggleMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  onToggleStretch: () => {},
  onChangeLayout: () => {},
  onResetSetting: () => {},
  colorPreset: defaultPreset,
  colorOptions: [],
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

const SettingsProvider = () => {
  const [settings, setSettings] = useLocalStorage(
    "settings",
    {
      themeMode: initialState.themeMode,
      themeDirection: initialState.themeDirection,
      themeColor: initialState.themeColor,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
    }
  );

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode:
        settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onChangeDirection = (event) => {
    setSettings({
      ...settings,
      themeDirection: event.target.value,
    });
  };

  const onChangeColor = (event) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  const onChangeLayout = (event) => {
    setSettings({
      ...settings,
      themeLayout: event.target.value,
    });
  };

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    });
  };

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeDirection: initialState.themeDirection,
      themeColor: initialState.themeColor,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onChangeMode,
        onToggleMode,
        onChangeDirection,
        onChangeColor,
        onToggleStretch,
        onChangeLayout,
        onResetSetting,
        colorPreset: getColorPresets(settings.themeColor),
        colorOptions: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
      }}
    >
      SettingsProvider
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
