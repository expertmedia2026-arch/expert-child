export type SchoolStatusLabel = "Active" | "Pending" | "Paused";

export type DirectorySchoolRecord = {
  id: string;
  name: string;
  motto: string;
  state: string;
  lga: string;
  city: string;
  logo: string;
  pupils: number;
  users: number;
  status: SchoolStatusLabel;
};

const statusLabels = {
  ACTIVE: "Active",
  PENDING: "Pending",
  PAUSED: "Paused",
} as const;

export const schoolStatusValues = {
  Active: "ACTIVE",
  Pending: "PENDING",
  Paused: "PAUSED",
} as const;

export function schoolStatusLabel(status: keyof typeof statusLabels): SchoolStatusLabel {
  return statusLabels[status];
}
