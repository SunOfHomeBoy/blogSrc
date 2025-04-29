---
title: Trae 功能优化
date: 2025年4月23日 11:27:53
update:
tags: AI MCP Agent Trae
categories: AI
---
# Trae 功能优化
[Trae 功能优化](./8d23dafaa4ce2eaa3e1a39eeb6eb7943.jpg)

## 规则配置
![alt text](image.png)

* [参考配置](.cursorrules(高效AI开发))

### + **个人规则**
  [代码规范]
  组件结构 = 参照当前项目配置 统一组件结构 + 命名方式
  错误处理 = 统一错误边界组件
  格式化规则 = eslint + prettier

  [AI规则]
  组件要加性能优化
  表单必须有验证和错误提示
  列表要考虑空状态和加载状态

  [命名规范]
  变量用驼峰命名, 绝对不能数字后缀
  组件必须大写开头
  API函数必须以fetch/get/post打头

  [质量要求]
  组件必须写PropTypes或TS类型
  复杂函数必须有单测
  函数不能超20行

  [编程思路]
  - 代码就是文档, 自己得能看明白
  - 别整太复杂, 宁可多写两行
  - 同样的代码出现三次就抽函数
  - 先想边界情况再写主逻辑

  [提速指南]
  函数名要能看出来干啥的
  变量作用域越小越好, 别整全局的
  出错时提示要有用
  注释是写给半年后的自己看的
  注释一定要用中文
  注释统一全部使用 jsdoc格式 /**  */

  [编程规矩]
  1. 代码必须遵循SOLID原则
  2. 每个函数只干一件事
  3. 所有异常必须处理
  4. 变量名要说人话(data→userList)
  5. 函数名必须表达其功能
  6. 函数参数 超过三个 必须用对象

  [辅助模式]
  * 看到能复用的代码就提醒我
  * 给出不同方案, 说优缺点
  * 检查代码边界情况


### + **项目规则**
  [项目架构]
  框架 = React + TypeScript
  状态管理 = zustand
  UI = [antd, Material UI]
  路由 = React Router 6
  API = [RESTful + axios fetch]

  [代码规范]
  组件结构 = 组件名称.tsx + 组件名称.module.scss + types.ts
  样式方案 = styled-components, module.scss
  错误处理 = 统一错误边界组件
  格式化规则 = eslint + prettier

  [AI规则]
  组件要加性能优化(React.memo)
  表单必须有验证和错误提示
  列表要考虑空状态和加载状态

  [命名规范]
  变量用驼峰命名, 绝对不能数字后缀
  React组件必须大写开头
  API函数必须以fetch/get/post打头

  [项目规矩]
  API调用必须放services目录
  状态管理用Redux Toolkit
  数据校验用Zod

  [质量要求]
  组件必须写PropTypes或TS类型
  复杂函数必须有单测
  函数不能超20行

  [编程思路]
  - 代码就是文档, 自己得能看明白
  - 别整太复杂, 宁可多写两行
  - 同样的代码出现三次就抽函数
  - 先想边界情况再写主逻辑

  [提速指南]
  函数名要能看出来干啥的
  变量作用域越小越好, 别整全局的
  出错时提示要有用
  注释是写给半年后的自己看的
  注释一定要用中文
  注释统一全部使用 jsdoc格式 /**  */

  [编程规矩]
  1. 代码必须遵循SOLID原则
  2. 每个函数只干一件事
  3. 所有异常必须处理
  4. 变量名要说人话(data→userList)
  5. 函数名必须表达其功能
  6. 函数参数 超过三个 必须用对象

  [辅助模式]
  * 看到能复用的代码就提醒我
  * 给出不同方案, 说优缺点
  * 检查代码边界情况

# Trae 配置智能体 MCP Agent
  + Trae 默认配置
    ![Trae 默认配置](image-1.png)
    ```
      // 示例:
      // {
      //   "mcpServers": {
      //     "example-server": {
      //       "command": "npx",
      //       "args": [
      //         "-y",
      //         "mcp-server-example"
      //       ]
      //     }
      //   }
      // }
    ```
  + [介入 ApiFox 配置](https://docs.apifox.com/6327888m0#%E5%9C%A8-trae-%E4%B8%AD%E9%85%8D%E7%BD%AE-mcp)
    + 令牌
    + project-id
    不可泄密

