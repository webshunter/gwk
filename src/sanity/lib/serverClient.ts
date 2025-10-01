import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, token } from "../env"

if (process.env.NODE_ENV !== "production") {
  console.info("Sanity client initialized", {
    projectId,
    dataset,
    apiVersion,
    hasToken: Boolean(token),
  })
}

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})
