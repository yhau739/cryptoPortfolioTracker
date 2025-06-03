"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface TimeframeSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

export function TimeframeSelector({ value, onValueChange }: TimeframeSelectorProps) {
  return (
    <div className="flex items-center justify-end">
      <ToggleGroup type="single" value={value} onValueChange={onValueChange}>
        <ToggleGroupItem value="7d" aria-label="Toggle 7 days view">
          7D
        </ToggleGroupItem>
        <ToggleGroupItem value="30d" aria-label="Toggle 30 days view">
          30D
        </ToggleGroupItem>
        <ToggleGroupItem value="ytd" aria-label="Toggle year to date view">
          YTD
        </ToggleGroupItem>
        <ToggleGroupItem value="all" aria-label="Toggle all time view">
          All
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
