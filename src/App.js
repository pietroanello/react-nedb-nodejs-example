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
        fetch("/api")
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
        fetch("/api", options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.updateData()
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
                        <li className='user'>
                            <p>
                                <strong>Name:</strong>
                                {user.name} {user.surname}
                            </p>
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
