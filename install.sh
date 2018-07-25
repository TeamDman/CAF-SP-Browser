#!/bin/sh
until $(curl --output /dev/null --silent --head --fail elasticsearch:9200); do
  printf '.'
  sleep 5
done
npm run setup