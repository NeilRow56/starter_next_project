import { ServerIcon } from 'lucide-react'

export default function PanelHeader() {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-gray-200 px-6 py-2">
      <div className="flex items-center gap-1 text-sm">
        <ServerIcon className="h-4 w-4 shrink-0" />
        <span>Services</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full border bg-background text-xs shadow-sm ">
          11
        </span>
      </div>
    </div>
  )
}
