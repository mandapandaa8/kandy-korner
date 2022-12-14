
import { Outlet, Route, Routes } from "react-router-dom"
import { ProductForm } from "../Product Form/ProductForm"
import { LocationList } from "../Locations/LocationsList"
import { ProductList } from "../Products/ProductList"
import "./ApplicationViews.css"
import { EmployeeForm } from "../Employees/Employee Form"
import { EmployeeList } from "../Employees/EmployeeList"
import { CustomersList } from "../Customers/CustomersList"
import { CustomerDetails } from "../Customers/CustomerDetails"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="header">Kandy Korner</h1>
                    <div className="candy_fix">π¬π¬π¬π¬π¬Get your Kandy Kraving fix hereπ¬π¬π¬π¬π¬</div>

                    <Outlet />
                </>
            }>
                <Route path="employees" element={ <EmployeeList /> } />

                <Route path="locations" element={ <LocationList /> } />

				<Route path="products" element={ <ProductList /> } />

				<Route path="newProductsForm" element={ <ProductForm /> } />

                <Route path="employeeForm" element={ <EmployeeForm /> } />

                <Route path="customers" element={ <CustomersList /> } />

                <Route path="customers/:customerId" element={ <CustomerDetails /> } />
            </Route>
        </Routes>
    )
}