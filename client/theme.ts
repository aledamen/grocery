import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    colors: {
        primary:theme.colors['purple'],
    },
    styles: {
        global: {
            body: {
                backgroundColor: 'primary.50'
            }
        }
    },
    breakpoints: {
        sm: '320px',
        m:'550px',
        md: '768px',
        lg: '990px',
        xl: '1200px',
        xml:'1350px',
        xxl: '1536px',
        xxxl: '1700px'
    },
})