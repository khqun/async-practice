import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000)
    })
    return await axios.get('http://localhost:9001/api/users')
  }
  useEffect(() => {
    setLoading(true)
    getUsers()
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        throw err
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  if (loading) {
    return (
      <p>...Loading</p>
    )
  }
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}> {user.name} </li>
        ))}
      </ul>
    </div>
  )
}