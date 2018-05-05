---
title: MongoDB在Node.js中的使用
date: 2018-04-16 14:03:08
tags: MongoDB
archives: SQL
categories: 数据库
---
#### Node.js 中使用MongoDB(几乎是标配)
+ mac中安装MongoDB
brew install mongodb
+ node.js 中使用mongoose第三方库来管理MongoDB
npm install mongoose --save
- 为什么使用mongoose:官方的驱动都是 回调方式的API, 而mongoose封装成promise, 可使用await/async

* 配置连接DB信息,并导出连接的对象
````
import mongoose from 'mongoose' // 引入
const options = {
  user: 'admin',
  pwd: '123456',
  host: 'localhost',
  port: '27017',
  database: 'hollywood',
  authSource: 'admin',
}

const uri = `mongodb://${options.user}:${options.pwd}@${options.host}:${options.port}/${options.database}?authSource=${options.authSource}`

mongoose.Promise = global.Promise //需要
mongoose.connect(uri)

export default mongoose
````
**定义一个模型的概要，类似于关系型数据库中的定义表结构**
````
import db from '../db.js'
import logger from '../logger'
const Schema = db.Schema

//account对应的字段
const accountSchema = new Schema(
  {
    name: { type: String, maxlength: 15 },
    password: { type: String, maxlength: 20 },
    gender: { type: String, enum: ['male', 'female'] },
    email: { type: String, maxlength: 25 },
    avatar: { type: String },
    age: { type: Number },
    create_date: { type: Date },
    update_date: { type: Date },
  },
  {
    versionKey: false,
  },
)

//当account执行save()前，执行该代码片段，有点类似于中间件(这个方法内容仅仅是介绍pre()的使用方法)
accountSchema.pre('save', function(next) {
const currentDate = new Date()
if (!this.create_date) {
        this.create_date = currentDate
} else {
        this.update_date = currentDate
}
next()
})

//当account执行save()后
> ...

//定义模型的方法
accountSchema.methods.sayHi = () => (console.log('sayHi()!!!!!'))
const Account = db.model('Account', accountSchema)
export default Account

````
**保存到数据库, 并返回一个保存到数据库的对象**

````
import Account from './model'

export default class AccountService {
  static async save(json) {
    const accountModel = new Account(json)
    const account = await accountModel.save()
    return account
  }
}
````

