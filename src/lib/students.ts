import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { StudentRecord } from "@/types/marksheet";

type StudentPayload = Omit<StudentRecord, "id" | "createdAt">;

export async function getStudents(): Promise<StudentRecord[]> {
  const db = getFirebaseDb();
  const studentsCollection = collection(db, "students");
  const q = query(studentsCollection, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((entry) => {
    const data = entry.data();
    return {
      id: entry.id,
      personalDetails: data.personalDetails,
      subjects: data.subjects ?? [],
      totalMarks: data.totalMarks ?? 0,
      sgpa: data.sgpa ?? 0,
      createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    } satisfies StudentRecord;
  });
}

export async function createStudent(payload: StudentPayload) {
  const db = getFirebaseDb();
  const studentsCollection = collection(db, "students");
  await addDoc(studentsCollection, {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export async function updateStudent(id: string, payload: StudentPayload) {
  const db = getFirebaseDb();
  await updateDoc(doc(db, "students", id), {
    ...payload,
  });
}

export async function deleteStudent(id: string) {
  const db = getFirebaseDb();
  await deleteDoc(doc(db, "students", id));
}
