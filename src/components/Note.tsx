'use client'

import { Note } from '@prisma/client';
import DeleteBtn from './DeleteBtn';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface NoteProps {
    note: Note;
}

const Note = ({ note }: NoteProps) => {
    const router = useRouter();
    const [updateMode, setUpdateMode] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleUpdate = async (id: number, title: string, content: string) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`;


        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                title: title ? title : note.title,
                content: content,
            }),
        });

        if (res.ok) {
            router.refresh();
        }
    }


  return (
            <div 
              key={note.id}
              className="flex items-center flex-col border border-gray-700 rounded-lg shadow-lg p-4 m-4 w-96"
            >
                {
                    updateMode ? (
                        <form
                            className="flex flex-col items-center"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdate(
                                    Number(note.id),
                                    title,
                                    content,
                                );
                                setUpdateMode(false);
                            }}
                        >
                            <input 
                                type="text" 
                                placeholder="Title" 
                                className="bg-gray-700 text-white rounded-lg px-2 py-1 mt-4"
                                autoFocus    
                                name="title"
                                defaultValue={note.title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea 
                                placeholder="Content" 
                                className="bg-gray-700 text-white rounded-lg px-2 py-1 mt-4"
                                name="content"
                                defaultValue={note.content || ''}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-green-500 text-white text-sm rounded-lg px-2 py-1 mt-4 cursor-pointer"
                            >
                                Update
                            </button>
                        </form>
                    ) : (
                        <>
                            <h1>{note.title}</h1>
                            <p>{note.content}</p>
                        </>
                    )
                }

              <DeleteBtn 
                id={Number(note.id)}
              />
                <div
                    className="bg-green-500 text-white text-sm rounded-lg px-2 py-1 mt-4 cursor-pointer"
                    onClick={() => setUpdateMode(true)}
                    style={{ display: updateMode ? "none" : "block" }}
                >
                    Update
                </div>
            </div>
  )
}

export default Note;