'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleCreateNote = async (title: string, content: string ) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/note`;
        
        if (!title) {
            alert("Title is required");
            return;
        }

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                title,
                content,
            }),
        });

        if (res.ok) {
            router.refresh();
        }
    }

  return (
    <form
        className="flex flex-col items-center border border-gray-700 rounded-lg shadow-lg p-4 m-4"
        onSubmit={(e) => {
            e.preventDefault();
            handleCreateNote(
                title,
                content,
            );
        }}
    >
        <input 
            type="text" 
            placeholder="Title" 
            className="bg-gray-700 text-white rounded-lg px-2 py-1 mt-4"
            autoFocus    
            onChange={(e) => setTitle(e.target.value)}
            name="title"
        />
        <textarea 
            placeholder="Content" 
            className="bg-gray-700 text-white rounded-lg px-2 py-1 mt-4"
            onChange={(e) => setContent(e.target.value)}
            name="content"
        ></textarea>
        <button
            type="submit"
            className="bg-green-500 text-white text-sm rounded-lg px-2 py-1 mt-4 cursor-pointer"
        >
            Save
        </button>
    </form>
  )
}

export default NoteForm;