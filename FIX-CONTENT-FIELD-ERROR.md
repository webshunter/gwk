# Fix "Unknown field found: content" Error

## Problem
Sanity Studio menampilkan error:
```
Unknown field found: content
Encountered a field that is not defined in the schema.
```

Dan juga error:
```
Runtime Error: Attempted to patch a read-only document
```

## Root Cause
Field `content` sudah dihapus dari schema `template`, tapi masih ada di existing documents di Sanity database.

## Solution: Clean Up via Sanity Studio

### Method 1: Using Vision Plugin (Recommended)

1. **Buka Sanity Studio**
   ```
   http://localhost:3000/studio
   ```

2. **Klik "Vision" di menu**
   (Plugin untuk menjalankan GROQ queries)

3. **Paste query ini:**
   ```groq
   *[_type == "template" && defined(content)] {
     _id,
     title,
     content
   }
   ```

4. **Klik "Fetch"** untuk melihat documents yang punya field `content`

5. **Untuk setiap document yang muncul:**
   - Buka document tersebut di studio
   - Klik menu "⋮" (three dots)
   - Pilih "Inspect"
   - Klik "JSON" tab
   - Hapus field `content` dari JSON
   - Klik "Save"

### Method 2: Manual via Document Inspector

1. **Buka Sanity Studio**
2. **Go to Pages** (template documents)
3. **Untuk setiap page:**
   - Buka page
   - Klik "⋮" menu
   - Pilih "Inspect"
   - Switch ke "JSON" tab
   - Cari dan hapus field `content`
   - Save

### Method 3: Using API Script

Jika ada banyak documents, gunakan script:

```bash
# Set environment variable
export SANITY_API_WRITE_TOKEN="your-write-token-here"

# Run cleanup
node cleanup-content-field.mjs
```

**Cara dapatkan Write Token:**
1. Go to https://sanity.io/manage
2. Pilih project Anda
3. Go to "API" → "Tokens"
4. Create new token dengan "Write" permission
5. Copy token

## Verification

Setelah cleanup:
1. Refresh Sanity Studio
2. Buka page yang sebelumnya error
3. Verify tidak ada error "Unknown field found"
4. Verify bisa edit dan save page

## Prevention

Untuk menghindari error ini di masa depan:
- Setiap kali menghapus field dari schema, clean up existing documents
- Atau gunakan schema migrations untuk automated cleanup

## Related Files

- `src/sanity/schemaTypes/template.ts` - Schema definition (content field sudah dihapus)
- `cleanup-content-field.mjs` - Automated cleanup script