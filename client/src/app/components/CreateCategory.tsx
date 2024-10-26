"use client";

import axios from "axios";
import { useRouter } from "next/navigation"; // Use 'next/navigation' in app directory
import { useState } from "react";

export default function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3333/category",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Category created:", response.data);
        setSuccess("Category created successfully!");
        setName("");
        router.push("category/list"); // Redirect after creation
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Error details:", err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
            "Failed to create category. Please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a New Category
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-xs italic mb-4">{success}</p>
          )}
          <input
            type="text"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}
