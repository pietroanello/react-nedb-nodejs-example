import React, { useState, useEffect } from "react"

function App() {
    const [users, updateUsers] = useState([])
    const [userData, updateUserData] = useState({ name: "", surname: "" })

    useEffect(() => {
        updateData()
    }, [users])

    function updateData() {
        fetch("/getData")
            .then(response => response.json())
            .then(data => {
                updateUsers(data)
            })
    }

    function addData(event) {
        event.preventDefault()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }
        fetch("/postData", options)
            .then(response => response.json())
            .then(updateData())
    }

    function deleteData(event) {
        const data = {
            id: event.target.parentElement.attributes.id.value,
        }
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        fetch("/deleteData", options)
            .then(response => response.json())
            .then(data => {
                updateUsers(prev => {
                    let newArray = prev
                    let pos = prev
                        .map(function (e) {
                            return e._id
                        })
                        .indexOf(data)
                    newArray.splice(pos, 1)
                    return newArray
                })
            })
    }

    function handleChange(event) {
        const { name, value } = event.target
        updateUserData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div>
            <ul className='users'>
                {users.map(user => (
                    <li id={user._id} className='user'>
                        <p>
                            <strong>Name:</strong>
                            {user.name} {user.surname}
                        </p>
                        <span onClick={deleteData}>Delete User</span>
                    </li>
                ))}
            </ul>
            <form onSubmit={addData}>
                <input
                    type='text'
                    name='name'
                    placeholder='First Name'
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='surname'
                    placeholder='Last Name'
                    onChange={handleChange}
                />
                <button>Add User</button>
            </form>
        </div>
    )
}

export default App
