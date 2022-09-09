import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LocationList } from "../Locations/LocationsList"

export const EmployeeForm = () => {
    const [user, userUpdate] = useState({
        fullName: "",
        email: "",
        isStaff: true,
    })
    const [employee, employeeUpdate] = useState({
        startDate: "",
        payRate: (0),
        locationId: (0)
    })

    const [location, setLocation] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/locations')
            .then(response => response.json())
            .then((locationArray) => {
                setLocation(locationArray)
            })
        },
        []
    )


    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const userToSendToUserAPI = {
            fullName: user.fullName,
            email: user.email,
            isStaff: true
        }
        
        const employeeToSendToEmployeeAPI = {
            userId: user.id,
            startDate: employee.startDate,
            payRate: parseFloat(employee.payRate),
            locationId: employee.locationId
        }

        return fetch('http://localhost:8088/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToUserAPI)
        })
            .then(response => response.json())
            .then((newUser) => {
                employeeToSendToEmployeeAPI.userId = newUser.id
                fetch('http://localhost:8088/employees', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employeeToSendToEmployeeAPI)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/employees")
                })
            })
        }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="fullName">Name:</label>
                    <input
                    //* form field for creating new employee
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={user.fullName}
                        onChange={
                            (evt) => {
                                //* first copy existing state
                                const copy = structuredClone(user) //* copy with spread operator
                                //* modify copy
                                //* new value of description should be current value of input field
                                    //* gotten through change event
                                copy.fullName = evt.target.value
                                //* then need to update the state, pass copy back to be new state
                                userUpdate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">E-mail:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Add E-mail"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(user) 
                                copy.email = evt.target.value
                                userUpdate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(employee) 
                                copy.startDate = evt.target.value
                                employeeUpdate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(employee)
                                copy.payRate = evt.target.value
                                employeeUpdate(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select type="number"
                        value={employee.locationId}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(employee)
                                copy.locationId = evt.target.value
                                employeeUpdate(copy)
                            }
                        } >
                        {location.map(
                            location => {
                                return <option value={location.id}
                                onChange={
                                    (evt) => {
                                        const copy = structuredClone(employee)
                                        copy.locationId = evt.target.value
                                        employeeUpdate(copy)
                                    }
                                } key={`location--${location.id}`}> {location.address}</option>
                        })}
                    </select>

                </div>
            </fieldset>
            
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Create Employee
            </button>
        </form>
    )

}

