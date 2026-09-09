import { createFileRoute } from "@tanstack/react-router";
import BlogPostPage from "@/pages/BlogPost";
import { getBlogPost } from "@/data/blogPosts";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    return buildHead({
      page: "blog",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: `/blog/${params.slug}`,
      title: post?.metaTitle,
      description: post?.metaDescription,
      ogType: "article",
    });
  },
  component: BlogPostPage,
});
