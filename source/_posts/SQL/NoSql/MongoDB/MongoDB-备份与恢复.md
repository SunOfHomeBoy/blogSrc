---
title: MongoDB--备份与恢复
date: 2018-04-16 15:10:13
tags: MongoDB
archives: SQL
categories: 数据库
---
## [备份(`mongodump`)与恢复(`mongorestore`)](http://www.runoob.com/mongodb/mongodb-mongodump-mongorestore.html)

### **数据备份**(mongodump)
Mongodb中 使用`mongodump`命令来`备份`MongoDB数据。该命令可以`导出所有数据到指定目录中`。

mongodump命令可以通过`参数`指定导出的`数据量级`转存的服务器。

**语法**
````
> mongodump -h dbhost -d dbname -o dbDirectory
-h：MongDB所在服务器地址，例如：`127.0.0.1`，当然也可以指定端口号：`127.0.0.1:27017`
-d：需要备份的数据库实例，例如：test
-o：备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。
````