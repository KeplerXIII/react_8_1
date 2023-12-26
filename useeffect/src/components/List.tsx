import { useEffect, useRef, useState } from 'react'
import { Users } from '../models'

export const List = () => {
  const apiUrl =
    'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'

  const [data, setData] = useState<Users[]>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [hasError, setError] = useState<Error | null>(null)
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

        const news: Users[] = await response.json()

        if (timestampRef.current === timestamp) {
          setData(news)
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

  return (
    <>
      <div className='users-box'>
        {isLoading && <p>Loading...</p>}
        {hasError && <p>Something went wrong...</p>}
        {data?.map((o) => (
          <button key={o.id} className='name-box'>
            {o.name}
          </button>
        ))}
      </div>
    </>
  )
}
