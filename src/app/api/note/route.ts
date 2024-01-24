import { NextResponse, NextRequest } from "next/server";
import prisma  from '@/libs/prisma'

export async function GET() {
    const notes = await prisma.note.findMany();
    
    return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { title, content } = body;

    const newNote = await prisma.note.create({
        data: {
            title,
            content
        }
    });

    return NextResponse.json(newNote)
}