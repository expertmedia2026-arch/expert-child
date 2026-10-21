"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireExpertAdmin } from "@/lib/auth";
import { schoolStatusValues, type DirectorySchoolRecord, type SchoolStatusLabel } from "@/lib/directory-school";
import { createSchool, deleteSchool, updateSchool } from "@/lib/directory-schools";

export async function saveSchool(input: {
  id?: string;
  name: string;
  motto: string;
  state: string;
  lga: string;
  city: string;
  logo: string;
  status: SchoolStatusLabel;
}): Promise<{ ok: true; school: DirectorySchoolRecord } | { ok: false; message: string }> {
  const name = input.name.trim();
  const motto = input.motto.trim();
  const state = input.state.trim();
  const lga = input.lga.trim();
  const city = input.city.trim();

  if (!name || !motto || !state || !lga || !city) {
    return { ok: false, message: "Fill in every field before saving." };
  }

  await requireExpertAdmin();

  const data = {
    name,
    motto,
    state,
    lga,
    city,
    logo: input.logo,
    status: schoolStatusValues[input.status],
  };

  try {
    const school = input.id ? await updateSchool({ id: input.id, ...data }) : await createSchool(data);
    revalidatePath("/expert-admin/schools");
    revalidatePath("/expert-admin/users");
    return { ok: true, school };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return { ok: false, message: "That school is no longer in the directory." };
    }
    return { ok: false, message: "The school could not be saved." };
  }
}

export async function removeSchool(id: string): Promise<{ ok: true } | { ok: false; message: string }> {
  await requireExpertAdmin();
  try {
    await deleteSchool(id);
    revalidatePath("/expert-admin/schools");
    revalidatePath("/expert-admin/users");
    return { ok: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return { ok: false, message: "That school is no longer in the directory." };
    }
    return { ok: false, message: "The school could not be deleted." };
  }
}
