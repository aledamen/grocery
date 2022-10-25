import { Button, Flex, Grid, Image, Stack, Text } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import api from '../product/api'
import { Product } from '../product/types'

interface Props {
    products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
    const [cart, setCart] = useState<Product[]>([])

    const handleAddtocart = (product: Product) => {
        setCart((cart) => cart.concat(product))
    }
    const parseCurrency = (value: number): string => {
        return value.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
        })
    }
    const text = useMemo(() => {
        return cart
            .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), ``)
            .concat(`\n Total: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
    }, [cart])

    return (
        <Stack>
            <Grid gap={4} templateColumns="repeat(3, 1fr)">
                {products.map((product, i) => (
                    <Stack borderRadius='md' p={4} key={i} color='green.500' bg="gray.100" alignItems="center" textAlign="center" fontSize='sm' fontWeight='500'>
                        <Text>{product.title}</Text>
                        <Text>{parseCurrency(product.price)}</Text>
                        <Image src={product.image} alt={product.title} h='200px'/>
                        <Text>{product.stock} un</Text>
                        <Button colorScheme="whatsapp" onClick={() => handleAddtocart(product)}>
                            Add to cart
                        </Button>
                    </Stack>
                ))}
            </Grid>
            <Flex alignItems="center" justifyContent="center">
                {Boolean(cart.length) && (
                    <Link href={`https://wa.me/+5491126306505?text=${encodeURIComponent(text)}`}>
                        <a target="_blank">
                            <Button colorScheme="whatsapp">
                                Checkout ({cart.length} {cart.length > 1 ? 'products' : 'product'})
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
