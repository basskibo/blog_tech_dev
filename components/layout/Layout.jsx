import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => (
   <>
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20">
         {children}
      </main>
      <Footer />
   </>
)

export default Layout
