import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "@/shared/api/firebaseApp.ts";

export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setDefaultLanguage('pl')

export const firebaseAuth = getAuth(firebaseApp);
