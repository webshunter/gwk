/**
 * Cleanup Script: Remove 'content' field from all template documents
 * 
 * Run: node cleanup-content-field.mjs
 */

import {createClient} from '@sanity/client'

// Update these values from your .env.local or sanity.config.ts
const client = createClient({
  projectId: 'oc4l0kkr', // Update this with your actual project ID
  dataset: 'production', // Update this with your actual dataset
  apiVersion: '2024-01-15',
  token: process.env.SANITY_API_WRITE_TOKEN || '', // Will prompt for manual entry
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
    console.error('\n💡 Tip: Make sure SANITY_API_WRITE_TOKEN is set in your environment')
    process.exit(1)
  }
}

cleanupContentField()