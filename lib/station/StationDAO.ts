import Station from '@/typings/Station'
import { getCollection } from '@/lib/Shared/Database'
import { ObjectId, WithId } from 'mongodb'

const { COLLECTION_STATIONS } = process.env
if (!COLLECTION_STATIONS) throw new Error('Missing Station Collection Name, check .env variables.')

export async function createStation(station: Station) {
  const collection = await getCollection(COLLECTION_STATIONS!)

  const exists = await collection.findOne({ ...station })
  if (exists) return console.log(`Station has not been added, because it already exists... _id: ${exists._id.toString()}`)

  await collection.insertOne({
    ...station,
  })
}

export async function getStations() {
  const collection = await getCollection(COLLECTION_STATIONS!)
  const stations = await collection.find({}).toArray()

  return stations as WithId<Station>[]
}

export async function deleteStation(id: ObjectId) {
  const collection = await getCollection(COLLECTION_STATIONS!)
  await collection.deleteOne({ _id: id })
}

export async function updateStation(old: WithId<Partial<Station>>, update: Partial<Station>) {
  const collection = await getCollection(COLLECTION_STATIONS!)
  await collection.updateOne({ _id: old._id }, { $set: { ...update } })
}
