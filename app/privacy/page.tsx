export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#212121] px-4 py-12 text-white dark">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
        <div className="prose prose-invert">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="mt-8 text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when using Nelson-GPT, including messages and interactions
            with the assistant.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, and to protect Nelson-GPT
            and our users.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">3. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
            access, disclosure, alteration, and destruction.
          </p>
        </div>
      </div>
    </div>
  )
}
