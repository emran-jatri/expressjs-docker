FROM node:18
WORKDIR /app
COPY package.json .
# RUN npm install

# to not install dev dependencies in production
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
					then npm install; \
					else npm install --only=production; \
					fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
# CMD ["npm", "run", "dev"]
CMD ["node", "index.js"]
