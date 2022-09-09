import { useEffect, useState} from "react"
import "./EmployeeList.css"
import { Employees } from "./Employees"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [users, setUsers] = useState([])
    
    useEffect(
        () => {
            fetch('http://localhost:8088/employees?_expand=user&_expand=location')
            .then(response => response.json())
            .then((employeesArray) => {
                setEmployees(employeesArray)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then((usersArray) => {
                setUsers(usersArray)
            })
        },
        []
    )


    return <>

        <h2 className="employees_header">Employee List</h2>
        <ul>
        <article className="employees">
            {
                employees.map(
                    (employee) => 
                    <Employees key={`employee--${employee.id}`}
                        id={employee.id}
                        name={employee.user.fullName}
                        location={employee.location.address}
                    />
                )
            }
        </article>
        </ul>
    </>
}