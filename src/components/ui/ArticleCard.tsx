import { Calendar } from "lucide-react";
import Image from "next/image";

export interface NewsArticle {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
}

export interface MonthlyUpdateProps {
  articles: NewsArticle[];
}
export interface ArticleCardProps {
  article: NewsArticle;
  imagePosition: "left" | "right";
}

function ArticleCard({ article, imagePosition }: ArticleCardProps) {
  const { date, title, excerpt, imageSrc, imageAlt } = article;

  const ImageSection = () => (
    <div className="w-full lg:w-1/2 relative">
      <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>
    </div>
  );

  const ContentSection = () => (
    <div className="w-full lg:w-1/2 lg:px-8 py-6">
      {/* Date */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
        <Calendar className="w-4 h-4" />
        <span>{date}</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 text-base leading-relaxed mb-6">{excerpt}</p>

      {/* Read More Button */}
      <button className="text-gray-900 font-medium hover:text-orange-500 transition-colors duration-200 border-b border-gray-300 hover:border-orange-500 pb-1">
        Read more
      </button>
    </div>
  );

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row">
        {imagePosition === "left" ? (
          <>
            <ImageSection />
            <ContentSection />
          </>
        ) : (
          <>
            <ContentSection />
            <ImageSection />
          </>
        )}
      </div>
    </article>
  );
}
