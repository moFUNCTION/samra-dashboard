import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Config/Config";
export class LoginWithEmail {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
  async loginrRequist() {
    try {
      const req = await signInWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      return req;
    } catch (err) {
      throw new Error(err.code);
    }
  }
}
