import db from './firestore'
import { collection, getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore/lite'

export async function getOrCreateLibrary (id: string) {
  const docRef = doc(db, 'users', `${id}`)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.get('library')
  }
  return await setDoc(docRef, {
    library: []
  })
}
export async function addToLibrary (id: string, songId: string) {
  const docRef = doc(db, 'users', `${id}`)
  const saveDoc = await updateDoc(docRef, {
    library: arrayUnion(`${songId}`)
  })
  return saveDoc
}
export async function removeFromLibrary (id: string, songId: string) {
  const docRef = doc(db, 'users', `${id}`)
  const saveDoc = await updateDoc(docRef, {
    library: arrayRemove(`${songId}`)
  })
  return saveDoc
}
