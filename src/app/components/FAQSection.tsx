import { FAQList } from "./FAQList"; // Import the new client component

// This is a Server Component (no "use client")
const FAQSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* This static text will be translated on the server */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Everything you need to know about using MnemonicsAI
          </p>
        </div>

        {/* Render the interactive client component here */}
        <FAQList />
      </div>
    </div>
  );
};

export default FAQSection;
