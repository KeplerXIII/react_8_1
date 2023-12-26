import { DetailsProps, DetailedUser } from '../models'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'

export const Details: React.FC<DetailsProps> = ({ info }) => {
  const apiUrl = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`

  const { data, isLoading, hasError } = useFetch<DetailedUser>(apiUrl)
  const [imageLoading, setImageLoading] = useState(true)

  // Пришлось добавить чтобы сообщение о загрузке обновлялось именно в окне загрузки
  useEffect(() => {
    setImageLoading(true)
  }, [apiUrl])

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Something went wrong...</p>}
      {data && (
        <div className='detailed-box'>
          {imageLoading && <p>Загрузка</p>}
          <img
            key={apiUrl} // добавил тк не обновлялась картинка, тк она генерируется по одному и тому же URL
            src={data.avatar}
            alt={data.name}
            onLoad={() => setImageLoading(false)}
          ></img>
          <p>Name: {data.name}</p>
          <p>City: {data.details.city}</p>
          <p>Company: {data.details.company}</p>
        </div>
      )}
    </>
  )
}
