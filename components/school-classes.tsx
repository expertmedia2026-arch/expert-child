"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SchoolClass = {
  id: string;
  name: string;
  teachers: string[];
};

const starter: SchoolClass[] = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"].map((name, index) => ({
  id: `class-${index + 1}`,
  name,
  teachers: [],
}));

const fieldClass =
  "mt-1 w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white";

export function SchoolClasses() {
  const [classes, setClasses] = useState(starter);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [teachers, setTeachers] = useState([""]);

  function closeModal() {
    setOpen(false);
    setEditingId(null);
    setName("");
    setTeachers([""]);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function openAdd() {
    setEditingId(null);
    setName("");
    setTeachers([""]);
    setOpen(true);
  }

  function openEdit(item: SchoolClass) {
    setEditingId(item.id);
    setName(item.name);
    setTeachers(item.teachers.length > 0 ? item.teachers : [""]);
    setOpen(true);
  }

  function saveClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const className = name.trim();
    if (!className) return;
    const nextTeachers = teachers.map((teacher) => teacher.trim()).filter(Boolean);
    if (editingId) {
      setClasses((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, name: className, teachers: nextTeachers } : item,
        ),
      );
    } else {
      setClasses((current) => [
        { id: `class-${Date.now()}`, name: className, teachers: nextTeachers },
        ...current,
      ]);
    }
    closeModal();
  }

  function deleteClass(id: string) {
    setClasses((current) => current.filter((item) => item.id !== id));
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
      <div className="flex flex-col gap-3 border-b border-[#1c1412]/8 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Manage Classes</h2>
          <p className="text-xs text-[#8a756d]">Riverside Primary · {classes.length} classes</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="shrink-0 rounded-full bg-[#e10600] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#c40500]"
        >
          Add Class
        </button>
      </div>
      <ul>
        {classes.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 border-t border-[#1c1412]/6 px-4 py-3 first:border-t-0"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium">{item.name}</p>
              {item.teachers.length > 0 ? (
                <p className="mt-0.5 text-xs text-[#6d5c56]">{item.teachers.join(", ")}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => openEdit(item)}
                className="rounded-full border border-[#1c1412]/10 px-3 py-1.5 text-xs font-semibold text-[#1c1412] hover:bg-[#f4efe8]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => deleteClass(item.id)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#e10600] hover:bg-[#fdeceb]"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1412]/45"
              onClick={closeModal}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-class-title"
                className="max-h-[calc(100vh-2rem)] w-[80%] overflow-y-auto rounded-3xl bg-white p-5 text-[#1c1412] shadow-[0_24px_60px_-30px_rgba(28,20,18,0.6)] sm:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a33b32] uppercase">Classes</p>
                    <h2 id="add-class-title" className="mt-1 text-xl font-semibold tracking-tight">
                      {editingId ? "Edit Class" : "Add Class"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close"
                    className="grid size-8 place-items-center rounded-full text-[#6d5c56] hover:bg-[#f4efe8]"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={saveClass} className="mt-5 grid gap-4">
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Class name</span>
                    <input
                      required
                      autoFocus
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Year 1"
                      className={fieldClass}
                    />
                  </label>

                  <fieldset>
                    <legend className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">Teacher</legend>
                    <div className="mt-1 space-y-2">
                      {teachers.map((teacher, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            value={teacher}
                            onChange={(event) =>
                              setTeachers((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? event.target.value : item,
                                ),
                              )
                            }
                            placeholder="Teacher name"
                            aria-label={`Teacher ${index + 1}`}
                            className="w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white"
                          />
                          {index === teachers.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => setTeachers((current) => [...current, ""])}
                              aria-label="Add teacher"
                              className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e10600] text-lg font-semibold text-white hover:bg-[#c40500]"
                            >
                              +
                            </button>
                          ) : (
                            <span className="size-10 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-full px-3.5 py-2 text-sm font-semibold text-[#6d5c56] hover:bg-[#f4efe8]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-[#e10600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c40500]"
                    >
                      {editingId ? "Save changes" : "Save class"}
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
