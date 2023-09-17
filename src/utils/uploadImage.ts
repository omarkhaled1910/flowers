import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '../../firebase';

export const uploadImageToStorage = (file: any, cb: (url: string) => void) => {
  const storageRef = ref(storage, `newfolder/${file.name}`);

  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      cb(downloadURL);
      console.log('Download URL', downloadURL);
    });
};
