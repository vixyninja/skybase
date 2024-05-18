###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:20-alpine As development
WORKDIR /usr/src/app
ENV NODE_ENV DEVELOPMENT
COPY . .
RUN npm install --global yarn --force
RUN yarn global add @nestjs/cli
RUN yarn install
CMD [ "yarn", "start:dev" ]


###################
# BUILD 
###################
FROM development As builder
WORKDIR /usr/src/app
ENV NODE_ENV BUILD
COPY . .
RUN npm install --global npm --force
RUN npm install 
RUN npm run build

###################
# PRODUCTION
###################
FROM node:20-alpine As production

WORKDIR /root/
ENV NODE_ENV PRODUCTION
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.env ./.env
COPY --from=builder /usr/src/app/public ./public

CMD [ "node", "dist/main.js" ]
