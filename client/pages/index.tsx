import { Button, createLocalStorageManager, Flex, Grid, Stack, Text } from '@chakra-ui/react'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import api from '../product/api'
import { Product } from '../product/types'
import styles from '../styles/Home.module.css'

interface Props {
    products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
    const [cart, setCart] = useState<Product[]>([])

    const handleAddtocart = (product: Product) => {
        setCart((cart) => cart.concat(product))
    }

    return (
        <Stack>
            <Grid gap={4} templateColumns="repeat(3, 1fr)">
                {products.map((product, i) => (
                    <Stack key={i} bg="gray.100" alignItems="center" textAlign="center" p="1rem">
                        <Text>{product.title}</Text>
                        <Text>{product.price}</Text>
                        <Button colorScheme="blue" onClick={() => handleAddtocart(product)}>
                            Agregar
                        </Button>
                    </Stack>
                ))}
            </Grid>
            <Flex alignItems='center' justifyContent='center'>
                {Boolean(cart.length) && (
                    <Link href="https://wa.me/+5491126306505?text=finalizar%compra">
                        <a target="_blank">
                            <Button colorScheme="whatsapp">
                                Completar pedido ({cart.length} {cart.length > 1 ? 'productos' : 'producto'})
                            </Button>
                        </a>
                    </Link>
                )}
            </Flex>
        </Stack>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const products = await api.list()
    return {
        props: {
            products,
        },
    }
}

export default Home
