const BlogPostSkeleton = () => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="relative aspect-video md:col-span-1">
          <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="md:col-span-3">
          <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
