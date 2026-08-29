import { createFileRoute } from "@tanstack/react-router";
import BlogPostPage from "@/pages/BlogPost";
import { getBlogPost } from "@/data/blogPosts";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    const title = post?.metaTitle ?? "Article – CartoFM Blog";
    const description =
      post?.metaDescription ??
      "Read stories and guides about world radio culture and music discovery on the CartoFM blog.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `https://cartofm.com/blog/${params.slug}` }],
    };
  },
  component: BlogPostPage,
});
