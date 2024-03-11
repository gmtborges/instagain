FROM node:20-alpine as base
WORKDIR /usr/local/app

FROM base as install
# Cache prod dependencies
RUN mkdir -p /temp/prod
COPY package.json package-lock.json /temp/prod/
RUN cd /temp/prod && npm ci --omit=dev

RUN mkdir -p /temp/dev
COPY package.json package-lock.json /temp/dev/
RUN cd /temp/dev && npm ci --prefer-offline --no-audit

FROM base as build
ENV NODE_ENV=production

COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .
RUN npm run build

# Production stage
FROM base as production

COPY --from=install /temp/prod/node_modules ./node_modules
COPY --from=build /usr/local/app/ .

EXPOSE 3000/tcp
CMD ["node", "build"]
