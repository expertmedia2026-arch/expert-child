"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import nigeriaLgas from "@/data/nigeria-lgas.json";

type SchoolStatus = "Active" | "Pending" | "Paused";

type School = {
  id: string;
  name: string;
  motto: string;
  state: string;
  lga: string;
  city: string;
  logo: string;
  pupils: number;
  users: number;
  status: SchoolStatus;
};

const lgasByState = nigeriaLgas as Record<string, string[]>;
const states = Object.keys(lgasByState).sort((a, b) => a.localeCompare(b, "en"));

function stateLabel(state: string) {
  return state === "Nassarawa" ? "Nasarawa" : state;
}

const starterSchools: School[] = [
  { id: "riverside", name: "Riverside Primary", motto: "", state: "Lagos", lga: "Ikeja", city: "Lagos", logo: "", pupils: 486, users: 18, status: "Active" },
  { id: "hillcrest", name: "Hillcrest Academy", motto: "", state: "Federal Capital Territory", lga: "Municipal", city: "Abuja", logo: "", pupils: 732, users: 24, status: "Active" },
  { id: "greenfield", name: "Greenfield School", motto: "", state: "Rivers", lga: "Port Harcourt", city: "Port Harcourt", logo: "", pupils: 214, users: 6, status: "Pending" },
  { id: "st-marys", name: "St. Mary's", motto: "", state: "Oyo", lga: "Ibadan North", city: "Ibadan", logo: "", pupils: 358, users: 15, status: "Active" },
  { id: "oakbridge", name: "Oakbridge", motto: "", state: "Enugu", lga: "Enugu North", city: "Enugu", logo: "", pupils: 141, users: 4, status: "Paused" },
  { id: "cedar-lane", name: "Cedar Lane", motto: "", state: "Kano", lga: "Kano Municipal", city: "Kano", logo: "", pupils: 403, users: 11, status: "Active" },
  { id: "bright-path", name: "Bright Path", motto: "", state: "Edo", lga: "Oredo", city: "Benin", logo: "", pupils: 96, users: 3, status: "Pending" },
];

const filters = ["All", "Active", "Pending", "Paused"] as const;
const statuses: SchoolStatus[] = ["Active", "Pending", "Paused"];

const statusTone: Record<SchoolStatus, string> = {
  Active: "bg-[#e7f6ee] text-[#1f7a4d]",
  Pending: "bg-[#fff4d6] text-[#9a6700]",
  Paused: "bg-[#fde8ea] text-[#9f1239]",
};

const emptyForm = {
  name: "",
  motto: "",
  state: "",
  lga: "",
  city: "",
  logo: "",
  status: "Pending" as SchoolStatus,
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white";

export function SchoolsDirectory() {
  const [schools, setSchools] = useState(starterSchools);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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
    return schools.filter((school) => {
      const matchesStatus = filter === "All" || school.status === filter;
      const matchesQuery =
        needle.length === 0 ||
        school.name.toLowerCase().includes(needle) ||
        school.city.toLowerCase().includes(needle);
      return matchesStatus && matchesQuery;
    });
  }, [filter, query, schools]);

  function closeModal() {
    setOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(school: School) {
    setEditingId(school.id);
    setForm({
      name: school.name,
      motto: school.motto,
      state: school.state,
      lga: school.lga,
      city: school.city,
      logo: school.logo,
      status: school.status,
    });
    setOpen(true);
  }

  function onLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, logo: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  }

  function addSchool(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const motto = form.motto.trim();
    const city = form.city.trim();
    if (!name || !motto || !form.state || !form.lga || !city) return;

    setSchools((current) => {
      if (editingId) {
        return current.map((school) =>
          school.id === editingId
            ? {
                ...school,
                name,
                motto,
                state: form.state,
                lga: form.lga,
                city,
                logo: form.logo,
                status: form.status,
              }
            : school,
        );
      }
      return [
        {
          id: `${name}-${city}-${current.length}`,
          name,
          motto,
          state: form.state,
          lga: form.lga,
          city,
          logo: form.logo,
          pupils: 0,
          users: 0,
          status: form.status,
        },
        ...current,
      ];
    });
    setFilter("All");
    setQuery("");
    closeModal();
  }

  function deleteSchool(id: string) {
    setSchools((current) => current.filter((school) => school.id !== id));
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#1c1412]/8 bg-white">
      <div className="flex flex-col gap-3 border-b border-[#1c1412]/8 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Schools</h2>
          <p className="text-xs text-[#8a756d]">
            {visible.length} of {schools.length} shown
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="rounded-full bg-[#e10600] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#c40500]"
        >
          Add school
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
        <label className="min-w-0 flex-1">
          <span className="sr-only">Search schools</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by school or city"
            className="w-full rounded-xl border border-[#1c1412]/10 bg-[#faf7f4] px-3 py-2 text-sm outline-none focus:border-[#e10600] focus:bg-white"
          />
        </label>
        <div className="flex gap-1.5">
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

      {visible.length === 0 ? (
        <p className="px-4 py-8 text-sm text-[#6d5c56]">No schools match that search.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[#faf7f4] text-xs tracking-wide text-[#6d5c56] uppercase">
              <tr>
                <th className="px-4 py-2 font-semibold">School</th>
                <th className="px-4 py-2 font-semibold">City</th>
                <th className="px-4 py-2 font-semibold">Pupils</th>
                <th className="px-4 py-2 font-semibold">Users</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((school) => (
                <tr key={school.id} className="border-t border-[#1c1412]/6">
                  <td className="px-4 py-2.5 font-medium">{school.name}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{school.city}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{school.pupils.toLocaleString("en-GB")}</td>
                  <td className="px-4 py-2.5 text-[#6d5c56]">{school.users}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone[school.status]}`}
                    >
                      {school.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(school)}
                        className="rounded-full border border-[#1c1412]/10 px-3 py-1.5 text-xs font-semibold text-[#1c1412] hover:bg-[#f4efe8]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSchool(school.id)}
                        className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#e10600] hover:bg-[#fdeceb]"
                      >
                        Delete
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
                aria-labelledby="add-school-title"
                className="max-h-[calc(100vh-2rem)] w-[80%] overflow-y-auto rounded-3xl bg-white p-5 text-[#1c1412] shadow-[0_24px_60px_-30px_rgba(28,20,18,0.6)] sm:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a33b32] uppercase">
                      Schools
                    </p>
                    <h2 id="add-school-title" className="mt-1 text-xl font-semibold tracking-tight">
                      {editingId ? "Edit School" : "Add New School"}
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

                <form onSubmit={addSchool} className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="col-span-2 flex justify-center">
                    <label className="grid size-24 cursor-pointer place-items-center overflow-hidden rounded-full border border-dashed border-[#1c1412]/25 bg-[#faf7f4] text-center">
                      {form.logo ? (
                        // Local preview of the file the user just picked.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.logo} alt="" className="size-full object-cover" />
                      ) : (
                        <span className="px-2 text-[10px] font-semibold tracking-wide text-[#8a756d] uppercase">
                          Upload logo
                        </span>
                      )}
                      <input type="file" accept="image/*" className="sr-only" onChange={onLogo} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      School name
                    </span>
                    <input
                      required
                      autoFocus
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="School name"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Motto
                    </span>
                    <input
                      required
                      value={form.motto}
                      onChange={(event) => setForm((current) => ({ ...current, motto: event.target.value }))}
                      placeholder="School motto"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      State
                    </span>
                    <select
                      required
                      value={form.state}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, state: event.target.value, lga: "" }))
                      }
                      className={fieldClass}
                    >
                      <option value="">Select state</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {stateLabel(state)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Local government
                    </span>
                    <select
                      required
                      value={form.lga}
                      disabled={!form.state}
                      onChange={(event) => setForm((current) => ({ ...current, lga: event.target.value }))}
                      className={`${fieldClass} disabled:opacity-60`}
                    >
                      <option value="">Select local government</option>
                      {(lgasByState[form.state] ?? []).map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      City
                    </span>
                    <input
                      required
                      value={form.city}
                      onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
                      placeholder="City"
                      className={fieldClass}
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold tracking-wide text-[#5c4b45] uppercase">
                      Status
                    </span>
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, status: event.target.value as SchoolStatus }))
                      }
                      className={fieldClass}
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </label>
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
                      className="rounded-full bg-[#e10600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c40500]"
                    >
                      {editingId ? "Save changes" : "Save school"}
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
