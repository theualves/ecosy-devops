import Image from "next/image";

import { LoginForm } from "@/features/auth/LoginForm";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[url('/images/login-bg.svg')] bg-cover bg-center p-4">
      <LoginForm />
    </div>
  );
}
