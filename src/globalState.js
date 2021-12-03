import {createContext, useEffect as UseEffect, useState as UseState} from 'react'
import { getData } from './utils/fetchData'
import {io} from 'socket.io-client'

export const DataContext = createContext()

export default function globalState({children}) {
    const [products, setProducts] = UseState([])
    const [socket, setSocket] = UseState(null)

    UseEffect(()=> {
        getData('/api/products').then(res => setProducts(res.data.products))
        .catch(error => console.log(error.response.data.msg))

        const socket = io(process.env.REACT_APP_API_URL)
        setSocket(socket)
        return ()=> socket.close()
    }, [])

    const state = {
        products: [products, setProducts],
        socket
    }

    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}

