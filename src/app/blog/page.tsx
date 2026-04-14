// blog/page.tsx
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Suspense } from "react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import BlogList from "./BlogList";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Force dynamic rendering
export const dynamic = "force-dynamic";

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


// PostCard and PostGrid logic moved to BlogList.tsx


export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="relative flex-grow pt-24 pb-12">
        {/* Dynamic Background */}
        <div className="absolute inset-0 -z-10 bg-background fixed">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        </div>

        <Suspense fallback={<div className="text-center py-20">Loading posts...</div>}>
          <BlogList posts={posts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export const revalidate = 3600;

