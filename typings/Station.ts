import { ParkingPlace } from '@/typings/Bike'

export default interface Station {
  name: string
  address: StationAddress
}

export interface StationAddress {
  city: string
  coordinates: number[]
  parkingPlaces: ParkingPlace[]
}
