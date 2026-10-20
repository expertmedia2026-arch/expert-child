import "server-only";

import { connection } from "next/server";
import type { UserRole, UserStatus } from "@prisma/client";
import {
  directoryRole,
  directoryStatus,
  type DirectorySchool,
  type DirectoryUser,
} from "@/lib/directory-user";
import { prisma } from "@/lib/prisma";

export async function listDirectory(): Promise<{
  users: DirectoryUser[];
  schools: DirectorySchool[];
}> {
  await connection();

  const [users, schools] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { school: { select: { name: true } } },
    }),
    prisma.school.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return {
    users: users.map(toDirectoryUser),
    schools,
  };
}

export async function createDirectoryUser(input: {
  surname: string;
  otherNames: string;
  email: string;
  phone: string;
  avatar: string;
  schoolId: string | null;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
}): Promise<DirectoryUser> {
  const user = await prisma.user.create({
    data: {
      surname: input.surname,
      otherNames: input.otherNames,
      email: input.email,
      phone: input.phone,
      passwordHash: input.passwordHash,
      avatarUrl: input.avatar || null,
      schoolId: input.schoolId,
      role: input.role,
      status: input.status,
    },
    include: { school: { select: { name: true } } },
  });

  return toDirectoryUser(user);
}

export async function updateDirectoryUser(input: {
  id: string;
  surname: string;
  otherNames: string;
  email: string;
  phone: string;
  avatar: string;
  schoolId: string | null;
  passwordHash?: string;
  role: UserRole;
  status: UserStatus;
}): Promise<DirectoryUser> {
  const user = await prisma.user.update({
    where: { id: input.id },
    data: {
      surname: input.surname,
      otherNames: input.otherNames,
      email: input.email,
      phone: input.phone,
      avatarUrl: input.avatar || null,
      schoolId: input.schoolId,
      ...(input.passwordHash ? { passwordHash: input.passwordHash } : {}),
      role: input.role,
      status: input.status,
    },
    include: { school: { select: { name: true } } },
  });

  return toDirectoryUser(user);
}

export async function deleteDirectoryUser(id: string) {
  await prisma.user.delete({ where: { id } });
}

function toDirectoryUser(user: {
  id: string;
  surname: string;
  otherNames: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  schoolId: string | null;
  role: UserRole;
  status: UserStatus;
  school: { name: string } | null;
}): DirectoryUser {
  return {
    id: user.id,
    surname: user.surname,
    otherNames: user.otherNames,
    email: user.email,
    phone: user.phone,
    avatar: user.avatarUrl ?? "",
    schoolId: user.schoolId ?? "",
    school: user.school?.name ?? "",
    role: directoryRole(user.role),
    status: directoryStatus(user.status),
  };
}
