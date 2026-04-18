"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Auth,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { computeTotals, getDefaultSubject, syncObtainedTotal } from "@/lib/calc";
import { createStudent, deleteStudent, getStudents, updateStudent } from "@/lib/students";
import { MarksheetBackTemplate } from "@/components/marksheet-back-template";
import { MarksheetTemplate } from "@/components/marksheet-template";
import { ProvisionalCertificateTemplate } from "@/components/provisional-certificate-template";
import { MarksheetHdPngButton, PdfGeneratorButton } from "@/components/pdf-generator-button";
import { PersonalDetails, StudentRecord, Subject } from "@/types/marksheet";
import {
  ADMIN_SEMESTER_COUNT,
  adminSemesterLabel,
  type AdminSemesterNumber,
  buildAdminSemesterPreset,
} from "@/lib/admin-semester-presets";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

type FormState = {
  personalDetails: PersonalDetails;
  subjects: Subject[];
};

type TemplateSide = "front" | "back" | "provisional";

export function AdminDashboard() {
  const authInstance = useMemo<Auth | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return getFirebaseAuth();
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState<FormState>(() => buildAdminSemesterPreset(4));
  /** Which built-in semester template was last applied (`null` when editing a saved student). */
  const [activePresetSemester, setActivePresetSemester] = useState<AdminSemesterNumber | null>(4);
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTemplateSide, setActiveTemplateSide] = useState<TemplateSide>("front");
  const [saving, setSaving] = useState(false);

  const selectedRecord = useMemo(
    () => students.find((student) => student.id === selectedId) ?? null,
    [students, selectedId],
  );

  useEffect(() => {
    if (!authInstance) return undefined;
    const unsubscribe = onAuthStateChanged(authInstance, async (firebaseUser) => {
      setCurrentUser(firebaseUser);
      if (firebaseUser) {
        const data = await getStudents();
        setStudents(data);
        if (data.length > 0) setSelectedId(data[0].id);
      }
    });
    return () => unsubscribe();
  }, [authInstance]);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!authInstance) return;
    await signInWithEmailAndPassword(authInstance, email, password);
  };

  const onLogout = async () => {
    if (!authInstance) return;
    await signOut(authInstance);
    setCurrentUser(null);
  };

  const updatePersonal = (key: keyof PersonalDetails, value: string) => {
    setForm((previous) => ({
      ...previous,
      personalDetails: { ...previous.personalDetails, [key]: value },
    }));
  };

  const updateSubject = (id: string, key: keyof Subject, value: string | number) => {
    setForm((previous) => ({
      ...previous,
      subjects: previous.subjects.map((subject) => {
        if (subject.id !== id) return subject;
        const updated = {
          ...subject,
          [key]:
            key === "credits" ||
            key.includes("max") ||
            key.includes("obtained")
              ? Number(value)
              : value,
        } as Subject;
        return syncObtainedTotal(updated);
      }),
    }));
  };

  const addSubject = (type: Subject["type"]) => {
    setForm((previous) => ({ ...previous, subjects: [...previous.subjects, getDefaultSubject(type)] }));
  };

  const removeSubject = (id: string) => {
    setForm((previous) => ({
      ...previous,
      subjects: previous.subjects.filter((subject) => subject.id !== id),
    }));
  };

  const { totalMarks, sgpa } = useMemo(() => computeTotals(form.subjects), [form.subjects]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const payload = {
      personalDetails: form.personalDetails,
      subjects: form.subjects,
      totalMarks,
      sgpa,
    };
    if (selectedRecord) {
      await updateStudent(selectedRecord.id, payload);
    } else {
      await createStudent(payload);
    }
    const data = await getStudents();
    setStudents(data);
    setSelectedId(data[0]?.id ?? null);
    setSaving(false);
  };

  const onEdit = (record: StudentRecord) => {
    setSelectedId(record.id);
    setActivePresetSemester(null);
    setForm({
      personalDetails: record.personalDetails,
      subjects: record.subjects,
    });
  };

  const applySemesterPreset = (sem: AdminSemesterNumber) => {
    setForm(buildAdminSemesterPreset(sem));
    setActivePresetSemester(sem);
  };

  const onDelete = async (id: string) => {
    await deleteStudent(id);
    const data = await getStudents();
    setStudents(data);
    setSelectedId(data[0]?.id ?? null);
  };

  const activePreview: StudentRecord = {
    id: selectedRecord?.id ?? "preview",
    personalDetails: form.personalDetails,
    subjects: form.subjects,
    totalMarks,
    sgpa,
    createdAt: new Date().toISOString(),
  };

  if (!currentUser) {
    return (
      <main className="mx-auto mt-12 max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">Admin Login</h1>
        <p className="mb-4 text-sm text-slate-600">Use Firebase Authentication credentials.</p>
        <form onSubmit={onLogin} className="space-y-3">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button className="w-full rounded-md bg-slate-900 px-3 py-2 font-semibold text-white">
            Login
          </button>
        </form>
      </main>
    );
  }

  if (ADMIN_EMAIL && currentUser.email !== ADMIN_EMAIL) {
    return (
      <main className="mx-auto mt-10 max-w-xl rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="font-semibold text-red-700">
          Access denied. Logged in user is not the configured admin account.
        </p>
        <button
          type="button"
          className="mt-3 rounded-md bg-red-600 px-4 py-2 text-white"
          onClick={onLogout}
        >
          Logout
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marksheet Admin Dashboard</h1>
          <p className="text-sm text-slate-600">Create, edit, and download print-ready marksheets.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <PdfGeneratorButton
            filename={`${form.personalDetails.rollNumber || "marksheet"}-${form.personalDetails.semester}.pdf`}
          />
          <MarksheetHdPngButton
            filename={`${form.personalDetails.rollNumber || "marksheet"}-${form.personalDetails.semester}`}
            scale={4}
          />
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[430px_minmax(0,1fr)]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Student Details</h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Marksheet template</p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTemplateSide("front")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activeTemplateSide === "front"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                Front Side
              </button>
              <button
                type="button"
                onClick={() => setActiveTemplateSide("back")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activeTemplateSide === "back"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                Back Side
              </button>
              <button
                type="button"
                onClick={() => setActiveTemplateSide("provisional")}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  activeTemplateSide === "provisional"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                Provisional Certificate
              </button>
            </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Default semester templates
              </p>
              <p className="mb-2 text-sm font-medium text-slate-800">
                {activePresetSemester != null
                  ? `Showing: ${adminSemesterLabel(activePresetSemester)}`
                  : "Showing: Saved student (no template label)"}
              </p>
              <p className="mb-2 text-xs text-slate-600">
                Load a preset, then edit any field. Saving stores the current form, not the template name.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: ADMIN_SEMESTER_COUNT }, (_, index) => {
                  const sem = (index + 1) as AdminSemesterNumber;
                  const active = activePresetSemester === sem;
                  return (
                    <button
                      key={sem}
                      type="button"
                      onClick={() => applySemesterPreset(sem)}
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-slate-900 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Semester {sem}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["candidateName", "Candidate Name"],
                  ["enrollmentNumber", "Enrollment Number"],
                  ["rollNumber", "Roll Number"],
                  ["motherName", "Mother's Name"],
                  ["fatherName", "Father's Name"],
                  ["semester", "Semester"],
                  ["branch", "Branch"],
                  ["examDate", "Exam Date"],
                  ["statementNumber", "Statement Number"],
                  ["issueDate", "Issue Date"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="text-xs font-semibold text-slate-600">
                  {label}
                  <input
                    className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm font-normal"
                    value={form.personalDetails[key]}
                    onChange={(event) => updatePersonal(key, event.target.value)}
                    required
                  />
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white"
                onClick={() => addSubject("Theory")}
              >
                + Theory
              </button>
              <button
                type="button"
                className="rounded-md bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white"
                onClick={() => addSubject("Practical")}
              >
                + Practical
              </button>
            </div>

            <div className="max-h-[380px] space-y-2 overflow-y-auto pr-1">
              {form.subjects.map((subject, index) => (
                <div key={subject.id} className="rounded-lg border border-slate-200 p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-700">
                      {index + 1}. {subject.type}
                    </p>
                    <button
                      type="button"
                      className="text-xs font-semibold text-red-600"
                      onClick={() => removeSubject(subject.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        ["code", "Code"],
                        ["name", "Name"],
                        ["credits", "Credits"],
                        ["maxIE", "Max IE"],
                        ["maxESE", "Max ESE"],
                        ["maxTotal", "Max Total"],
                        ["obtainedIE", "Obt IE"],
                        ["obtainedESE", "Obt ESE"],
                        ["obtainedTotal", "Obt Total"],
                        ["grade", "Grade"],
                      ] as const
                    ).map(([key, label]) => (
                      <label key={key} className="text-[11px] font-semibold text-slate-500">
                        {label}
                        <input
                          className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
                          value={subject[key]}
                          onChange={(event) => updateSubject(subject.id, key, event.target.value)}
                        />
                      </label>
                    ))}
                    <label className="text-[11px] font-semibold text-slate-500">
                      Status
                      <select
                        className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
                        value={subject.status}
                        onChange={(event) => updateSubject(subject.id, "status", event.target.value)}
                      >
                        <option value="Pass">Pass</option>
                        <option value="Fail">Back (Fail)</option>
                        <option value="GracePass">GPass (grace)</option>
                        <option value="Dash">-- (e.g. TEP)</option>
                      </select>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-md bg-slate-50 p-2 text-sm font-semibold text-slate-700">
              Total Marks: {totalMarks.toFixed(2)} | SGPA: {sgpa.toFixed(2)}
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
            >
              {saving ? "Saving..." : selectedRecord ? "Update Student" : "Save Student"}
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-lg font-bold text-slate-900">Saved Students</h2>
            <div className="max-h-56 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500">
                    <th className="py-1">Name</th>
                    <th className="py-1">Roll No.</th>
                    <th className="py-1">SGPA</th>
                    <th className="py-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t border-slate-100">
                      <td className="py-1.5">{student.personalDetails.candidateName}</td>
                      <td className="py-1.5">{student.personalDetails.rollNumber}</td>
                      <td className="py-1.5">{student.sgpa.toFixed(2)}</td>
                      <td className="py-1.5">
                        <button
                          type="button"
                          className="mr-2 text-xs font-semibold text-blue-600"
                          onClick={() => onEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-red-600"
                          onClick={() => onDelete(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="flex min-w-0 justify-center">
              {activeTemplateSide === "back" ? (
                <MarksheetBackTemplate />
              ) : activeTemplateSide === "provisional" ? (
                <ProvisionalCertificateTemplate record={activePreview} />
              ) : (
                <MarksheetTemplate record={activePreview} />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
