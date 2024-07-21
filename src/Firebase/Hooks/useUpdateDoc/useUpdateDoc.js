import { doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useRef, useState } from "react";
import { db } from "../../Config/Config";

export const useUpdateDoc = ({ collection, DocId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onUpdate = useCallback(async ({ updatedData }) => {
    try {
      setLoading(true);
      const docRef = doc(db, collection, DocId);
      const req = await updateDoc(docRef, updatedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.code.message);
    }
  }, []);
  return { onUpdate, loading, error };
};
