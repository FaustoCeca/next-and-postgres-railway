import { NextResponse, NextRequest } from "next/server";
import prisma  from '@/libs/prisma'

interface Params {
    params: {
        id: string
    }
}

export async function GET(req: NextRequest, { params }: Params) {
    const { id } = params;

    const note = await prisma.note.findFirst({
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json(note);
}

export async function PUT(req: NextRequest, { params }: Params) {
    const { id } = params;
    const body = await req.json();
    const { title, content } = body;

    const updatedNote = await prisma.note.update({
        data: {
            title,
            content
        },
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json(updatedNote);
}

export async function DELETE(req: NextRequest, { params }: Params) {
    const { id } = params;

    const deletedNote = await prisma.note.delete({
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json(deletedNote);
}