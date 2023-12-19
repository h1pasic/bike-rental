import { ParkingPlace } from '@/typings/Bike'

export default interface Station {
  name: string
  address: string
}

export interface StationAddress {
  city: string
  coordinates: number[]
  parkingPlaces: ParkingPlace[]
}
