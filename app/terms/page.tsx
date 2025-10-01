export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#212121] px-4 py-12 text-white dark">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
        <div className="prose prose-invert">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="mt-8 text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Nelson-GPT, you accept and agree to be bound by the terms and provision of this
            agreement.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">2. Use License</h2>
          <p>
            Permission is granted to temporarily use Nelson-GPT for personal, non-commercial transitory viewing only.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">3. Medical Disclaimer</h2>
          <p>
            Nelson-GPT is an AI assistant and should not replace professional medical advice. Always consult with
            qualified healthcare professionals for medical decisions.
          </p>
        </div>
      </div>
    </div>
  )
}
