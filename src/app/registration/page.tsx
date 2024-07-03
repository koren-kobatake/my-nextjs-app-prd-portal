import { RegistrationForm } from "@/components/Registration/RegistrationForm"

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">登録</h1>
      <RegistrationForm />
    </div>
  )
}
