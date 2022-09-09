import { useEffect, useState} from "react"
import { Customers } from "./Customers"



export const CustomersList = () => {

    const [customers, setCustomers] = useState([])
    
    useEffect(
        () => {
            fetch('http://localhost:8088/users?isStaff=false')
            .then(response => response.json())
            .then((customersArray) => {
                setCustomers(customersArray)
            })
        },
        []
        )

    return <article className="customers">
        {
            customers.map(customer => <Customers key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.fullName} 
                email={customer.email}/> )
        }
        </article>
}