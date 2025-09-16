#!/bin/bash
cd /home/kavia/workspace/code-generation/quoteextractor-for-social-media-221-233/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

