import { Metadata } from 'next'
import { ThemeProvider } from '@/ui/theme-provider'
import { getBaseURL } from '@/lib/util/env'
import '@/styles/base.css'
import '@/styles/utilities.css'
import '@/styles/components.css'
import '@/styles/custom.css'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="dark">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          <main className="relative grid min-h-screen grid-rows-[max-content_1fr_max-content]">
            {props.children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
