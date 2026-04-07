import { firebaseApp } from '@/shared/api/firebaseApp.ts'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

export const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setDefaultLanguage('pl')

export const firebaseAuth = getAuth(firebaseApp)
