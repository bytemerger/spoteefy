import { Image } from './image.type'

export interface NewRelease{
  id: string
  uri: string
  images: Image[]
  name: string
  type: 'album' | 'single'
  release_date?: string
  total_tracks: Number
}
