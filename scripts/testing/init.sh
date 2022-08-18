#! /bin/bash
. ./scripts/misc/globals.sh
. ./scripts/setup/setup.sh

#-------------------------- Execution --------------------------------

# Cleanup backend code formatting
title "Step 1" "Cleaning backend code formatting"
. ./scripts/testing/backend/code_formatting.sh

# Cleanup frontend code formatting
title "Step 2" "Cleaning frontend code formatting"
. ./scripts/testing/frontend/code_formatting.sh

# Cleanup frontend code formatting
title "Step 3" "Testing frontend with Jest"
. ./scripts/testing/frontend/tests.sh