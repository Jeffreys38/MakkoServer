import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "../config/firebaseConfig";

async function uploadAndGetUrl(blob: Blob): Promise<string> {
    const path = `bot/${uuidv4()}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, blob);

    return await getDownloadURL(fileRef);
}

export default uploadAndGetUrl;