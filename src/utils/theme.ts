import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.400",
      primary: {
        default: "#4F52FF",
        _dark: "white",
      },
      secondary: {
        default: "#24DFF9",
        _dark: "cyan.500",
      },
      tertiary: {
        default: "#C446F9",
        _dark: "purple.500",
      },
      text: {
        default: "#14113D",
      },
    },
  },
  components: {
    Text: {
      baseStyle: {
        // fontWeight: "300",
        fontFamily: "Poppins",
        fontSize: "16px",
        color: "#14113D",
      },
    },
    Button: {
      baseStyle: {
        color: "#FFFFFF",
        fontFamiliy: "Montserrat, sans-serif",
      },
      variants: {
        primary: {
          height: "54px",
          width: "280px",
          fontSize: "20px",
          borderRadius: "30px",
          fontWeight: "600",
          py: "14px",
          background:
            " linear-gradient(269.74deg, #24DFF9 0.22%, #C446F9 99.83%)",
        },
        large: {
          height: "66px",
          width: "343px",
          fontSize: "20px",
          borderRadius: "30px",
          fontWeight: "600",
          py: "20px",
          background:
            " linear-gradient(269.74deg, #24DFF9 0.22%, #C446F9 99.83%)",
        },
        small: {
          width: "124.07px",
          height: "29px",
          fontSize: "16px",
          borderRadius: "15px",
          fontWeight: "500",
          py: "3px",
          background:
            " linear-gradient(269.74deg, #24DFF9 0.22%, #C446F9 99.83%)",
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
  },
});

export const fonts = {
  MontserratAlt: "Montserrat Alternates",
  Montserrat: "Montserrat",
  Jost: "Jost",
  Poppins: "Poppins",
  Digital: "Digital Numbers Regular",
};
