import * as React from "react"
import { cn } from "@/app/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-earth-600 text-white hover:bg-earth-700",
    secondary: "border-transparent bg-earth-200 text-earth-900 hover:bg-earth-300",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-earth-950 border-earth-300 dark:text-earth-100 dark:border-earth-700",
  }
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }