export type User = {
  id: number
  name: string
}

export type DetailedUser = {
  id: number
  name: string
  avatar: string
  details: {
    city: string
    company: string
    position: string
  }
}

export type DetailsProps = {
  info: User
}

export type FetchData<T> = {
  data: T | undefined
  isLoading: boolean
  hasError: Error | null
}
