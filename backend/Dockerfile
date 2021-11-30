FROM node
WORKDIR /Users/filip/Desktop/VAVJS_zadanie3/dckr
# WORKDIR C:\Users\Filip\Desktop\VAVJS_zadanie3\dckr
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 8080
CMD ["node","server.js"]