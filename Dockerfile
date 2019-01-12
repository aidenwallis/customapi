FROM node:10.14.1
WORKDIR /app
EXPOSE 8881
COPY package.json yarn.lock ./
RUN yarn
RUN yarn build
VOLUME ["/app"]
CMD ["node", "dist/index.js"]
