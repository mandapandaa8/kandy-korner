import { useEffect, useState} from "react"
import "./ProductList.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const [topPrice, setTopPrice] = useState([false])

    useEffect(
        () => {
            fetch('http://localhost:8088/products?_expand=type')
            .then(response => response.json())
            .then((productsArray) => {
                setFiltered(productsArray)
                setProducts(productsArray)
            })
        },
        []
    )

    useEffect(
        () => {
            if (topPrice) {
                const topPricedProduct = products.filter(product => product.price >= 2)
                setFiltered(topPricedProduct)
            }
            else {
                setFiltered(products)
            }
        },
        [topPrice]
    )

    return <>

        <h2 className="products_header">All of the Candy</h2>

        {
            kandyUserObject.staff
            ? <>
             {/* button should be named Top Priced
              when clicked only the products greater than $2 should be listed
              button should show for employees only */}
            <button onClick={ () => { setTopPrice(true)} } >Most $$$</button>
            <button onClick={ () => { setTopPrice(false)} } >Show All</button>
            </>
            : ""
        }

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
                        <div>The type: {product.type.category}</div>
                        <footer>{costString}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}

