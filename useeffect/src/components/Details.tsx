import { DetailsProps, DetailedUser } from '../models'
import { useFetch } from '../hooks/useFetch'

export const Details: React.FC<DetailsProps> = ({ info }) => {
  const apiUrl = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`

  const { data, isLoading, hasError } = useFetch<DetailedUser>(apiUrl)

  return (
    <>
      {data && (
        <div className='detailed-box'>
          {isLoading && <p>Loading...</p>}
          {hasError && <p>Something went wrong...</p>}
          <img key={apiUrl} src={data.avatar} alt={data.name}></img>
          <p>Name: {data.name}</p>
          <p>City: {data.details.city}</p>
          <p>Company: {data.details.company}</p>
        </div>
      )}
    </>
  )
}
