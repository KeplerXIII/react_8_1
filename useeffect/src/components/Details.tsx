import { useEffect, useRef, useState } from 'react'
import { DetailsProps, DetailedUser } from '../models'

export const Details: React.FC<DetailsProps> = ({ info }) => {
  const apiUrl = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`

  const [detailedData, setData] = useState<DetailedUser>()
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

        const user: DetailedUser = await response.json()

        if (timestampRef.current === timestamp) {
          setData(user)
        }

        setError(null)
      } catch (e) {
        if (e instanceof Error) setError(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [info.id])

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Something went wrong...</p>}
      <div className='detailed-box'>
        <img src={detailedData?.avatar} alt={detailedData?.name}></img>
        <p>Name: {detailedData?.name}</p>
        <p>City: {detailedData?.details.city}</p>
        <p>Company: {detailedData?.details.company}</p>
        <>{detailedData?.avatar}</>
      </div>
    </>
  )
}
