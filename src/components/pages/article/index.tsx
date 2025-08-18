"use client"; // Diperlukan karena menggunakan hooks (useState, useEffect)

import { useState, useEffect } from "react";
import NewsCard from "@/components/ui/NewsCard";
import Pagination from "@/components/ui/Pagination";

interface Article {
  id: number;
  title: string;
}

const dummyApiResponse = {
  articles: [{ id: 1, title: "MERIAHKAN LIBUR NYEPI DAN LEBARAN..." }],
  totalPages: 27,
};

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setArticles(dummyApiResponse.articles);
    setTotalPages(dummyApiResponse.totalPages);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="bg-gray-100 py-16 px-4 mt-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Monthly Update
            </h2>
            <p className="text-gray-500 text-lg">📰 News and Articles</p>
          </div>
        </div>
      </section>

      <div className="px-10 mt-10 space-y-8">
        {articles.map((article) => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
