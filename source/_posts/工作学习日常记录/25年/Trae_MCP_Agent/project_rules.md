<!--
 * @Description: 
 * @Date: 2025-04-23 11:35:37
 * @LastEditTime: 2025-04-29 15:12:56
 * @FilePath: \LL_HighWayMonitor_FG\.trae\rules\project_rules.md
-->
1. 当前项目使用的框架版本、依赖:
  参考 package.json 文件中的 "dependencies" 和 "devDependencies" 字段
2. 请不要使用某些 APIs
  暂无
3. 测试框架信息
  暂无

[项目架构]
框架 = React + TypeScript
状态管理 = zustand
UI = [antd, Material UI]
路由 = React Router 6
API = [RESTful + axios fetch]

[代码规范]
组件结构 = 组件名称.tsx + 组件名称.module.scss + types.ts
接口分层 = services/API模块层 + stores/Zustand状态层 + components/视图层
样式方案 = styled-components, module.scss
错误处理 = 统一错误边界组件
格式化规则 = eslint + prettier

[接口文档API规范]
OpenAPI规范 = {
  接口路径: /模块名/子模块/操作名 (全小写+下划线)
  参数定义: {
    路径参数: 必须定义pattern和example
    查询参数: 必须定义type和default
    请求体: 必须定义required和example
  }
  响应结构: {
    成功响应: 必须包含code/message/data
    错误响应: 必须包含code/message/errors
    默认值规范: {
      成功响应 code 常量值: 200
      成功响应 message 常量值: "ok"
    }
  }
  数据类型: 必须使用Zod Schema定义并生成TS类型
  文档要求: {
    每个接口必须有summary和description
    每个参数必须有description
    必须提供至少一个example
  }
}

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
状态管理用 zustand
数据校验用 Zod

[类型管理]
全局类型 = types/*.d.ts + 模块类型就近定义
类型复用 = 公共类型抽离至types目录
类型校验 = Zod Schema定义运行时校验

[质量要求]
组件必须写PropTypes或TS类型
复杂函数必须有单测
函数不能超20行

[编程思路]
- 代码就是文档, 自己得能看明白
- 别整太复杂, 宁可多写两行
- 同样的代码出现三次就抽函数
- 先想边界情况再写主逻辑
- 数据流动 = 单向数据流（API→Zustand→组件）
- 状态管理 = 业务逻辑集中stores目录
- API调用 = 严格遵循services模块封装

[提速指南]
函数名要能看出来干啥的
变量作用域越小越好, 别整全局的
出错时提示要有用
注释是写给半年后的自己看的
注释一定要用中文
注释一定使用 jsdoc格式 `/**  */`

[编程规矩]
1. 代码必须遵循SOLID原则
2. 每个函数只干一件事
3. 所有异常必须处理
4. 变量名要说人话, 语义化(data→userList)
5. 函数名必须表达其功能
6. 函数参数 超过三个 必须用对象

[辅助模式]
* 看到能复用的代码就提醒我
* 给出不同方案, 说优缺点
* 检查代码边界情况

[mock数据抽离封装具体实现细节]
1. 抽离mock数据
2. 生成openapi配置文档，导入 ApiFox
3. 根据 MCP ApiFox 服务，生成 ts接口文档
4. 在 接口配置模块 生成 数据请求方法
5. 在 接口配置模块 生成 数据处理器 方法，并根据返回值 生成对应 ts类型
6. 在业务组件中 引入 接口配置模块，使用数据请求方法，处理数据，渲染页面