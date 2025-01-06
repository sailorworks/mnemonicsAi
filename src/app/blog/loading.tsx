import BlogPostSkeleton from "../components/BlogPostSkeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <BlogPostSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
