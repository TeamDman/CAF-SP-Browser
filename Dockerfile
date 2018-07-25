FROM node:8

WORKDIR /app
COPY . /app

RUN curl https://caf-shib2ops.ca/CoreServices/caf_interfed_signed.xml -o resources/caf_interfed_signed.xml

RUN npm install

RUN chmod +x /app/install.sh
# ENTRYPOINT [ "app/install.sh"]

EXPOSE 5000

# RUN node scripts/db_populate
# RUN node scripts/es_populate
# CMD node scripts/server
