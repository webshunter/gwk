import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, token } from "../env"

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})
