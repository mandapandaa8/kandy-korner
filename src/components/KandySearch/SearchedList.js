import { useEffect, useState} from "react"
import "./FindKandyList.css"


export const SearchedList = ({ searchTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/products')
            .then(response => response.json())
            .then((productsArray) => {
                setProducts(productsArray)
            })
        },
        []
    )

    useEffect(
        () => {
            //* filter original ticket list from API
            const foundKandy = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(foundKandy)
        },
        [ searchTermState ] //* TicketList is observing when the parent SearchTermState is changing
    )

    return <>

        <h2 className="products_header">All of the Candy</h2>

        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        let totalCost = product.price
                        const costString = totalCost.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })
                        
                        return <section className="product">
                        <header>The kandy: {product.name}</header>
                        <footer>{costString}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}