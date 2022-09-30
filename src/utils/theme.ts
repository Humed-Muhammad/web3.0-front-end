import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

export const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: '#FFCA00',
    components: ['Button', 'Badge'],
  }),
  withDefaultColorScheme({
    colorScheme: '#6F7FF7',
    components: ['Link', 'Heading'],
  }),
  {
    semanticTokens: {
      colors: {
        error: '#FF3030',
        success: '#8BE35B',
        primary: {
          default: '#319795',
          _dark: 'white',
        },
        secondary: {
          default: 'cyan.300',
          _dark: 'cyan.200',
        },
        text: {
          default: '#3366FF',
        },
        graybg: {
          default: '#F7FAFC',
          _dark: '#000',
        },
      },
    },
  }
)
