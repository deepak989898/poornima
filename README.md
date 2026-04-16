# Poornima University Marksheet Generator

Full-stack Next.js application for creating, saving, editing, and exporting university-style marksheets (PDF) with Firebase and `html2pdf.js`.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Firebase Auth + Firestore + Storage
- html2pdf.js for A4 PDF export

## Features

- Secure admin login through Firebase Authentication
- Dynamic student + subject entry form (Theory/Practical)
- Auto calculation of total marks and SGPA
- Save, edit, delete marksheets in Firestore (`students` collection)
- Pixel-styled marksheet preview inspired by uploaded sample
- Watermark in the center of the marksheet
- Grade-based colors (A+/A green, C orange, etc.)
- Download high-quality print-ready PDF

## Firebase Setup

1. Create a Firebase project.
2. Enable **Authentication > Email/Password**.
3. Add one admin user in Authentication.
4. Enable **Cloud Firestore** (production/test as preferred).
5. Enable **Storage**.
6. Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

7. Set `NEXT_PUBLIC_ADMIN_EMAIL` to your admin login email.

## Firestore Structure

Collection: `students`

- `personalDetails` (object)
- `subjects` (array)
- `totalMarks` (number)
- `sgpa` (number)
- `createdAt` (timestamp)

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Production Notes

- Restrict Firestore/Storage rules to authenticated admin users.
- For stronger role validation, use Firebase custom claims or server-side route handlers.
- You can replace `public/university-watermark.png` with a transparent university logo for even better visual match.
