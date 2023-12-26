import { useState } from 'react'
import { User } from '../models'
import { Details } from './Details'
import { useFetch } from '../hooks/useFetch'

export const List = () => {
  const apiUrl =
    'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { data, isLoading, hasError } = useFetch<User[]>(apiUrl)

  const handleButtonClick = (user: User) => {
    setSelectedUser(user)
  }

  return (
    <>
      <div className='users-box'>
        {isLoading && <p>Loading...</p>}
        {hasError && <p>Something went wrong...</p>}
        {data &&
          data.map((o) => (
            <button
              key={o.id}
              className='name-box'
              onClick={() => handleButtonClick({ id: o.id, name: o.name })}
            >
              {o.name}
            </button>
          ))}
      </div>
      {selectedUser && <Details info={selectedUser} />}
    </>
  )
}
