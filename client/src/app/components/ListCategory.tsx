"use client";

import axios from "axios";
import Link from "next/link"; // Import for routing
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  // Add other properties as per your schema
}

export default function ListCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the list of categories.
   */
  const fetchCategories = async () => {
    setError(null); // Clear previous errors

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:3333/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCategories(response.data); // Update categories state with fetched data
      } else {
        setError("Failed to fetch categories. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("An error occurred while fetching categories.");
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Category List</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-lg">
        {categories.length > 0 ? (
          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category.id} className="border-b p-4">
                <Link href={`/product/create?categoryId=${category.id}`}>
                  <h3 className="text-xl font-semibold cursor-pointer hover:text-blue-500">
                    {category.name}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
}
