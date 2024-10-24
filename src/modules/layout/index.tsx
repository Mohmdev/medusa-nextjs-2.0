// Metadata generation is handled by the layout route in the app router and not here.
// Keep metadata only in layout.tsx

import Footer from '@/modules/layout/templates/footer/v0'
import Header from '@/modules/layout/templates/header/v1'
import React from 'react'

const LayoutTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default LayoutTemplate
