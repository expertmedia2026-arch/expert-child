import "server-only";

import { connection } from "next/server";
import type { SchoolStatus } from "@prisma/client";
import { schoolStatusLabel, type DirectorySchoolRecord } from "@/lib/directory-school";
import { prisma } from "@/lib/prisma";

export async function listSchools(): Promise<DirectorySchoolRecord[]> {
  await connection();
  const schools = await prisma.school.findMany({
    orderBy: { createdAt: "desc" },
    include: { users: { select: { role: true } } },
  });
  return schools.map(toDirectorySchool);
}

export async function createSchool(input: {
  name: string;
  motto: string;
  state: string;
  lga: string;
  city: string;
  logo: string;
  status: SchoolStatus;
}): Promise<DirectorySchoolRecord> {
  const school = await prisma.school.create({
    data: {
      name: input.name,
      motto: input.motto,
      state: input.state,
      lga: input.lga,
      city: input.city,
      logoUrl: input.logo || null,
      status: input.status,
    },
    include: { users: { select: { role: true } } },
  });
  return toDirectorySchool(school);
}

export async function updateSchool(input: {
  id: string;
  name: string;
  motto: string;
  state: string;
  lga: string;
  city: string;
  logo: string;
  status: SchoolStatus;
}): Promise<DirectorySchoolRecord> {
  const school = await prisma.school.update({
    where: { id: input.id },
    data: {
      name: input.name,
      motto: input.motto,
      state: input.state,
      lga: input.lga,
      city: input.city,
      logoUrl: input.logo || null,
      status: input.status,
    },
    include: { users: { select: { role: true } } },
  });
  return toDirectorySchool(school);
}

export async function deleteSchool(id: string) {
  await prisma.school.delete({ where: { id } });
}

function toDirectorySchool(school: {
  id: string;
  name: string;
  motto: string;
  state: string;
  lga: string;
  city: string;
  logoUrl: string | null;
  status: SchoolStatus;
  users: { role: string }[];
}): DirectorySchoolRecord {
  return {
    id: school.id,
    name: school.name,
    motto: school.motto,
    state: school.state,
    lga: school.lga,
    city: school.city,
    logo: school.logoUrl ?? "",
    pupils: school.users.filter((user) => user.role === "PARENT").length,
    users: school.users.length,
    status: schoolStatusLabel(school.status),
  };
}
