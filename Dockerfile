FROM node:8

WORKDIR /app
COPY . /app

RUN npm install

RUN chmod +x /app/install.sh
# ENTRYPOINT [ "app/install.sh"]

EXPOSE 5000

# RUN node scripts/db_populate
# RUN node scripts/es_populate
# CMD node scripts/server
