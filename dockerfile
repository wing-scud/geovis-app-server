from node:14-stretch
ENV APP_ID="app-server"
run mkdir -p /usr/src/app/geovis-app-mobile-server/
workdir /usr/src/app/geovis-app-mobile-server/
copy .  /usr/src/app/geovis-app-mobile-server/
# run cd /usr/src/app/geovis-app-mobile-server/
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
expose 8092
cmd npm run server
