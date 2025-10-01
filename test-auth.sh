#!/bin/bash

# Test script to verify admin authentication flow

echo "Testing GWK Admin Authentication Flow..."
echo "========================================"

# Test login page
echo "1. Testing login page..."
LOGIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin/login)
if [ "$LOGIN_STATUS" = "200" ]; then
    echo "✅ Login page loads successfully"
else
    echo "❌ Login page failed with status: $LOGIN_STATUS"
    exit 1
fi

# Test admin redirect (should redirect to login)
echo "2. Testing admin redirect..."
ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L http://localhost:3000/admin)
echo "Admin redirect status: $ADMIN_STATUS"

# Test with fallback session cookie
echo "3. Testing with fallback session..."
SESSION_DATA='{"access_token":"fallback-token","user":{"id":"fallback-admin-id","email":"admin@gwk.local"}}'
ENCODED_SESSION=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$SESSION_DATA'))")
COOKIE_ADMIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Cookie: fallback-admin-session=$ENCODED_SESSION" http://localhost:3000/admin)
echo "Admin access with fallback session: $COOKIE_ADMIN_STATUS"

echo "========================================"
echo "Authentication flow test completed."