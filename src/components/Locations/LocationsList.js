import { useEffect, useState} from "react"
import "./LocationsList.css"

export const LocationList = () => {
    //* create a new state variable for locations
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/locations')
            .then(response => response.json())
            .then((locationsArray) => {
                setLocations(locationsArray)
            })
        },
        []
    )


    return <>
        <h2 className="location_header">Locations Near You</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location">
                            <header>We are located at {location.address} 🏛️</header>
                            <footer>{location.sqFootage} filled with candy! 🍬</footer>
                        </section>
                    }
                )

            }
        </article>
    </>

}