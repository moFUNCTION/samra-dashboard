import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useRef, useState } from "react";
import { db } from "../../Config/Config";

export const useDeleteDoc = ({ collection, DocId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onDelete = useCallback(async () => {
    try {
      setLoading(true);
      const docRef = doc(db, collection, DocId);
      const req = await deleteDoc(docRef);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.code.message);
    }
  }, []);
  return { onDelete, loading, error };
};
