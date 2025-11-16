import { ExamplesList } from "./ExamplesList"; // Import the new client component

// This is a Server Component (no "use client")
const ExamplesSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* This static text will be translated on the server */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            See MnemonicsAI in Action
          </h2>
          <p className="mt-4 text-gray-600">
            Discover how our AI transforms complex information into memorable
            mnemonics
          </p>
        </div>

        {/* Render the interactive client component here */}
        <ExamplesList />
      </div>
    </div>
  );
};

export default ExamplesSection;
