"use client";

import { useActionState } from "react";
import {  createCategoryAction } from "@/lib/blog/actions";

const initialState = {
  success: false,
  error: "",
};


function SubmitButton() {
  return (
    <button
      type="submit"
      className="
        inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
        text-sm font-semibold bg-indigo-600 hover:bg-indigo-500
        text-white transition-colors
      "
    >
      Create Category
    </button>
  );
}

export default function CreateCategoriesPage() {
  const [state, formAction] = useActionState(
    createCategoryAction,
    initialState
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
    <div className="max-w-xl mx-auto rounded-2xl border border-slate-700 bg-[#0d1117] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Create Blog Category
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Create categories for organizing blog posts.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-300"
          >
            Category Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Technology"
            className="
              mt-2 w-full rounded-xl border border-slate-700
              bg-slate-900 px-4 py-2.5 text-sm text-white
              placeholder:text-slate-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {state?.error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            Category created successfully.
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
    </div>
  );
}