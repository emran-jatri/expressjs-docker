# install node first
FROM node:18
# make a app directory
WORKDIR /app
# copy package.json file to working directory
COPY package.json .
# RUN npm install

# to not install dev dependencies in production - by bash script
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
					then npm install; \
					else npm install --only=production; \
					fi

# copy all to working directory
COPY . ./
# set a env variable PORT 3000
ENV PORT 3000
# expose the port
EXPOSE $PORT

# now run the app
# CMD ["npm", "run", "dev"]
CMD ["node", "index.js"]
