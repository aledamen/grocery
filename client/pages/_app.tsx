import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={theme}>
          <Container bg="white" boxShadow="md" maxWidth="container.xl" p={4} borderRadius='sm'>
              <Box p={4}>
                  <VStack mb={6}>
                      <Image src="https://treehouse.co/uploads/spizarnia-w-domu.jpg" alt="main-img" borderRadius={9999} w='128px' h='128px'></Image>
                      <Heading>Grocery</Heading>
                      <Text>Everything you need...</Text>
                  </VStack>
        </Box>
        <Divider/>
              <Component {...pageProps} />
          </Container>
      </ChakraProvider>
  )
  
}

export default MyApp
