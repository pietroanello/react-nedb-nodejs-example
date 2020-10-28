import React from "react"

class App extends React.Component {
    state = {
        users: [],
        newName: "",
        newSurname: "",
    }

    componentDidMount() {
        this.updateData()
    }

    updateData = () => {
        fetch("/getData")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    users: data,
                    newName: "",
                    newSurname: "",
                })
            })
    }

    addData = event => {
        event.preventDefault()
        const data = {
            name: this.state.newName,
            surname: this.state.newSurname,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
        fetch("/postData", options)
            .then(response => response.json())
            .then(data => {
                this.updateData()
            })
    }

    deleteData = event => {
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
                this.setState(prevState => {
                    let newArray = prevState.users
                    let pos = prevState.users
                        .map(function (e) {
                            return e._id
                        })
                        .indexOf(data)
                    newArray.splice(pos, 1)
                    return {
                        ...prevState,
                        users: newArray,
                    }
                })
            })
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    render() {
        const { users, newName, newSurname } = this.state
        return (
            <div>
                <ul className='users'>
                    {users.map(user => (
                        <li id={user._id} className='user'>
                            <p>
                                <strong>Name:</strong>
                                {user.name} {user.surname}
                            </p>
                            <span onClick={this.deleteData}>Delete User</span>
                        </li>
                    ))}
                </ul>
                <form onSubmit={this.addData}>
                    <input
                        type='text'
                        name='newName'
                        value={newName}
                        onChange={this.handleChange}
                    />
                    <input
                        type='text'
                        name='newSurname'
                        value={newSurname}
                        onChange={this.handleChange}
                    />
                    <button type='submit'>Add User</button>
                </form>
            </div>
        )
    }
}

export default App
