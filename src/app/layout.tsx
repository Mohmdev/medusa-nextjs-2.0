import type React from "react"
import { Metadata } from "next"
import { ThemeProvider } from "@/lib/context/theme-provider"
import { getBaseURL } from "@/lib/utils/env"
import "../styles/base.css"
import "../styles/components.css"
import "../styles/custom.css"
import "../styles/utilities.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          // disableTransitionOnChange
        >
          <main className="relative min-h-screen">{props.children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
