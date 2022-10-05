import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from "./__init__";


/** 파일 업로드 */
export async function uploadFile(name: string, file: File, metadata?: object) {
    const storageRef = ref(storage, name);
    const uploadTask = await uploadBytes(storageRef, file, metadata);
    return uploadTask;
}

/** 파일 업로드 with progress*/
export async function uploadFileWithProgress(name: string, file: File, metadata?: object) {
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed', (snapshot: any) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
        }
    }, (error: any) => {
        switch (error.code) {
            case 'storage/unauthorized':
                console.log("User doesn't have permission to access the object");
                break;
            case 'storage/canceled':
                console.log("User canceled the upload");
                break;
            case 'storage/unknown':
                console.log("Unknown error occurred, inspect error.serverResponse");
                break;
        }
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            console.log('File available at', downloadURL);
            return downloadURL;
        });
    });
}

export async function downloadFile(filename: string) {
    try {
        const url = await getDownloadURL(ref(storage, filename));
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob'; // ArrayBuffer, Blob, Document, JavaScript 객체, 또는 DOMString을 반환할 수 있다.
        xhr.onload = (event) => {
            const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        return url;
    } catch (error: any) {
        switch (error.code) {
            // File doesn't exist
            case 'storage/object-not-found':
                break;
            // User doesn't have permission to access the object
            case 'storage/unauthorized':
                break;
            // User canceled the upload
            case 'storage/canceled':
                break;
            // Unknown error occurred, inspect the server response
            case 'storage/unknown':
                break;
        }
    }
}

export async function deleteFile(fileName:string) {
    await deleteObject(ref(storage, fileName)).then(() => {
        console.log('File deleted successfully');
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
}