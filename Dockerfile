FROM NODE
WORKDIR /app
COPY ./ /app
RUN npm install
EXPOSE 5000
CMD "npm","run","dev:start"