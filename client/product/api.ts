/* eslint-disable import/no-anonymous-default-export */
import { Product } from "./types"
import axios from 'axios'
import Papa from 'papaparse'

export default{
    list: async ():Promise<Product[]> => {
        return await axios.get(process.env.PATH_CSV as string, { responseType: 'blob' }).then((res) => {
            return new Promise<Product[]>((resolve, reject) => {
                Papa.parse(res.data, {
                    header: true,
                    complete: (results) => {
                        const products = results.data as Product[]
                        const data =  products.map((product) => {
                            return {...product, price:Number(product.price)}
                        })
                        return resolve(data)
                    },
                    error: (error) => reject(error.message)
                })
            })
        })
    }
}