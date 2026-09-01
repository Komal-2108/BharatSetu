"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Compass, Share2 } from "lucide-react";
import { SEED_MOCK_DATA } from "@/lib/mockData";
import ServiceCard from "@/components/ServiceCard";

export default function BlogPostDetailPage() {
  const params = useParams();
  const postId = params?.id as string;

  const post = SEED_MOCK_DATA.blogPosts.find((p) => p.id === postId) || SEED_MOCK_DATA.blogPosts[0];
  const relatedService = post.relatedServiceId
    ? SEED_MOCK_DATA.services.find((s) => s.id === post.relatedServiceId)
    : SEED_MOCK_DATA.services[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-charcoal dark:text-gray-200 hover:text-terracotta transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Journal Stories
      </Link>

      {/* ARTICLE HEADER */}
      <div className="space-y-4">
        <span className="inline-block bg-terracotta-light dark:bg-terracotta/20 text-terracotta dark:text-terracotta-glow text-xs font-bold px-3 py-1 rounded-full border border-terracotta/30">
          {post.category}
        </span>

        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-charcoal dark:text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-charcoal-light/70 dark:text-gray-400 border-b border-border dark:border-border-dark pb-6">
          <span className="font-semibold text-charcoal dark:text-white flex items-center gap-1">
            <User className="w-4 h-4 text-terracotta" /> By {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {post.readTime}
          </span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
      </div>

      {/* COVER IMAGE */}
      <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden bg-sand dark:bg-card-dark border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* ARTICLE BODY */}
      <div className="prose dark:prose-invert max-w-none text-charcoal-light/90 dark:text-gray-200 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line font-sans">
        {post.body}
      </div>

      {/* RELATED SERVICE CROSS-LINKING CARD */}
      {relatedService && (
        <div className="pt-10 border-t-2 border-dashed border-border dark:border-border-dark space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-charcoal dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-terracotta" /> Experience Featured in this Story
            </h3>
            <span className="text-xs text-charcoal-light/60 dark:text-gray-400">Verified Local Host</span>
          </div>

          <div className="max-w-md">
            <ServiceCard service={relatedService as any} />
          </div>
        </div>
      )}

    </div>
  );
}
