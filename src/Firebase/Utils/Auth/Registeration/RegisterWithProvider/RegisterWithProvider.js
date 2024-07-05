import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocsFromServer,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, facebookAuth, googleAuth } from "../../../../Config/Config";

export class Provider_Registeration {
  #collection = "Employers";
  constructor({ provider, phoneNumber, role }) {
    this.provider = provider;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }
  async #CheckIfUserExist(userDoc) {
    const userRes = await getDoc(userDoc);
    return userRes.exists();
  }
  async #SaveToFireStore({ email, userID, photoURL, username }) {
    const userDoc = doc(db, this.#collection, userID);
    const isUserExist = this.#CheckIfUserExist(userDoc);
    if (!isUserExist) {
      const req = await setDoc(userDoc, {
        email: email,
        displayName: username,
        phoneNumber: this.phoneNumber,
        role: {
          name: this.role,
          isVerified: false,
        },
        photoURL,
        createdAt: serverTimestamp(),
      });
    }
  }

  async SignToProviderRequist() {
    try {
      const signReq = await signInWithPopup(auth, this.provider);
      const addUserToFirestore = await this.#SaveToFireStore({
        email: signReq.user.email,
        userID: signReq.user.uid,
        photoURL: signReq.user.photoURL,
        username: signReq.user.displayName,
      });
      return signReq;
    } catch (err) {
      throw new Error(err.code || err);
    }
  }
}
export class GoogleRegisteration extends Provider_Registeration {
  constructor({ phoneNumber, provider = googleAuth, role }) {
    super({ phoneNumber, provider, role });
  }
}
export class FacebookRegisteration extends Provider_Registeration {
  constructor({ phoneNumber, provider = facebookAuth, role }) {
    super({ phoneNumber, provider, role });
  }
}
