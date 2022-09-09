//* the parent that will contain the two items in product rout to allow access state
    //* will maintain the state
        //* ProductList and FindKandy will gain access to state via props
        //* keep in mind two siblings cant talk directly to each other, they have to go through a pair

import { useState } from "react"
import { ProductList } from "../Products/ProductList"
import { FindKandyList } from "./FindKandyList"
import { SearchedList } from "./SearchedList"
        
        export const KandyContainer = () => {
            const [searchTerms, setSearchTerms] = useState("")
        
            //* cut the TicketList and TicketSearch from the rout and paste here for return
            return <>
                <FindKandyList setSearchTerms={setSearchTerms} searchTerms={ searchTerms }/>  {/* the input field, aka the searchTerms, therefor needs the setter function, then can put onChange */}
                <SearchedList searchTermState={searchTerms} />  {/*needs to know what current search terms are, and display only tickets with those terms, needs access to actual state */}
            </>
        }