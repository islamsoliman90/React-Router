import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDTRfgepb4URYCdHBJA_oMB1q-kKD83u3Y",
  authDomain: "vans-31404.firebaseapp.com",
  projectId: "vans-31404",
  storageBucket: "vans-31404.appspot.com",
  messagingSenderId: "947209952924",
  appId: "1:947209952924:web:8a31cdde431bede1f69759",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const vansCollectionRef = collection(db, "van");

export async function getVans() {
  const docsC = await getDocs(vansCollectionRef);
  const arrvan = docsC.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return arrvan;
}

export async function getVan(id) {
  const docref = doc(db, "van", id);
  const snapdoc = await getDoc(docref);
  return {
    ...snapdoc.data(),
    id: snapdoc.id,
  };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querysnap = await getDocs(q);
  const arrvan = querysnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return arrvan;
}

// export async function getHostVans() {
//   const q = query(vansCollectionRef, where("hostId", "==", "123"));
//   const querySnapshot = await getDocs(q);
//   const dataArr = querySnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   return dataArr;
// }

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
