import { fetchNotes, FetchNotesResponse } from "@/lib/api"
import NotesClient from "./Notes.client"


interface NotesProps {
    params: Promise<{ slug: string[] }>;
}

export default async function Notes({params}: NotesProps) {
    const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];


    const initialPage = 1;
    const initialQuery = "";

    const initialData: FetchNotesResponse = await fetchNotes(initialPage, initialQuery);


    return <NotesClient initialPage={initialPage} initialData={initialData} initialQuery="" tag={tag}/>
}