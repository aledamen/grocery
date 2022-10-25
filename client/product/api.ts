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
                    complete: results => resolve(results.data as Product[]),
                    error: (error) => reject(error.message)
                })
            })
        })
    }
}