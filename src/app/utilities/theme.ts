import { ThemeStateType } from "../slice/themeSlice";
import { useAppSelector } from "../store";

export const useThemePresets = () => {
  const { sidebarColor } = useAppSelector((state) => state.theme);

  return themePresets.map((theme) => ({
    ...theme,
    siderBg: sidebarColor,
    itemBg: sidebarColor,
  }));
};

export const themePresets: ThemeStateType[] = [
  {
    mode: "light",
    name: "Default",
    siderBg: "#4C4C6D",
    headerBg: "#FFFFFF",
    itemBg: "#4C4C6D",
    subMenuItemBg: "rgb(0, 0, 0, 0.5)",
    itemHoverBg: "rgb(0, 0, 0, 0.5)",
    itemSelectedColor: "#FFFFFF",
    colorPrimary: "#9b59b6",
    colorText: "#cccccc",
    defaultTheme: "#e3e3e3",
  },
  {
    mode: "dark",
    name: "Dark",
    siderBg: "#1F1F1F",
    headerBg: "#000000",
    itemBg: "#1F1F1F",
    defaultTheme: "#000000",
  },
];

export const primaryColors: { label: string; value: string }[] = [
  { label: "Turquoise", value: "#1abc9c" },
  { label: "Emerald", value: "#2ecc71" },
  { label: "Peter River", value: "#3498db" },
  { label: "Amethyst", value: "#9b59b6" },
  { label: "Alizarin", value: "#e74c3c" },
  { label: "Orange", value: "#f39c12" },
  { label: "Pumpkin", value: "#d35400" },
  { label: "Pomegranate", value: "#c0392b" },
];

export const sidebarColors: { label: string; value: string }[] = [
  { label: "Deep Twilight Blue", value: "#4C4C6D" },
  { label: "Midnight Emerald", value: "#015e3e" },
  { label: "Ocean Blue", value: "#1b3b6f" },
  { label: "Royal Amethyst", value: "#4b1d52" },
  { label: "Midnight Teal", value: "#02364b" },
  { label: "Blood Pomegranate", value: "#6a1212" },
  { label: "Charcoal Black", value: "#1b1b1b" },
  { label: "Graphite Gray", value: "#2c2c2c" },
];

export const fontSizes: { label: string; value: number }[] = Array.from(
  { length: 6 },
  (_, i) => {
    const size = 13 + i;
    return {
      label: `${size}${size === 14 ? " (Default)" : ""}`,
      value: size,
    };
  }
);

export const fontFamilies: { label: string; value: string }[] = [
  {
    label: "Roboto (Default)",
    value: "Roboto, sans-serif",
  },
  {
    label: "Poppins",
    value: "Poppins, sans-serif",
  },
  {
    label: "Times New Roman",
    value: "Times New Roman, sans-serif",
  },
];
