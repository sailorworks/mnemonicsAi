import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { format } from "date-fns";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  author: {
    name: string;
  };
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  publishedAt: string;
  body: Array<{
    _type: "block";
    children: Array<{
      _type: "span";
      text: string;
    }>;
  }>;
}

async function getPost(slug: string): Promise<Post | null> {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage{
      asset->{
        url
      },
      alt
    },
    publishedAt,
    body,
    "author": author->{
      name
    }
  }`;

  return client.fetch(query, { slug });
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) {
    notFound();
    return null;
  }

  const post = await getPost(slug);

  if (!post) {
    notFound();
    return null;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 mt-20">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
      <div className="text-gray-700 mb-8">
        {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
        {post.author && ` • ${post.author.name}`}
      </div>
      {post.mainImage && (
        <div className="relative aspect-video mb-8">
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || "Post image"}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      <div className="prose max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }`;

  const slugs = await client.fetch<Array<{ slug: string }>>(query);

  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}
