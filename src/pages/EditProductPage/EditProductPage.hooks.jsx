import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, doc } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
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

export const useEditProduct = (id) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const col = collection(firestore, "inventories");
  const ref = doc(col, id);
  const mutation = useFirestoreDocumentMutation(ref);

  const submitForm = async (form) => {
    setLoading(true);

    try {
      const data = {
        name: form.name,
        description: form.description,
        buyPrice: form.buyPrice,
        sellPrice: form.sellPrice,
        createdAt: new Date(),
      };

      if (form.photo) {
        const photoUrl = await uploadFile(form.photo[0]);
        data.photo = photoUrl
      }

      await mutation.mutateAsync(data);

      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
    }

    setLoading(false);
  };

  return { loading, success, submitForm };
};
