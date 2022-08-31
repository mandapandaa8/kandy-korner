
import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationsList"
import { ProductList } from "../Products/ProductList"
import "./ApplicationViews.css"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="header">Kandy Korner</h1>
                    <div className="candy_fix">🍬🍬🍬🍬🍬Get your Kandy Kraving fix here🍬🍬🍬🍬🍬</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <LocationList /> } />

				<Route path="products" element={ <ProductList /> } />
            </Route>
        </Routes>
    )
}

