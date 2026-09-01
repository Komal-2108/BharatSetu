"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Calendar, User, ArrowRight, Compass } from "lucide-react";
import { SEED_MOCK_DATA, BlogPostData } from "@/lib/mockData";

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Vendor Spotlight", "Travel Tips", "Festival Guide", "Platform Updates"];

  const posts = SEED_MOCK_DATA.blogPosts.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER */}
      <div className="bg-sand/60 dark:bg-card-dark rounded-3xl p-8 sm:p-10 border-2 border-border dark:border-border-dark shadow-warm dark:shadow-darkCard space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-terracotta-light dark:bg-terracotta/20 text-terracotta dark:text-terracotta-glow px-4 py-1.5 rounded-full text-xs font-bold border border-terracotta/30">
          <BookOpen className="w-4 h-4" /> Travel Journal & Heritage Stories
        </div>

        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-charcoal dark:text-white">
          Stories of Bharat
        </h1>

        <p className="text-charcoal-light/80 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Local host spotlights, pilgrimage tips, festival guides, and stories straight from India&apos;s sacred towns.
        </p>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-terracotta text-white shadow-warm scale-105"
                  : "bg-white dark:bg-sand-dark text-charcoal dark:text-gray-300 border border-border dark:border-border-dark hover:border-terracotta"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BLOG POSTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group bg-white dark:bg-card-dark rounded-3xl border-2 border-border dark:border-border-dark overflow-hidden shadow-warm dark:shadow-darkCard flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
          >
            <div>
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden bg-sand dark:bg-sand-dark">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-charcoal/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-charcoal-light/60 dark:text-gray-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-terracotta" /> {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-charcoal dark:text-white group-hover:text-terracotta transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-charcoal-light/80 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-terracotta dark:text-terracotta-glow border-t border-border/60 dark:border-border-dark mt-4 pt-3">
              <span>Read Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
