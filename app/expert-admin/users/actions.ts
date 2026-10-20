"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  formRoleValues,
  formStatusValues,
  type DirectoryRole,
  type DirectoryStatus,
  type DirectoryUser,
} from "@/lib/directory-user";
import { createDirectoryUser, deleteDirectoryUser, updateDirectoryUser } from "@/lib/directory-users";

export async function saveDirectoryUser(input: {
  id?: string;
  surname: string;
  otherNames: string;
  email: string;
  phone: string;
  avatar: string;
  schoolId: string;
  role: DirectoryRole;
  status: DirectoryStatus;
}): Promise<{ ok: true; user: DirectoryUser } | { ok: false; message: string }> {
  const surname = input.surname.trim();
  const otherNames = input.otherNames.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const expertAdmin = input.role === "expert-admin";
  const schoolId = expertAdmin ? null : input.schoolId.trim();

  if (!surname || !otherNames || !email || !phone || (!expertAdmin && !schoolId)) {
    return { ok: false, message: "Fill in every field before saving." };
  }

  const data = {
    surname,
    otherNames,
    email,
    phone,
    avatar: input.avatar,
    schoolId,
    role: formRoleValues[input.role],
    status: formStatusValues[input.status],
  };

  try {
    const user = input.id
      ? await updateDirectoryUser({ id: input.id, ...data })
      : await createDirectoryUser(data);
    revalidatePath("/expert-admin/users");
    return { ok: true, user };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, message: "A user with that email already exists." };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
      return { ok: false, message: "Choose a school from the list." };
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return { ok: false, message: "That user is no longer in the directory." };
    }
    return { ok: false, message: "The user could not be saved." };
  }
}

export async function removeDirectoryUser(
  id: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await deleteDirectoryUser(id);
    revalidatePath("/expert-admin/users");
    return { ok: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return { ok: false, message: "That user is no longer in the directory." };
    }
    return { ok: false, message: "The user could not be deleted." };
  }
}
