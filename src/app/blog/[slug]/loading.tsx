export default function Loading() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="relative aspect-video mb-8">
        <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-4 w-full bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    </article>
  );
}
