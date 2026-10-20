export type DirectoryRole = "School admin" | "expert-admin" | "Teacher" | "Bursar" | "Parent";
export type DirectoryStatus = "Active" | "Invited" | "Paused";
export type DirectoryFormRole = "School admin" | "expert-admin";

export type DirectoryUser = {
  id: string;
  surname: string;
  otherNames: string;
  email: string;
  phone: string;
  avatar: string;
  schoolId: string;
  school: string;
  role: DirectoryRole;
  status: DirectoryStatus;
};

export type DirectorySchool = {
  id: string;
  name: string;
};

const roleLabels = {
  EXPERT_ADMIN: "expert-admin",
  SCHOOL_ADMIN: "School admin",
  TEACHER: "Teacher",
  BURSAR: "Bursar",
  PARENT: "Parent",
} as const;

const statusLabels = {
  ACTIVE: "Active",
  INVITED: "Invited",
  PAUSED: "Paused",
} as const;

export const formRoleValues = {
  "expert-admin": "EXPERT_ADMIN",
  "School admin": "SCHOOL_ADMIN",
  Teacher: "TEACHER",
  Bursar: "BURSAR",
  Parent: "PARENT",
} as const;

export const formStatusValues = {
  Active: "ACTIVE",
  Invited: "INVITED",
  Paused: "PAUSED",
} as const;

export function directoryRole(role: keyof typeof roleLabels): DirectoryRole {
  return roleLabels[role];
}

export function directoryStatus(status: keyof typeof statusLabels): DirectoryStatus {
  return statusLabels[status];
}
