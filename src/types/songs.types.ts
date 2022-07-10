import { Image } from './image.type'

export interface NewRelease{
  id: string
  uri: string
  images: Image[]
  name: string
  type: 'album' | 'single'
  album_type: 'album' | 'single'
  release_date?: string
  total_tracks: Number
}

interface Artists{
  id: string
  uri: string
  name: string
}
export interface Song{
  id: string
  uri: string
  album: {
    album_type: 'album' | 'single'
    artist: Artists[]
    name: string
    release_date: string
    images: Image[]
  }
  name: string
  duration_ms: number
}
