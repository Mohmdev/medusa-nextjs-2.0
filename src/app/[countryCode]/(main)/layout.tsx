import React from "react"
import { Metadata } from "next"
import { getBaseURL } from "@/lib/utils/env"
import Footer from "@/modules/layout/templates/footer"
import Nav from "@/modules/layout/templates/nav"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}
