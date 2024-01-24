import NoteForm from "@/components/NoteForm";
import { Note as NoteProp } from "@prisma/client";
import prisma from "@/libs/prisma";
import Note from "@/components/Note";

export default async function HomePage() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div
      className="flex flex-col items-center min-h-screen py-2 text-center bg-gray-800 text-white pt-6"
    >
      <NoteForm />
      {
        notes.map((note: NoteProp) => (
          <Note 
            key={note.id}
            note={note}             
          />
        ))
      }
    </div>
  )
}