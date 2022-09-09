import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    const [types, setType] = useState([])
    const [product, update] = useState({
        name: "",
        typeId: (0),
        price: "",
    })

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch('http://localhost:8088/types')
            .then(response => response.json())
            .then((kandyTypesArray) => {
                setType(kandyTypesArray)
            })
        }, []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            userId: kandyUserObject.id,
            name: product.name,
            typeId: product.typeId,
            price: parseFloat(product.price)
        }

        return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }

    return (
        <form className="productForm">
            <h2 className="productForm_title">Add New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label for htmlFor="name">Name of kandy:</label>
                    <input
                         required autoFocus
                         type="text"
                         className="form-control"
                         placeholder="Name goes here"
                         value={product.name}
                         onChange={
                            (evt) => {
                                const copy = structuredClone(product)
                                copy.name = evt.target.value
                                update(copy)
                                }
                            } />
                    <label for htmlFor="price">How much?</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Price of kandy:"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(product)
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset class="selectType">
                <label class="typeLabel" htmlFor="type">Type of kandy:</label>
                {
                    types.map(
                        (type) => {
                            return <div className="form-group">
                                <input
                                    onChange={
                                        (evt) => {
                                            const copy = structuredClone(product)
                                            copy.typeId = evt.target.value
                                            update(copy)
                                        }
                                    } type="checkbox" value={type.id}/> {type.category}
                            </div>
                        }
                    )
                }
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Product
            </button>
        </form>
    )
    
}