import { Link } from "react-router-dom"

export const Customers = ({ id, fullName, email, loyaltyNumber }) => {
    return <section className="customer">
        <div>
            <Link to={`/customers/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Email: {email}</div>
        <div>Loyalty Number: {loyaltyNumber}</div>
    </section>
}