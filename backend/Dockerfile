FROM node
WORKDIR /app
COPY ./ /app
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]