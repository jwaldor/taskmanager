"use client"

import type { Theme } from "@/app/tasks"
import useTaskStore from '../tasks'
import { ChromePicker } from 'react-color'
import { useState } from 'react'

export default function Theme() {
  const { themes, createTheme, editTheme, editingTheme } = useTaskStore()
  const [showPicker, setShowPicker] = useState<string | null>(null)

  const handleColorChange = (color: string, property: keyof Theme) => {
    if (editingTheme) {
      editTheme({ [property]: color })
    }
  }

  return (
    <div className="w-full h-full overflow-auto p-4">
      {editingTheme && (
        <div className="space-y-4">
          {Object.entries(editingTheme).map(([key, value]) => (
            key !== "name" && key !== "secondary" && key !== "id" && (
              <div key={key} className="relative">
                <div
                  className="flex items-center gap-4 p-3 border rounded cursor-pointer"
                  onClick={() => setShowPicker(showPicker === key ? null : key)}
                >
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: value }}
                  />
                  <span className="capitalize">{key}: {value}</span>
                </div>

                {showPicker === key && (
                  <div className="absolute z-10 mt-2">
                    <ChromePicker
                      color={value}
                      onChange={(color) => handleColorChange(color.hex, key as keyof Theme)}
                    />
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
}