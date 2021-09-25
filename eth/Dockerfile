FROM node:14.17-alpine3.11

WORKDIR /app

COPY . /app/

# Install nestjs cli
RUN npm i -g @nestjs/cli
# Install dependencis
RUN npm i
# Start the server
CMD ["npm", "start"]