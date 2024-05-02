import { Search } from 'lucide-react'
import React from 'react'

export default function SearchBar() {
  return (
    <div className="hidden items-center gap-x-2 rounded-md bg-zinc-100 px-3.5 py-1.5 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 md:flex">
      <Search className="h-4 w-4" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400 md:flex-1"
      />
    </div>
  )
}
