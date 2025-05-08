import Makko from "../Makko";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

async function uploadAndGetUrl(blob: Blob): Promise<string> {
    const storage = Makko.getConfig().firebase.storage;

    const path = `bot/${uuidv4()}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, blob);

    return await getDownloadURL(fileRef);
}

export default uploadAndGetUrl;