# 移动端后端服务
## 环境
+ Node + Express + mongoose 
+ node > 10
+ MongoDB 4.4.6 Community
+ 接口RESETful标准
+ websocket+http
 bb

## 运行
npm install
npm run server


## mongoose 改为事务型

## 数据库和接口设计
 file 对象{
     fullPath:""
     originName:""
     fileName:""
 }
 + 文件获取
   fileId   =>  => file
 数据库存储file 

 ## Docker部署Node服务
  1. docker build -t app-server .
  2. docket run -d -p 8092:8092 app-server


### docker 
[参考安装mongodb](https://www.cnblogs.com/zddzz/p/10069912.html)
docker logs --since 30m CONTAINER_ID
docker ps -a 
docker ps
docker images 
docker rm container_id
docker rmi images_name


