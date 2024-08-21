import axios from "axios"
import { useEffect, useState } from "react"

const useUserData = ({ sortBy, search }) => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')


  useEffect(async () => {
    const { data } = await axios.get('/api/v1/users');

    setUsers(data)
    setFilteredUsers(data)
  }, [])

  useEffect(() => {
    let filtered = users.filter(
      user =>
        user.name
          .toLowerCase()
          .includes(searchName.toLowerCase()) &&
        user.email
          .toLowerCase()
          .includes(searchEmail.toLowerCase()),
    );

    if (sortBy.column) {
      filtered.sort((a, b) => {
        const x = a[sortBy.column];
        const y = b[sortBy.column];
        if (x < y) return sortBy.direction === 'asc' ? -1 : 1;
        if (x > y) return sortBy.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered)

  }, [searchName, searchEmail, users, sortBy])

  useEffect(() => {
    let { name, value } = search

    if (name === 'name') {
      setSearchName(value)
    } else if (name === 'email') {
      setSearchEmail(value)
    } else {
      throw new Error('Unknown search element');
    }
  }, [search])

  return {
    users: filteredUsers
  }
}

export default useUserData
