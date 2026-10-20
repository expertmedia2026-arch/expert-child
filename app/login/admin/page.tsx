import { Suspense } from "react";
import { SignInForm } from "@/components/sign-in-form";
import { signInAdmin } from "@/app/login/admin/actions";

export const metadata = {
  title: "Admin login — Expert Child",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <AdminLogin searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message =
    error === "role"
      ? "Only an active expert admin can open this dashboard."
      : error === "credentials"
        ? "Email or password is incorrect."
        : error === "config"
          ? "Sign-in is not configured yet."
          : undefined;

  return (
    <SignInForm
      eyebrow="Admin"
      title="Admin login"
      description="Sign in with your expert admin account."
      accent="admin"
      action={signInAdmin}
      error={message}
    />
  );
}
