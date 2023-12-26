import { useEffect, useRef, useState } from 'react'
import { User } from '../models'
import { Details } from './Details'

export const List = () => {
  const apiUrl =
    'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'

  const [data, setData] = useState<User[]>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [hasError, setError] = useState<Error | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const timestampRef = useRef<number>()

  useEffect(() => {
    const fetchData = async () => {
      const timestamp = Date.now()
      timestampRef.current = timestamp
      setLoading(true)

      try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const users: User[] = await response.json()

        if (timestampRef.current === timestamp) {
          setData(users)
        }

        setError(null)
      } catch (e) {
        if (e instanceof Error) setError(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleButtonClick = (user: User) => {
    setSelectedUser(user)
  }

  return (
    <>
      <div className='users-box'>
        {isLoading && <p>Loading...</p>}
        {hasError && <p>Something went wrong...</p>}
        {data?.map((o) => (
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
