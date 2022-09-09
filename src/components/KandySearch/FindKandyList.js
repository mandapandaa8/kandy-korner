import { useEffect, useState} from "react"
import "./FindKandyList.css"

export const FindKandyList = ({ searchTerms, setSearchTerms }) => {
    const [searchProducts, setSearch] = useState([])
    const [filterProducts, setFiltered ] = useState([])


    useEffect(
        () => {
            fetch('http://localhost:8088/products')
            .then(response => response.json())
            .then((searchArray) => {
                setSearch(searchArray)
            })
        },
        []
    )

    useEffect(
        () => {
            //* filter original ticket list from API
            const foundKandy = searchProducts.filter(product => {
                return product.name.toLowerCase().startsWith(searchTerms.toLowerCase())
            })
            setFiltered(foundKandy)
        },
        [ searchTerms ] //* TicketList is observing when the parent SearchTermState is changing
    )


    return <>
        <h2 className="searchKandy_header">What Kandy are you Looking For?</h2>

        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        //*change the state in the parent component
                        setSearchTerms(changeEvent.target.value)
                    }
                }
            
            type="text" placeholder="Search Kandy" />
        </div>
    </>

}