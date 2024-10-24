import React from 'react'

import Footer from '@/modules/layout/templates/footer/v1'
import Header from '@/modules/layout/templates/header/v2'

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
