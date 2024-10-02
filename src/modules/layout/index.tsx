// Metadata generation is handled by the layout route in the app router and not here.
// Keep metadata only in layout.tsx

import Footer from '@/modules/layout/footer'
import Header from '@/modules/layout/header'
import React from 'react'

const LayoutTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <section
        aria-label="Page Content"
        className="relative z-20 grid grid-flow-row"
      >
        {children}
      </section>
      <Footer className="" />
    </>
  )
}

export default LayoutTemplate
