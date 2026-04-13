"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is triggered through the hook
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you're looking for..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white dark:bg-slate-800 dark:border-slate-700"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600"
            >
              <SearchIcon size={24} />
            </button>
          </div>
        </form>

        {/* Empty State */}
        {!query && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Start typing to search for products
            </p>
          </div>
        )}

        {/* Search Results Placeholder */}
        {query && (
          <div className="space-y-4">
            <p className="text-gray-600">
              Searching for: <strong>{query}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
