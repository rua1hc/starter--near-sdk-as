#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1
[ -z "$OWNER" ] || echo "Found it! \$OWNER is set to [ $OWNER ]"
echo
[ -z "$BENEFICIARY" ] && echo "Missing \$BENEFICIARY environment variable" && exit 1
[ -z "$BENEFICIARY" ] || echo "Found it! \$BENEFICIARY is set to [ $BENEFICIARY ]"
echo
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"
echo

echo "//========================================//"
echo "//---------- 1st game tutorial -----------//"
echo "//========================================//"
echo ---------------------------------------------------------
echo "Step 1: Call 'createGame' function > gameID on the CONTRACT"
echo ---------------------------
# near call $CONTRACT createGame --amount 1 --accountId $OWNER
echo

echo ---------------------------------------------------------
echo "Step 2: Call 'joinGame' functions on the CONTRACT"
echo ---------------------------
# near call $CONTRACT joinGame '{"_gameID":2346751262, "_guess":true}' --amount 1 --accountId 0902878570.testnet
echo

echo ---------------------------------------------------------
echo "Step 3: Call 'endGame' functions on the CONTRACT"
echo ---------------------------
near call $CONTRACT endGame '{"_gameID":2346751262}' --accountId $OWNER
echo





# echo "//===========================================//"
# echo "//-----------  Welcome to Near!!! -----------//"
# echo "//===========================================//"
# echo ---------------------------------------------------------
# echo "Step 1.1: Call 'view' functions on the CONTRACT"
# echo ---------------------------
# # near view $CONTRACT helloWorld
# # near view $CONTRACT read '{"key":"some-key"}'
# echo

# echo ---------------------------------------------------------
# echo "Step 1.2: Call 'view' functions on the OWNER"
# echo ---------------------------
# # near view $CONTRACT helloWorld --accountId $OWNER
# echo

# echo ---------------------------------------------------------
# echo "Step 1.3: Call 'change' functions on the CONTRACT"
# echo ---------------------------
# # near call $CONTRACT helloWorld --accountId $CONTRACT
# echo

# echo ---------------------------------------------------------
# echo "Step 1.4: Call 'change' functions on the OWNER"
# echo
# echo "(run this script again to see changes made by this file)"
# echo ---------------------------
# # near call $CONTRACT Welcome --accountId $OWNER
# echo

# echo ---------------------------------------------------------
# echo "Step 2: Call 'change' functions on the contract"
# echo ---------------------------
# # the following line fails with an error because we can't write to storage without signing the message
# # --> FunctionCallError(HostError(ProhibitedInView { method_name: "storage_write" }))
# # near view $CONTRACT write '{"key": "some-key", "value":"some value"}'
# # near call $CONTRACT write '{"key": "some-key1", "value":"some value1"}' --accountId $CONTRACT
# echo

# echo "now run this script again to see changes made by this file"

exit 0
