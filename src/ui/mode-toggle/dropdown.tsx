"use client"

import { DropdownMenu } from "@medusajs/ui"
import { VariantProps } from "class-variance-authority"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils/cn"
import { Button } from "@/ui/button"

export interface ModeToggleDropdownProps {
  className?: string
  size?: VariantProps<typeof Button>["size"]
  align?: VariantProps<typeof DropdownMenu.Content>["align"]
}

const ModeToggleDropdown = ({
  className,
  size = "icon",
  align = "start",
}: ModeToggleDropdownProps) => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="default"
          size={size}
          className={cn("aspect-square", className)}
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align={align}
        className="z-[999] bg-card shadow-elevation-card-hover *:bg-inherit"
      >
        <DropdownMenu.Item onClick={() => setTheme("light")}>
          Light
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme("system")}>
          System
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

export default ModeToggleDropdown
