"use client";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 p-2">
      <h1 className="text-4xl sm:text-6xl font-bold transition-transform transform hover:scale-105">
        Welcome to Task Management Dashboard
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-gray-700">
        Manage your tasks with ease. Please log in to get started.
      </p>
    </div>
  );
}
