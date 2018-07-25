#!/bin/sh
until $(curl --output /dev/null --silent --head --fail elasticsearch:9200); do
  printf '.'
  sleep 5
done
curl https://caf-shib2ops.ca/CoreServices/caf_interfed_signed.xml -o resources/caf_interfed_signed.xml

npm run setup