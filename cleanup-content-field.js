/**
 * Cleanup Script: Remove 'content' field from all template documents
 * 
 * This script removes the deprecated 'content' field from all template documents in Sanity.
 * Run this script to fix the "Unknown field found" error.
 */

const sanityClient = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Read .env.local file
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const envVars = {}

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const client = sanityClient.createClient({
  projectId: envVars.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: envVars.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-15',
  token: envVars.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function cleanupContentField() {
  console.log('🔍 Fetching documents with content field...')
  
  try {
    // Fetch all template documents that have a content field
    const documents = await client.fetch(
      `*[_type == "template" && defined(content)] {
        _id,
        title,
        "hasContent": defined(content)
      }`
    )

    console.log(`Found ${documents.length} documents with content field`)

    if (documents.length === 0) {
      console.log('✅ No documents to clean up!')
      return
    }

    console.log('\n📋 Documents to clean:')
    documents.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.title} (${doc._id})`)
    })

    console.log('\n🧹 Cleaning up...')

    // Remove content field from each document
    for (const doc of documents) {
      await client
        .patch(doc._id)
        .unset(['content'])
        .commit()
      
      console.log(`✅ Cleaned: ${doc.title}`)
    }

    console.log('\n✨ All done! Content field removed from all documents.')
    console.log('🔄 Please refresh Sanity Studio.')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

cleanupContentField()