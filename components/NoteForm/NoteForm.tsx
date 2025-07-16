"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { useState } from "react";
import css from "./NoteForm.module.css";
import { useStore } from "../../lib/store/noteStore";

export default function NoteForm() {
  const draft = useStore((state) => state.draft);
  const setDraft = useStore((state) => state.setDraft);
  const clearDraft = useStore((state) => state.clearDraft);

  const queryClient = useQueryClient();
  const [mutationError, setMutationError] = useState<string | null>(null);
  const router = useRouter();

  const [wasTitleTouched, setWasTitleTouched] = useState(false);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  }

    const { mutate, isPending } = useMutation({
      mutationFn: createNote,
      onSuccess: () => {
        clearDraft();
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        setMutationError(null);
        router.push("/notes/filter/All");
      },
      onError: (error) => {
        console.error("Note creation failed:", error);
        setMutationError("Failed to create note. Please try again.");
      },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(draft);
    };

    return (
      <form onSubmit={handleSubmit} className={css.form}>
        {mutationError && (
          <div className={css.mutationError}>{mutationError}</div>
        )}
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            minLength={3}
            maxLength={50}
            className={css.input}
            value={draft.title}
            onChange={(e) => {
              handleChange(e);
              setWasTitleTouched(true);
            }}
            required
          />
          {wasTitleTouched && draft.title.length < 3 && (
            <span className={css.error}>Title too short</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            value={draft.content}
            className={css.textarea}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            name="tag"
            id="tag"
            className={css.select}
            value={draft.tag}
            onChange={handleChange}
            required
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={() => router.back()}
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create note
          </button>
        </div>
      </form>
    );
  }

