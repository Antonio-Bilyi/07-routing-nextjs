"use client"

import css from "./NotePreview.module.css"
import { fetchNoteById } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";


interface NotePreviewClientProps {
    id: string;
}

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    const closeModal = () => router.back;

    if (isLoading) return  <Modal onClose={closeModal}>Loading, please wait...</Modal>     ;
    if (error) return <Modal onClose={closeModal}>Something went wrong.</Modal>;
    if (!data) return <Modal onClose={closeModal}>No note found</Modal>;
    

    return (
        <Modal onClose={closeModal}>
            <div className={css.container}>
                <button className={css.backBtn}>Back</button>
                <h2>{data.title}</h2>
                <div className={css.item}>
                    <p className={css.content}>{data.content}</p>
                    <p className={css.tag}>{data.tag}</p>
                    <p className={css.date}>
                        Created at: {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </Modal>
    )

}

export default NotePreviewClient;