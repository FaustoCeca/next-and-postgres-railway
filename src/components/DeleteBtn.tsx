'use client'
import { useRouter } from "next/navigation";

interface DeleteBtnProps {
  id: number;
}

const DeleteBtn = ({ id }: DeleteBtnProps) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/note/${id}`;
    
    const res = await fetch(url, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <div
        className="bg-red-500 text-white text-sm rounded-lg px-2 py-1 mt-4 cursor-pointer"
        onClick={() => handleDelete(id)}
    >
        Delete 
    </div>
  )
}

export default DeleteBtn;