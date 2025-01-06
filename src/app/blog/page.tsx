// blog/page.tsx
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import { format } from "date-fns";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { Suspense } from "react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Force static rendering
export const dynamic = "force-static";

interface Post {
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  mainImage: SanityImageSource;
  publishedAt: string;
  excerpt: string;
  author: {
    name: string;
  };
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "author": author->name
    }`,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ["blog-posts"],
      },
    }
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
      <Link href={`/blog/${post.slug.current}`}>
        <div className="grid md:grid-cols-4 gap-4">
          {post.mainImage && (
            <div className="relative aspect-video md:col-span-1">
              <Image
                src={urlForImage(post.mainImage).url()}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          )}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              {post.title}
            </h2>
            <div className="text-gray-700 mb-4">
              {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
              {post.author && ` • ${post.author.name}`}
            </div>
            <p className="text-gray-800">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Blog</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostGrid posts={posts} />
      </Suspense>
    </div>
  );
}

export const revalidate = 3600;

// Removed export const runtime = 'edge' since we can't use it with generateStaticParams
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}
