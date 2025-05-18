import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PillProps {
  icon?: LucideIcon
  label: string
  variant?: "default" | "outline" | "secondary" | "destructive"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Pill({ icon: Icon, label, variant = "default", size = "md", className }: PillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        {
          "bg-primary text-primary-foreground": variant === "default",
          "border border-input bg-background": variant === "outline",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "bg-destructive text-destructive-foreground": variant === "destructive",
          "text-xs px-2 py-0.5": size === "sm",
          "text-sm px-2.5 py-0.5": size === "md",
          "text-base px-3 py-1": size === "lg",
        },
        className,
      )}
    >
      {Icon && (
        <Icon
          className={cn("mr-1", { "h-3 w-3": size === "sm", "h-4 w-4": size === "md", "h-5 w-5": size === "lg" })}
        />
      )}
      {label}
    </div>
  )
}
