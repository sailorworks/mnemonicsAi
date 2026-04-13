"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

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

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Our Blog
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Insights, updates, and tips for mastering your memory.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.article
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <Link href={`/blog/${post.slug.current}`} className="flex-1 flex flex-col">
              {post.mainImage && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={urlForImage(post.mainImage).url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                  </time>
                  {post.author && (
                    <>
                      <span>•</span>
                      <span>{post.author.name}</span>
                    </>
                  )}
                </div>
                <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-primary font-medium text-sm mt-auto">
                  Read Article
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
