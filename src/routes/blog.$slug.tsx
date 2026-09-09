import { createFileRoute } from "@tanstack/react-router";
import BlogPostPage from "@/pages/BlogPost";
import { getBlogPost } from "@/data/blogPosts";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    return buildHead({
      page: "blog",
      lang: "en",
      path: `/blog/${params.slug}`,
      title: post?.metaTitle,
      description: post?.metaDescription,
      ogType: "article",
    });
  },
  component: BlogPostPage,
});
