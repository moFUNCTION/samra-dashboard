import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../Config/Config";

export const UploadFiles = async ({ files, StoragePath, onUploadProgress }) => {
  const fileProgresses = Array(files.length).fill(0);
  const uploadReq = await Promise.all(
    files.map((file, index) => {
      return new Promise((resolve, reject) => {
        const Path = `${StoragePath}/${file.name + v4()}`;
        const imageRef = ref(storage, Path);
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            fileProgresses[index] = progress;
            const overallProgress = Math.floor(
              fileProgresses.reduce((sum, progress) => sum + progress, 0) /
                files.length
            );
            if (onUploadProgress) {
              onUploadProgress({
                progress: overallProgress,
                fileName: file.name,
                state: snapshot.state,
              });
            }
          },
          (error) => {
            reject(error);
          },
          async () => {
            const URL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ URL, Path });
          }
        );
      });
    })
  );

  return uploadReq;
};
