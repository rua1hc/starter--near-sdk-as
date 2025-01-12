#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo "near delete _CONTRACT _OWNER"
# near delete $CONTRACT $OWNER
echo

echo
echo "rm -rf ./neardev"
rm -rf ./neardev
echo

echo ---------------------------------------------------------
echo "Step 1: Build the contract (may take a few seconds)"
echo ---------------------------------------------------------
yarn build:release
echo

echo ---------------------------------------------------------
echo "Step 2: Deploy the contract"
echo "(edit scripts/1.dev-deploy.sh to deploy other contract)"
echo ---------------------------------------------------------
# comment out the line below to deploy the other example contract
# near dev-deploy ./build/release/simple.wasm
# near deploy --accountId rua1hc.testnet --wasmFile ./build/release/simple.wasm

# uncomment the line below to deploy the other example contract
# near dev-deploy ./build/release/singleton.wasm
echo

echo ---------------------------------------------------------
echo "Step 3: Prepare your environment for next steps"
echo
echo "(a) find the contract (account) name in the message above"
echo "    it will look like this: [ Account id: dev-###-### ]"
echo
echo "(b) set an environment variable using this account name"
echo "    see example below (this may not work on Windows)"
echo ---------------------------------------------------------
echo 'export CONTRACT=dev-1643388030269-84482549251386'
echo 'export OWNER=rua1hc.testnet'
echo 'export BENEFICIARY=rua1hc.testnet'
echo
# export OWNER=0902878570.testnet
# export BENEFICIARY=0902878570.testnet

# uncomment this line for a useful hint when using the singleton style
# echo "near call \$CONTRACT init --accountId \$CONTRACT"
echo ---------------------------------------------------------
echo

exit 0
