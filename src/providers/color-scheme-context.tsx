import { createContext, useContext } from "react";

export const ColorSchemeContext = createContext({
  colorScheme: "light",
  toggleColorScheme: () => {},
});

export function useColorScheme() {
  return useContext(ColorSchemeContext);
}
