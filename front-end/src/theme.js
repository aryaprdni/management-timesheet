import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    red: "#F15858",
    blue: "#2775EC",
    lightBlue: "#F0F6FF",
    background: "#F7F8FB",
  },
};

const fonts = {
  heading: "'Nunito', sans-serif",
  body: "'Nunito', sans-serif",
};

const styles = {
  global: {
    "html, body": {
      backgroundColor: "brand.background",
    },
  },
};

const components = {
  Tabs: {
    baseStyle: {
      tab: {
        _selected: {
          color: "brand.blue",
          borderColor: "brand.blue",
          fontWeight: "bold",
        },
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};

const theme = extendTheme({ colors, fonts, styles, components });

export default theme;
