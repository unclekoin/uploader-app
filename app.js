import firebase from "firebase/app";
import "firebase/storage";
import { upload } from './upload';

const firebaseConfig = {
  apiKey: "AAA",
  authDomain: "AAA",
  projectId: "AAA",
  storageBucket: "AAA",
  messagingSenderId: "AAA",
  appId: "AAA"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`images/${file.name}`)
      const task = ref.put(file)

      task.on('state_changed', (snapshot) => {
        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed() + '%';
        const block = blocks[index].querySelector('.preview__info-progress');
        block.textContent = percentage;
        block.style.width = percentage;
      }, (error) => {
        console.log(error)
      }, () => {
        task.snapshot.ref.getDownloadURL().then((url) => console.log('Download URL:', url));
      })
    })
  }
});
