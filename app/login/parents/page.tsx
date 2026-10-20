import { SignInForm } from "@/components/sign-in-form";

export const metadata = {
  title: "Parents login — Expert Child",
};

export default function ParentsLoginPage() {
  return (
    <SignInForm
      eyebrow="Parents"
      title="Parents login"
      description="Sign in with the guardian account linked to your child."
      accent="parents"
      nextHref="/parent"
    />
  );
}
