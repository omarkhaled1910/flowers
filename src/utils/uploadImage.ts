import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../../firebase';

export const uploadImageToStorage = async (
  file: any,
  cb: (url: string) => void
) => {
  const storageRef = ref(storage, `newfolder/${file.path}`);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  cb(downloadURL);
  console.log('Download URL', downloadURL);
};
