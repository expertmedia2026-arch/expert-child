"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { removeDirectoryUser, saveDirectoryUser } from "@/app/expert-admin/users/actions";
import type {
  DirectoryFormRole,
  DirectoryRole,
  DirectorySchool,
  DirectoryStatus,
  DirectoryUser,
} from "@/lib/directory-user";

function displayName(user: Pick<DirectoryUser, "surname" | "otherNames">) {
  return `${user.otherNames} ${user.surname}`.trim();
}

const roles: DirectoryFormRole[] = ["School admin", "expert-admin"];
const statuses: DirectoryStatus[] = ["Active", "Invited", "Paused"];
const filters = ["All", "School admin", "expert-admin", "Invited"] as const;

const statusTone: Record<DirectoryStatus, string> = {
  Active: "bg-[#e7f6ee] text-[#1f7a4d]",
  Invited: "bg-[#fff4d6] text-[#9a6700]",
  Paused: "bg-[#fde8ea] text-[#9f1239]",
};

const emptyForm = {
  surname: "",
  otherNames: "",
  email: "",
  phone: "",
  avatar: "",
  schoolId: "",
  role: "expert-admin" as DirectoryRole,
  status: "Invited" as DirectoryStatus,
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white";

export function UsersDirectory({
  users: initialUsers,
  schools,
}: {
  users: DirectoryUser[];
  schools: DirectorySchool[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return users.filter((user) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Invited" ? user.status === "Invited" : user.role === filter);
      const matchesQuery =
        needle.length === 0 ||
        displayName(user).toLowerCase().includes(needle) ||
        user.email.toLowerCase().includes(needle) ||
        user.phone.toLowerCase().includes(needle) ||
        user.school.toLowerCase().includes(needle);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query, users]);

  function closeModal() {
    setOpen(false);
    setEditingId(null);
    setSaving(false);
    setError("");
    setForm(emptyForm);
  }

  function openAdd() {
    setEditingId(null);
    setError("");
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(user: DirectoryUser) {
    setEditingId(user.id);
    setError("");
    setForm({
      surname: user.surname,
      otherNames: user.otherNames,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      schoolId: user.role === "expert-admin" ? "" : user.schoolId,
      role: user.role,
      status: user.status,
    });
    setOpen(true);
  }

  function onAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, avatar: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  }

  async function addUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const result = await saveDirectoryUser(editingId ? { ...form, id: editingId } : form);
    setSaving(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setUsers((current) =>
      editingId
        ? current.map((item) => (item.id === result.user.id ? result.user : item))
        : [result.user, ...current],
    );
    setFilter("All");
    setQuery("");
    closeModal();
  }

  async function deleteUser(id: string) {
    setDeletingId(id);
    setNotice("");
    const result = await removeDirectoryUser(id);
    setDeletingId(null);
    if (!result.ok) {
      setNotice(result.message);
      return;
    }
    setUsers((current) => current.filter((item) => item.id !== id));
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
      <div className="flex flex-col gap-3 border-b border-[#1c1412]/8 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Users</h2>
          <p className="text-xs text-[#8a756d]">
            {visible.length} of {users.length} shown
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="rounded-full bg-[#e10600] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#c40500]"
        >
          Add user
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Search users</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, or school"
            className="w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white"
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                filter === item
                  ? "bg-[#1c1412] text-white"
                  : "bg-[#f4efe8] text-[#6d5c56] hover:bg-[#efe7df]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {notice ? <p className="px-4 pt-3 text-sm text-[#e10600]">{notice}</p> : null}

      {visible.length === 0 ? (
        <p className="px-4 py-8 text-sm text-[#6d5c56]">No users match that search.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">School</th>
                <th className="px-4 py-2 font-semibold">Role</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((user) => (
                <tr key={user.id} className="border-t border-[#1c1412]/6">
                  <td className="px-4 py-2.5 font-medium">
                    <span className="inline-flex items-center gap-2">
                      {user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.avatar} alt="" className="size-7 rounded-full object-cover" />
                      ) : null}
                      {displayName(user)}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{user.email}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{user.school}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{user.role}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(user)}
                        className="rounded-full border border-[#1c1412]/10 px-3 py-1.5 text-xs font-semibold text-[#1c1412] hover:bg-[#f4efe8]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteUser(user.id)}
                        disabled={deletingId === user.id}
                        className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#e10600] hover:bg-[#fdeceb] disabled:opacity-60"
                      >
                        {deletingId === user.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1412]/45"
              onClick={closeModal}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-user-title"
                className="max-h-[calc(100vh-2rem)] w-[80%] overflow-y-auto rounded-3xl bg-white p-5 text-[#1c1412] shadow-[0_24px_60px_-30px_rgba(28,20,18,0.6)] sm:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a33b32] uppercase">
                      Users
                    </p>
                    <h2 id="add-user-title" className="mt-1 text-xl font-semibold tracking-tight">
                      {editingId ? "Edit User" : "Add New User"}
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

                <form onSubmit={addUser} className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="col-span-2 flex justify-center">
                    <label className="grid size-24 cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-[#1c1412]/25 bg-[#faf7f4] text-center">
                      {form.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.avatar} alt="" className="size-full object-cover" />
                      ) : (
                        <span className="px-2 text-[10px] font-semibold tracking-wide text-[#8a756d] uppercase">
                          Upload avatar
                        </span>
                      )}
                      <input type="file" accept="image/*" className="sr-only" onChange={onAvatar} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Surname
                    </span>
                    <input
                      required
                      autoFocus
                      value={form.surname}
                      onChange={(event) => setForm((current) => ({ ...current, surname: event.target.value }))}
                      placeholder="Surname"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Other names
                    </span>
                    <input
                      required
                      value={form.otherNames}
                      onChange={(event) => setForm((current) => ({ ...current, otherNames: event.target.value }))}
                      placeholder="Other names"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="name@email.com"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Phone number
                    </span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                      placeholder="08000000000"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Role
                    </span>
                    <select
                      value={form.role}
                      onChange={(event) => {
                        const role = event.target.value as DirectoryRole;
                        setForm((current) => ({
                          ...current,
                          role,
                          schoolId: role === "expert-admin" ? "" : current.schoolId,
                        }));
                      }}
                      className={fieldClass}
                    >
                      {(roles as readonly DirectoryRole[]).includes(form.role)
                        ? roles.map((role) => (
                            <option key={role}>{role}</option>
                          ))
                        : [form.role, ...roles].map((role) => (
                            <option key={role}>{role}</option>
                          ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      School
                    </span>
                    <select
                      required={form.role !== "expert-admin"}
                      disabled={form.role === "expert-admin"}
                      value={form.role === "expert-admin" ? "" : form.schoolId}
                      onChange={(event) => setForm((current) => ({ ...current, schoolId: event.target.value }))}
                      className={`${fieldClass} disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <option value="">Select school</option>
                      {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Status
                    </span>
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, status: event.target.value as DirectoryStatus }))
                      }
                      className={fieldClass}
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                  {error ? (
                    <p className="col-span-2 text-sm text-[#e10600]">{error}</p>
                  ) : null}
                  <div className="col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-full px-3.5 py-2 text-sm font-semibold text-[#6d5c56] hover:bg-[#f4efe8]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-full bg-[#e10600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c40500] disabled:opacity-60"
                    >
                      {saving ? "Saving…" : editingId ? "Save changes" : "Save user"}
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
