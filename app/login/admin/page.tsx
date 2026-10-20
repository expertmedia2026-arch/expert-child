import { SignInForm } from "@/components/sign-in-form";

export const metadata = {
  title: "Admin login — Expert Child",
};

export default function AdminLoginPage() {
  return (
    <SignInForm
      eyebrow="Admin"
      title="Admin login"
      description="Sign in with your school staff account."
      accent="admin"
      nextHref="/expert-admin"
    />
  );
}
