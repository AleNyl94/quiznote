# -----------------------------------------------------------------------------
# Base stage - 
# -----------------------------------------------------------------------------
FROM node:lts-bookworm-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

# -----------------------------------------------------------------------------
# Final stage -
# -----------------------------------------------------------------------------
FROM node:lts-bookworm-slim

WORKDIR /usr/src/app

COPY --from=base --chown=node:node /usr/src/app/ /usr/src/app/

USER node

ARG EXPRESS_APP_PORT=3000
EXPOSE ${EXPRESS_APP_PORT}
ENV PORT=$EXPRESS_APP_PORT

CMD ["npm", "start"]