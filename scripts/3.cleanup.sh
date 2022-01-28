#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for required environment variables"
echo ---------------------------------------------------------
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1
[ -z "$OWNER" ] || echo "Found it! \$OWNER is set to [ $OWNER ]"
echo
[ -z "$BENEFICIARY" ] && echo "Missing \$BENEFICIARY environment variable" && exit 1
[ -z "$BENEFICIARY" ] || echo "Found it! \$BENEFICIARY is set to [ $BENEFICIARY ]"
echo
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"
echo

echo ---------------------------------------------------------
echo "Step 1: Delete $CONTRACT, setting $BENEFICIARY as beneficiary"
echo ---------------------------------------------------------
near delete $CONTRACT $BENEFICIARY
echo

echo ---------------------------------------------------------
echo "Step 2: Clean up project folders"
echo ---------------------------------------------------------
yarn clean
echo

exit 0
