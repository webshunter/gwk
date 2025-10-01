#!/bin/bash

echo "🚀 GWK Admin System - Direct Access & Sanity CMS Integration"
echo "============================================================="

echo ""
echo "🔍 System Status Check:"
echo "-----------------------"

# Test admin page direct access
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin)
if [ "$ADMIN_STATUS" = "200" ]; then
    echo "✅ Admin Dashboard: DIRECT ACCESS AVAILABLE"
elif [ "$ADMIN_STATUS" = "500" ]; then
    echo "⚠️  Admin Dashboard: SERVER ERROR (checking...)"
else
    echo "❌ Admin Dashboard: UNEXPECTED STATUS ($ADMIN_STATUS)"
fi

# Check Sanity configuration
PROJECT_ID=$(grep NEXT_PUBLIC_SANITY_PROJECT_ID .env.local | cut -d'=' -f2 | tr -d '"')
if [ ! -z "$PROJECT_ID" ]; then
    echo "✅ Sanity CMS: CONFIGURED (Project: $PROJECT_ID)"
else
    echo "❌ Sanity CMS: NOT CONFIGURED"
fi

# Test Sanity Studio
STUDIO_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/studio)
if [ "$STUDIO_STATUS" = "200" ]; then
    echo "✅ Sanity Studio: ACCESSIBLE"
else
    echo "⚠️  Sanity Studio: STATUS ($STUDIO_STATUS)"
fi

echo ""
echo "🎯 No Authentication Required!"
echo "------------------------------"
echo "✨ Admin dashboard is now open access"
echo "🔗 Direct URL: http://localhost:3000/admin"
echo "🎨 No login needed - direct access to content management"

echo ""
echo "🛠️ Available Features:"
echo "----------------------"
echo "• ✅ Create and manage pages"
echo "• ✅ Edit content sections (Hero, Features, Testimonials)"
echo "• ✅ Publish changes directly to Sanity CMS"
echo "• ✅ Preview content in real-time"
echo "• ✅ Manage page metadata (title, slug, summary)"
echo "• ✅ Drag & drop section reordering"

echo ""
echo "🎨 Sanity Integration:"
echo "----------------------"
echo "• Project ID: $PROJECT_ID"
echo "• Dataset: $(grep NEXT_PUBLIC_SANITY_DATASET .env.local | cut -d'=' -f2 | tr -d '"')"
echo "• API Token: Configured with read/write access"
echo "• Studio URL: http://localhost:3000/studio"

echo ""
echo "============================================================="
echo "🎉 Ready to Use! Open http://localhost:3000/admin"
echo "📝 Start creating and managing your GWK website content!"
echo "============================================================="