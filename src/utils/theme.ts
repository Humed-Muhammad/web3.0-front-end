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
      lightGray: {
        default: "#FBFBFB",

        _dark: "#fff",
      },
      meduimGray: {
        default: "#F5F5F5",
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: "#4FB5FF",
      },
    },
    Box: {
      baseStyle: {
        transition: "all 0.2s ease-out",
      },
    },
    Flex: {
      baseStyle: {
        transition: "all 0.2s ease-out",
      },
    },
    Text: {
      baseStyle: {
        fontWeight: "300",
        fontFamily: "Poppins",
        fontSize: ["md", "lg", "16px"],
        color: "#14113D",
        transition: "all 0.2s ease-out",
      },
      variants: {
        truncated: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          w: "16",
          textAlign: "center",
        },
      },
    },
    Button: {
      baseStyle: {
        color: "#FFFFFF",
        fontFamiliy: "Montserrat, sans-serif",
        transition: "all 0.2s ease-out",
      },
      variants: {
        primary: {
          height: ["42px", "54px"],
          width: ["200px", "230px", "280px"],
          fontSize: ["md", "20px"],
          borderRadius: "30px",
          fontWeight: "600",
          py: "14px",
          background:
            " linear-gradient(269.74deg, #24DFF9 0.22%, #C446F9 99.83%)",
        },
        large: {
          height: ["49px", "66px"],
          width: ["200px", "260px", "343px"],
          fontSize: ["md", "lg", "xl", "20px"],
          borderRadius: "30px",
          fontWeight: "600",
          py: "20px",
          background:
            " linear-gradient(269.74deg, #24DFF9 0.22%, #C446F9 99.83%)",
        },
        small: {
          width: ["100px", "112px", "124.07px"],
          height: "29px",
          fontSize: ["sm", "md", "16px"],
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
