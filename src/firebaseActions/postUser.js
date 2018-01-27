import { fb } from '../utils/firebase'

export const postUser = (uid, email) => {
    return fb.database().ref(`users/${uid}`).set({
        email,
        uid
    })
}
