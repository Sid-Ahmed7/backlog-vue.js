export interface Game {
  id?: number
  name?: string
  cover?: {
    id: number
    image_id: string
  }
  genres?: {
    id: number
    name: string
  }[]
  platforms?: {
    id: number
    name: string
  }[]
  summary?: string
  artworks?: {
    id: number
    image_id: string
  }
  screenshots?: {
    id: number
    image_id: string
  }
  release_dates?: number[]
  invloved_companies?: {
    company: {
      id: number
      name: string
    }
  }
  rating?: number
  year?: number
}
