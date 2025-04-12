"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
 
export const ThemeModeToggle = () => {
  const { theme, setTheme } = useTheme()

  const darkMode = theme === 'dark';
  const toggleDarkMode = () => 
  {
    setTheme(darkMode ? 'light' : 'dark');
  }

  return (
    <Button variant="ghost" onClick={() => toggleDarkMode()}>
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}