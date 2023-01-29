import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  useFirestoreCollectionMutation,
} from '@react-query-firebase/firestore';
import { collection } from 'firebase/firestore';
import storage from '../../database/storage';

import firestore from '../../database/firestore';

const uploadFile = (file) => new Promise((resolve, reject) => {
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    () => { },
    reject,
    () => { getDownloadURL(uploadTask.snapshot.ref).then(resolve); },
  );
});

export const useSubmitForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const storageRef = collection(firestore, 'inventories');
  const mutation = useFirestoreCollectionMutation(storageRef);

  const submitForm = async (form) => {
    setLoading(true);

    try {
      const photoUrl = await uploadFile(form.photo[0]);

      await mutation.mutateAsync({
        name: form.name,
        description: form.description,
        buyPrice: form.buyPrice,
        sellPrice: form.sellPrice,
        photo: photoUrl,
        createdAt: new Date(),
      });

      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
    }

    setLoading(false);
  };

  return { loading, success, submitForm };
};
