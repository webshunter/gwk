import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token, // Add the token for authentication
  useCdn: false, // Set to false for write operations
  perspective: 'published', // Use published perspective for read operations
})

// Create a separate client for write operations
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: 'raw', // Use raw perspective for write operations
})
