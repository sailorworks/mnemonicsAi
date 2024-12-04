import Image from "next/image";

export default function TrialPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative w-96 h-96 mx-auto mb-8">
          <Image
            src="/chill-guy.webp"
            alt="Chill guy"
            width={384}
            height={384}
            className="rounded-full object-cover"
          />
        </div>
        <p className="text-xl text-gray-700 leading-relaxed">
          Just a chill page. Join my discord, there are 100+ paid users sharing,
          growing and learning. For more details contact{" "}
          <a
            href="https://x.com/sailorworks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800"
          >
            @sailorworks
          </a>{" "}
        </p>
      </div>
    </div>
  );
}
