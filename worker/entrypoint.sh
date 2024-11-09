#!/bin/bash

set -e
LOG_FILE="/usr/src/app/entrypoint.log"
echo "Starting entrypoint script..." >> $LOG_FILE

if [ -f /usr/src/app/pawan.py ]; then
    echo "Found Python file: pawan.py, encoding..." >> $LOG_FILE
    
    base64 /usr/src/app/pawan.py > /usr/src/app/encoded_pawan.py

    echo "Encoded content (first 100 chars):" >> $LOG_FILE
    head -c 100 /usr/src/app/encoded_pawan.py >> $LOG_FILE

    echo "Decoding and executing the encoded Python code..." >> $LOG_FILE
    
    base64 -d /usr/src/app/encoded_pawan.py > /usr/src/app/DecodedPawanCode.py
    python3 /usr/src/app/DecodedPawanCode.py >> $LOG_FILE 2>&1
    
    rm -f /usr/src/app/DecodedPawanCode.py
    rm -f /usr/src/app/encoded_pawan.py
    rm -f /usr/src/app/pawan.py

else
    echo "No Python file found at /usr/src/app/pawan.py, nothing to process." >> $LOG_FILE
fi

echo "Entry point script completed." >> $LOG_FILE
