import React from "react"
import { Metadata } from "next"
import { getBaseURL } from "@/lib/utils/env"
import LayoutTemplate from "@/modules/layout"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return <LayoutTemplate>{props.children}</LayoutTemplate>
}
