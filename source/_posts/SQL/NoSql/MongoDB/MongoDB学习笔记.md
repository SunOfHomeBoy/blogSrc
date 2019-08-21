---
title: MongoDB学习笔记
date: 2018-07-07 16:31:09
tags: MongoDB学习笔记
categories: MongoDB
---
# [MongoDB学习笔记(JS胖)](http://jspang.com/2017/12/16/mongdb/)
(2018年1月26日 13:53:11)
## 第01节：认识和安装MongoDB
   > MongoDB是`非关系型数据库`
   关系数据库,是建立在关系模型基础上的数据库。
   安装步骤：
    1.去官网下载MongoDB,https://www.mongodb.com/,在网站中找到Download按钮。下载会有点忙,国外的服务器,你懂的。
    2.下载后进行安装,安装没什么难度,但是对于新手建议选择默认安装,而不选择自己配置。等我们完全熟悉后再定制式配置。
    3.安装时如果有安全软件,会报一些拦截,一律允许就好,不允许会安装失败的。
    4.安装完成后,需要配置“环境变量”,目的是再命令行中直接使用,而不需要输入很长的路径了。（此步骤观看视频）

   查看存在数据库命令：`show dbs`
   查看数据库版本命令：`db.version()` 

## 第02节：Mongo基本命令-1(`show dbs` `use xxdb` `show collections` `db` `MongoDB的存储结构`)
   接下来的几节直接上手`Mongo命令`,`MSSQL`和`MYsql`用的都是`Sql命令`。
   MongoDB的操作命令就是前端最熟悉的JavaScript命令。
   先来一个常用的赋值和输出命令,熟悉一下。（操作前你需要打开Mongo服务器和链接到服务器-也就是我们上节讲的`mongod`命令和`mongo`命令）在命令行中输入以下代码。
   需要注意的是这里的输出不再使用`console.log`(‘巴拉巴拉’),而是使用`print`(‘巴拉巴拉’),这个稍有区别。

   **MongoDB的存储结构**
    以前我们的关系型数据库的数据结构都是顶层是库,库下面是表,表下面是数据。但是MongoDB有所不同,库下面是集合,集合下面是文件,可以看下面这张图进行了解一下。

    **存储解构不同**
      关系型数据库
        --数据库
        --数据表
        --数据行
      非关系型数据库(MongoDB)
        --数据库
        --集合
        --文件

     在学习中我们可以对比记忆,这样才能更好的了解这些名词,其实数据表就是集合,数据行就是文件,当然这只是为了记忆,实质还是有区别的。

   **基础Shell命令**
    了解`存储结构`后,就可学习基础`Shell`命令,因 命令 较基础,以 列表形式展现,具体使用方法可到视频观看。
    `show dbs`:显示已有数据库. 如果你刚安装好,会默认有local、admin(config),这是MongoDB的默认数据库,我们在新建库时是不允许起这些名称的。
    `use admin`： 进入数据,也可以理解成为使用数据库。成功会显示：`switched to db admin`。
    `show collections`: 显示数据库中的`集合`（关系型中叫`表`,我们要逐渐熟悉）。
    `db`:显示当前位置. 也就是你当前使用的数据库名称,这个命令算是最常用的,因为你在作任何操作的时候都要先查看一下自己所在的库,以免造成操作错误。
   
   `总结`：这节 学习已经 进入 `MongoDB` 世界,使用 比较简单,都是 基本命令, 敲回车就可使用,但还要多进行 练习。`重点` 要转变 以前`数据库存储结构的思想`,`掌握MongoDB的存储结构`。 

## 第03节：Mongo基本命令-2("基本数据`增删改查`" `use db` `insert` `find` `findOne` `update` `remove` `drop` `dropDatabase` `count`)
   学会基本的 数据 `增删改查`
   数据操作基础命令：
    `use db`(建立数据库)：use不仅可以进入一个数据库,如果你敲入的库不存在,它还可以帮你建立一个库。但是在没有集合前,它还是默认为空。
    `db.集合.insert({"":"","":""})`:新建数据集合和插入文件（数据）,**当集合没有时,这时候就可以新建一个集合,并向里边插入数据。** `Demo：db.user.insert({“name”:”jspang”})`
    `db.集合.find( )`:查询所有数据,这条命令会列出集合下的所有数据,可以看到MongoDB是自动给我们加入了索引值的。`Demo：db.user.find()`
    `db.集合.findOne( )`:查询第一个文件数据,这里需要注意的,所有MongoDB的组合单词都使用首字母小写的驼峰式写法。
    `db.集合.update({查询},{修改})`:修改文件数据,第一个是查询条件,第二个是要修改成的值。这里注意的是可以多加文件数据项的,比如下面的例子。
    `db.集合.remove(条件)`：删除文件数据,注意的是要跟一个条件。`Demo`:`db.user.remove({“name”:”jspang”})`
    **以下基本不用**
    `db.集合.drop( )`:删除整个集合,这个在实际工作中一定要谨慎使用,如果是程序,一定要二次确认。
    `db.dropDatabase( )`:删除整个数据库,在删除库时,一定要先进入数据库,然后再删除。实际工作中这个基本不用,实际工作可定需要保留数据和痕迹的。 
    `db.collections.count({rule})`

## 第04节：用js文件写mongo命令(`var db = connect("dbName")` )
   命令行写`mongo`命令（shell）实在麻烦(无法忍受windows系统 命令行),这节学习用`JS`文件来写`shell命令`和`执行`。`JS`写`mongo`的`Shell`命令大部分是相同的,只有小部分不一样。
  **把命令写入JS中**
    现模拟一个用户登录日志表 信息,用JS进行编写。在一个新建目录下,比如D:/mongoShell/,新建一个goTask.js文件。文件内容如下：
  > goTask.js文件
  > var userName="jspang";    //声明一个登录名             
  > var timeStamp=Date.parse(new Date());     //声明登录时的时间戳  
  > var jsonDdatabase={"loginUnser":userName,"loginTime":timeStamp}; //组成JSON字符串
  > var db = connect('log');   //链接数据库
  > db.login.insert(jsonDdatabase);  //插入数据

  > print('[demo]log  print success');  //没有错误显示成功
  > var userName="jspang";    //声明一个登录名             
  > var timeStamp=Date.parse(new Date());     //声明登录时的时间戳  
  > var jsonDdatabase={"loginUnser":userName,"loginTime":timeStamp}; //组成JSON字符串
  > var db = connect('log');   //链接数据库
  > db.login.insert(jsonDdatabase);  //插入数据
  > 
  > print('[demo]log  print success');  //没有错误显示成功

  **执行JS文件**
  > mongo goTask.js

  总结：这节很好的解决 在终端写 命令行 的难题,虽然大部分Shell和在命令行中写法一样,但是也稍有不同,希望小伙伴们可以轻松掌握。 

## 第05节：批量插入的正确方法("批量数据插入 以`数组`方式" `老版本MongoDB batchInsert` `一次插入不要超 48M` `静态存储` `批量插入性能测试 批量>循环` `数据库性能`)
   在操作数据库时要注意两个能力：
    第一个是`快速存储能力`。
    第二个是`方便迅速查询能力`。

   **批量插入**
    批量数据插入是以**数组**的方式进行的（如果写错,可以3个回车可以切出来）。我们现在命令行中敲入下面的代码,我们可以看到数据顺利插入了。
    老版本MongoDB（3.2以前的版本基本都需要）是需要在`Insert`前加一个`batch`单词的,如下代码。
    `db.test.batchInsert()`
    **注意**一次插入不要超过48M,`.zip`和`大图片`之类尽量用`静态存储`,MongoDB存储`静态路径`就好,这也算是一个规则。

   **批量插入性能测试**
    刚学了批量插入,那是循环插入快？还是批量插入快那？在一般人的认知里肯定是批量插入更快（其实这毋庸置疑）,但我们要拿出极客精神,探个究竟,试着写一个小Shell,来验证一下结果。
    先写一个`循环插入`方法：

    `批量插入`代码:

   **总结**：在工作中`一定`要`照顾数据库性能`,这也是你`水平的体现`,一个技术会了很简单,但是要精通不那么简单。学完这节,记得在工作中如果在循环插入和批量插入举棋不定,那就选批量插入吧,它会给我们更优的性能体验。 

## 第06节：修改：Update常见错误(`只update修改项`)
   这节开始说一说`Update` 详细操作,先来看下常见错误,知道 困难 或者说 问题在哪里,再提出解决方案。这节会先演示一些错误的 `Update` 方法,然后再说正确的方法。希望不要误导小伙伴。
   **错误：只update修改项**
    `Update`的使用方法需要注意
    db.xxxset.update({"":""},`{"":""} || [] || variable`)(此方法属于整条数据修改,替换项需要整条数据)

   **正确修改方法**
    可以声明一个变量,然后把要改变数据的全部信息放入变量,最后执行修改操作。
  
   现在这种方法才是正确的,数据修改正常了,但是你会发现写起来非常麻烦,而且特别容易写错。下节我们会介绍`update修改器`,可以很好的解决这个问题。 

## 第07节：修改：初识update修改器(`$set/$set嵌套内容` `$unset` `$inc` `multi` `upsert`)
   上节的`修改`用起来实在是`不够优雅`,这是我们一个伟大的前端不能接受的,所以我们要学习`update修改器`,来解决这个问题。`update修改器`可以帮助我们`快速`和`简单`的修改数据,让我们的操作更简单方便。
  **$set修改器**
    用来修改一个指定的键值(key),这时候我们要修改上节的sex和age就非常方便了,只要一句话就可以搞定。
   > db.workmate.update({"name":"MinJie"},{"$set":{sex:2,age:21}})
    修改好后,我们可以用db.workmate.find()来进行查看,你会发现数据已经被修改。
   **修改嵌套内容(内嵌文档)**
   > db.workmate.update({"name":"MinJie"},{"$set":{"skill.skillThree":'word'}})
   
  **$unset用于将key删除**
   > db.workmate.update({"name":"MinJie"},{$unset:{"age":''}})
  
  **$inc对数字进行计算**
   它是对`value值`的修改,但是修改的`必须是数字`,`字符串`是`不起效果`的。
   > db.workmate.update({"name":"MinJie"},{$inc:{"age":-2}})

  **multi选项**
   `multi`是有`ture`和`false`两个值,`true代表全部修改`,`false代表只修改一个(默认值)`。

  **upsert选项**
   `upsert`也有`ture`和`false`两个值：`true代表没有就添加`,`false代表没有不添加(默认值)`。

  **总结**：这节的内容非常多,主要学习了`update修改器`有关的一些东西。一定要多练习几遍,否则很快就会忘记的。

## 第08节：修改：update`数组`修改器(`$push` `$ne` `$addToSet` `$each` `$pop`)
  已学会一些`基础修改器`,这节主要学习`数组修改器的操作`,也可`修改内嵌文档`,也就是`对象形式的数据`。
  **$push追加数组/内嵌文档值**
   `$push`的功能是`追加数组中的值`,但我们也经常用它操作`内嵌文档`,就是{}对象型的值。
    先看一个追加数组值的方式,比如我们要给小王加上一个爱好(interset)为画画（draw）：
   > db.workmate.update({name:'xiaoWang'},{$push:{interest:'draw'}})
   当然`$push`修饰符还可以为`内嵌文档增加值`.
    比如我们现在要给我们的UI,增加一项新的技能skillFour为draw,这时候我们可以操作为：
   > db.workmate.update({name:'MinJie'},{$push:{"skill.skillFour":'draw'}})
   `$push修饰符`在工作中是最常用的,因为 `数据`一般都会涉及`数组`和`内嵌文档`的操作,一定要掌握。

  **$ne查找是否存在**(类似 `if(xxx === undefined || !xxx)/else` 判断)
    它主要的作用是,`检查一个值是否存在`,如`不存在`再 执行操作,`存在`就不执行,这个很`容易弄反`,记得我刚学的时候就经常弄反这个修改器的作用,给自己增加了很多坑。
   > db.workmate.update({name:'xiaoWang',"interest":{$ne:'playGame'}},{$push:{interest:'Game'}})
   **总结**：没有则修改,有则不修改。
  
  **$addToSet 升级版的$ne**
    它是$ne的升级版本（查找是否存在,不存在就push上去）,操作起来更直观和方便,所以再工作中这个要比$en用的多。
   > db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:"readBook"}})

  **$each 批量追加**
    它可以传入一个`数组`,一次增加`多个值`进去,相当于`批量操作`,性能同样比循环操作要好很多,这个是需要我们注意的,工作中也要先组合成数组,然后用批量的形式进行操作。
   > var newInterset=["Sing","Dance","Code"];
   > db.workmate.update({name:"xiaoWang"},{$addToSet:{interest:{$each:newInterset}}})

  **$pop 删除数组值**
    `$pop`只删除一次,并不是删除所有数组中的值。而且它有`两个选项`,`1`和`-1`。
    1：从数组末端进行删除
    -1：从数组开端进行删除
   > db.workmate.update({name:'xiaoWang'},{$pop:{interest:1}})
  
  **数组定位修改**
    有时候只知道修改数组的第几位,但并不知道是什么,这时候我们可以使用`interest.int`的形式。
    `例子` 比如我们现在要修改xiaoWang的第三个兴趣为编码（Code）,注意这里的计数是从0开始的。
   > db.workmate.update({name:'xiaoWang'},{$set:{"interest.2":"Code"}})

  **总结**：这节主讲`数组`和`内嵌文档`有关的`update`修改器,内容很多,都需要不断熟练记忆。当然如果你记不住,你至少记住这个博客网址,因为技术胖把笔记已经给你整理好了。

## 第09节：修改：状态返回与安全(`应答式/非应答式` `db.runCommand()` `findAndModify()`)
  在操作数据库时,对`数据的修改`需要`足够的安全措施`,实际工作中,用`db.collections.update`不多,修改时都用`findAndModify`,它`返回`来一些必要的`参数`,让我们对`修改`多了很多`控制`力,`控制力的加强`也就是对`安全的强化能力加强`。

  **应答式写入**
   先了解一个概念：`应答式写入`。在`以前`的文章中,我们的操作都是`非应答式写入`,就是在`操作完`数据库后,它并没有给我们任何的`回应`和`返回值`,而是我们自己安慰自己写了一句话（print(‘[update]:The data was updated successfully’);）。这在`工作中 不允许`,因为根本`不能提现`我们`修改的结果`。
   **应答式**写入就会给我们`直接返回结果`(报表),结果里边的包含项会很多,这样我们就可以很好的进行程序的控制和安全机制的处理。有点像`前端`调用`后端接口`,无论作什么,后端都要给我一些`状态字节`一样。
  
  **db.runCommand()**
   是数据库运行命令的`执行器`,执行命令`首选`就要使用它,因为它在`Shell`和`驱动程序`间提供了一致的接口。（几乎操作数据库的所有操作,都可以使用`runCommand`来执行）现在我们试着用`runCommand`来修改数据库,看看结果和直接用`db.collections.update`有什么`不同`。

   > db.workmate.update({sex:1},{$set:{money:1000}},false,true)
   > var resultMessage=db.runCommand({getLastError:1})
   > printjson(resultMessage);

   上边代码 修改所有男士 每人增加1000元钱(money),然后用`db.runCommand()`执行,可看到执行结果在控制台返回。
    {
      "connectionId" : 1,
      "updatedExisting" : true,
      "n" : 2,
      "syncMillis" : 0,
      "writtenTo" : null,
      "err" : null,
      "ok" : 1
    }
    `false`：第一句末尾的false是upsert的简写,代表没有此条数据时不增加;
    `true`：true是multi的简写,代表修改所有,这两个前边已学过。
    `getLastError:1` :表示返回功能错误,这里的参数很多,如果有兴趣请自行查找学习,这里不作过多介绍。
    `printjson`：表示以json对象的格式输出到控制台。
    `db.listCommands( )`:查看所有的Commad命令, 内容很多, 本课程只讲解`工作中经常使用`的内容。

   比如我们要查看是否和数据库链接成功了,就可以使用Command命令。
   `db.runCommand({ping:1})`
   返回`ok:1`就代表链接正常。

  **findAndModify**
   从名字看,`findAndModify`是`查找并修改`的意思。配置它可以在修改后给我们返回修改的结果。看下面代码：
   > var myModify={
   >  findAndModify:"workmate",
   >  query:{name:'JSPang'},
   >  update:{$set:{age:18}},
   >  new:true    //更新完成,需要查看结果,如果为false不进行查看结果
   > }
   > var ResultMessage=db.runCommand(myModify);
   > 
   > printjson(ResultMessage)
   `findAndModify`的`性能`是不如`db.collections.update`的性能好,但实际工作中都使用它,毕竟要`商用程序`安全性还是比较重要的。
   `findAndModify属性值`:
    `query`:需要查询的条件/文档
    `sort`: 排序
    `remove`:[boolean]是否删除查找到的文档,值填写true,可以删除。
    `new`:[boolean]返回更新前的文档还是更新后的文档。
    `fields`:需要返回的字段
    `upsert`:没有这个值是否增加。
   **总结**：这节讲了一些跟`安全有关的操作`,但这`不是全部`,我们随着课程的深入还会继续学习更多的知识。工作中尽量使用`findAndModify`来进行更新数据,这样会更安全和直观,这点性能的损失是值得的。

## 第10节：查询：find的不等修饰符(`简单查找("x.x")转字符串` `筛选字段(第二对象参数 boolean || 0/1)` `不等修饰符`)
  `MongoDB`的`查找操作` 分几节课来讲,因为内容比较多, `开发中` 查找 是应用最多的操作,几乎每个模块都会用到,所以`查找部分`将是本套课的`重中之重`。这节课我们先来看看简单的查询条件,也了解一下find基础用法。
  如果你以前操作过`关系型数据库`比如`MySql` 你会对>(大于),<(小于),=(等于)这些东西很熟悉,但是`非关系型数据库`不能直接使用这些符号,稍有区别。
  **构造数据**
   我们需要构造更多的数据到集合中,这样我们才能很好的讲解查询条件,下面代码你可以直接复制进行添加。当然你也可以自己随意加一些数据到集合中,只要方便我们学习就可以了。
   "D:\工具\工作学习\monggoShell\demo10.js"

  **简单查找**
   比如 现在要查找数据中 技能一 会HTML+CSS 的所有人。直接进行查找加条件就可以。
   > db.workmate.find({"skill.skillOne":"HTML+CSS"})
   这时不能使用load来载入,以后会给大家讲使用方法,先用比较笨的方法,使用粘贴复制的方法 在命令行执行。

  **筛选字段**
   `返回数据项`太多,太乱,有时 程序并不需要 这么多选项。比如 只需要`姓名`和`技能`就可以了。这时候需要写第二个参数,看以下代码。
   db.workmate.find(
      {"skill.skillOne":"HTML+CSS"},
      {name:true,"skill.skillOne":true}
   )
   终端中看到如下结果：
    略……
   细心的小伙伴会发现还不够完美,多了一个`ID字段`,这个也不是我们想要的,这时候只要把`_id:false`就可以了。当然这里的`false`和`true`,**也可以用`0`和`1`表示。**
   db.workmate.find(
     {"skill.skillOne":"HTML+CSS"},
     {name:1,"skill.skillOne":1,_id:0}
   )
   **不过**这些查找操作,都是在作`等于`的阶段,但是不光只有等于查询,我们需要更多的查询条件。

  **不等修饰符**
   + 小于($lt):英文全称`less-than`
   + 小于等于($lte)：英文全称`less-than-equal`
   + 大于($gt):英文全称`greater-than`
   + 大于等于($gte):英文全称`greater-than-equal`
   + 不等于($ne):英文全称`not-equal`
   现在要查找,公司内年龄`小于30`&`大于25岁`的人员。看下面的代码。
   db.workmate.find(
    {age:{$lte:30,$gte:25}},
    {name:true,age:true,"skill.skillOne":true,_id:false}
   )
  
  **日期查找**
   MongoDB也提供了方便的日期查找方法,现在我们要查找注册日期大于2018年1月10日的数据,我们可以这样写代码。
   "D:\工具\工作学习\monggoShell\batch10.js"
   先声明一个日期变量,然后使用`大于符`($gt)进行筛选。

  **总结**：这节课内容并不多,但如果你是个`DBA`(数据库管理员) 查找命令工作中每天都会用到,所以这节课的内容练习是必须的,如果你懒得动手,那接下来的课程你可能无法学会。

## 第11节：查询：find的多条件查询(`$in/$nin`(有/无) `$or / $and / $not`(或/与/非))
  很多时候我们需要查询的值`不只是有一个简单的条件`,比如我们现在要查询一下同事中是`33岁`和`25岁`的,还比如我们要查询同事中`大于30岁`并且`会PHP技能`的。MongoDB在这方面也支持的很好,我们来学习一下。
  
  **$in修饰符**
   `in修饰符`可以轻松解决`一键多值`的查询情况。
   就如上面我们讲的例子,现在要查询同事中年龄是25岁和33岁的信息。
   > db.workmate.find(
   >   {age:{$in:[25,33]}},
   >   {name:1,"skill.skillOne":1,age:1,_id:0}
   > )
   `$in`相对的修饰符是`$nin`,就是查询`除了$in条件`以外的值,小伙伴们可以自己进行练习一下,这里我就不作过多的演示了。

  **$or修饰符**
   `$or修饰符`用来查询`多个键值`的情况,比如查询同事中大于30岁或者会做PHP的信息。
   `$or修饰符`与`$in/$nin`主要区别 `$or`修饰符是两个Key值 `$in/$nin`修饰符是一个Key值 需比较记忆。
  
  **总结**：这节知识比较简单,但要`区分记忆`,很`容易搞混`。幸运的是这里已经为你准备好学习笔记。当你忘记的时候过来看看吧。

## 第12节：查询：find的数组查询(`$all` `$in` `$size` `$slice(显示选项)`)
  这节主要学习数组的查询,在学习update时就花了重墨去讲数组的操作,可见数组的操作在MongoDB中很受重视,因为稍微大型一点的项目,设计的数据集合都复杂一些,都会涉及数组的操作。
  
  **完善数据**
   以前我们的`workmate集合`对数组涉及还很少,现在在数据中加入了`兴趣（interest）`,并且给每个人加入了一些兴趣,比如有写代码,做饭,看电影…
   当然这些数据你可以自己随意构建,但是如果你不想自己费事费脑,这里也为你准备好了数据,你只要把以前的表删除（drop）掉,重新载入(load)就可以了。

  **基本数组查询**
   比如现在我们知道了一个人的爱好是’画画’,’聚会’,’看电影’,但我们不知道是谁,这时候我们就可以使用最简单的数组查询（实际工作中,这种情况基本不常用,所以这种查询只作知识点储备就可以了）。
  
   在终端中运行后,我们得到了数据。这时候我们说,想查出看兴趣中有看电影的员工信息。按照正常逻辑,应该使用下面的代码。

  **$all-数组`多项`查询(类似 &&)**
   现在我们的条件升级了,要查询出既喜欢`看电影`又`看书`的人员信息,也就是对数组中的对象进行查询,这时候要用到一个新的查询修饰符$all。看下面的例子：

  **$in-数组的`或者`查询**
   `$all`修饰符,需要`满足所有条件`; `$in`主要`满足数组中任意的一项`就可以被查出来(有时候会跟`$or`弄混)。比如现在要查询爱好中有看电影的或者看书的员工信息。
  
  **$size-数组`个数`查询**
    
  **$slice-`显示选项`**
    展示数据时的判断条件,显示前几项或后几项。
    db.workmate.find(
      {},
      {name:1,interest:{$slice:2},age:1,_id:0} 
    )

  **总结**：如果你只看视频一定学不会,程序这东西必须要动手练习,我在所有的视频中都反复强调,目的没有别的就是想让你们真的学会,并应用到工作中去。

## 第13节：查询：find的参数使用方法(`find参数[query,fields,limit,skip,sort]` `分页Demo` `$where`)
  前边已讲3节查询,都是在操作`find`方法的`第一个参数(query)`和`第二个参数(fields)`。`find`还有几个常用的参数,这些参数多用在`分页`和`排序`上。这节我们就把这些常用的选项说一说,理解后我们演示一个分页的效果。

  **find参数**
    `query`：这个就是查询条件,`MongoDB默认`的第一个参数。
    `fields`：（返回内容）查询出来后显示的结果样式,可以用`true(1)`和`false(0)`控制是否显示。
    `limit`：返回的数量,后边跟`数字(number)`,控制`每次查询返回`的结果数量。
    `skip`:跳过多少个显示,和`limit`结合可以实现分页。(number)
    `sort`：排序方式,从小到大排序使用`1`,从大到小排序使用`-1`。

  **分页Demo**
   > db.workmate.find({},{name:true,age:true,_id:false}).limit(0).skip(2).sort({age:1});

  **$where修饰符**
   db.workmate.find(
     {$where:"this.age>30"},
     {name:true,age:true,_id:false}
   )
   这里的`this`指向的是`workmate(查询集合)`本身。这样我们就可以在程序中随意调用。虽然强大和灵活,但是这种查询对于`数据库压力`和`安全性`都会变重,所以在工作中`尽量减少`$where修饰符的使用。

## 第14节：查询：find如何在js文本中使用(`hasNext` `forEach`)[基础部分完结]
  前边使用`find`都是`JS`在文本中写完,然后复制到终端中执行,这样非常麻烦。在讲的过程中已经有很多小伙伴在问我如何像写`update`语句一样,在文本中直接运行。这节课我们就学习一下如何直接在文本中执行。
  
  **hasNext循环结果**
   想在文本中执行我们的`find`语句要用到`游标`和`循环`的操作,先看一下代码,代码中我已经对每一句进行了注释。
   > var db = connect("company")  //进行链接对应的集合collections
   > var result = db.workmate.find() //声明变量result,并把查询结果赋值给result
   > //利用游标的hasNext()进行循环输出结果。
   > while(result.hasNext()){
   >     printjson(result.next())  //用json格式打印结果
   > }
   写完后,现在你只需要在终端中进行`load()`就可以执行了,再也不用麻烦的复制粘贴了。
  
  **forEach循环**
   利用`hasNext循环`结果,需要借助`while`的帮助,MongoDB也为我们提供了`forEach循环`,现在修改上边的代码,使用forEach循环来输出结果。
   > var db = connect("company")  //进行链接对应的集合collections
   > var result = db.workmate.find() //声明变量result,并把查询结果赋值给result
   > //利用游标的hasNext()进行循环输出结果。
   > result.forEach(function(result){
   >     printjson(result)
   > })
   `作者`觉的`forEach循环`更为`优雅`。这两种方法都是非常不错的,凭借自己爱好进行选择吧。
  
  **总结**：那我们MongoDB的`基础部分`就全部讲完了,我们学会了它的`增、删、改、查`,你也可以使用MongoDB进行一些操作了。需要注意的是,只是这篇文章的完结,下篇文章我们进行讲解MongoDB,开始讲解MongoDB的`索引`。

## 第15节：索引:构造百万级数据(`db.randomInfo.stats()`)
  索引的`性能`体现必须要有`大量数据`才能看出来,你说你有10条20条数据,这是根本看不出来效果的,这节课就通过随机数的方法,创造出一个百万级数据的数据库出来。(随机插入数据,见mongoshell demo15.js)
  **PS**:`索引`是什么？把数据当成一个字典,`索引`即`目录`。消耗`内存`和`硬盘`。
  
  **制作随机数方法**

  **制作随机用户名**
  
  插入完成后,我们可以使用`db.randomInfo.stats()`命令查看数据中的数据条数。

  **总结**:这节课主要是为讲解MongoDB的`索引`作准备,我们用`随机数`的方法构建了一个`百万级`的数据表,如果你有兴趣继续往下学习 练习,这节课必须动手做一下。以后这篇文章的学习全是基于这个代码。
 
## 第16节：索引：索引入门(`ensureIndex` `getIndexes`)
  集合中已建立 200万条数据,可以进行`索引`的操作了。我们先来建立一个索引,然后看看它的`查询性能`到底提升了多少倍。这节课的内容不会很难,主要掌握`索引的建立方法`即可。

### 建立索引
    db.randomInfo.ensureIndex({username:1})
### 查看现有索引
    db.randomInfo.getIndexes()   

## 第17节：索引：复合索引(`复合索引的坑` `ensureIndex` `hint`)
什么样的数据使用索引会变慢？
`复合索引`的`使用`和`语法`
通过这节 需要对`索引`使用的`时机`有所了解，避免画蛇添足，产生不必的麻烦。

### 索引中的小坑
+ 数据`不超万条`时，不需要使用索引。性能的提升并不明显，大大`增加了内存、硬盘 消耗`。
+ 查询数据`超过表数据量30%`时，不要使用索引字段查询。实际证明会`比不使用索引更慢`，因为它`大量检索`了`索引表`和我们`原表`。
+ `数字索引`，要`比字符串索引快`的多，在百万级甚至千万级数据量面前，使用数字索引是个明确的选择。
+ 把你经常查询的数据做成一个`内嵌数据`（对象型的数据），然后集体进行索引。

### 复合索引(`ensureIndex`)
**复合索引就是两条以上的索引。**上节课我们已经把`username`字段建立了索引，我们现在把`randNum0`，这个字段也设置成索引。
    db.randomInfo.ensureIndex({randNum0:1})

建立好后，再用`查询索引状态`命令进行查询。
    db.randomInfo.getIndexes()

### 两个索引同时查询
    var db = connect('company');
    var rs= db.randomInfo.find({username:'7xwb8y3',randNum0:565509});

从性能上看并没有什么特殊的变化，查询时间还是在4ms左右。MongoDB的`复合查询`是按照我们的`索引顺序`进行查询的。就是我们用`db.randomInfo.getIndexes()`查询出的数组。

### 指定索引查询(`hint`)
`数字`的索引要比`字符串`的索引`快`，这就需要一个方法来打破索引表的查询顺序，用我们自己`指定的索引`优先查询，这个方法就是`hint()`.

    var rs= db.randomInfo.find({username:'7xwb8y3',randNum0:565509}).hint({randNum0:1});

由于`数据量`和`复杂成都`一般，所以没有明显性能提升。工作中遇到`大数据`，会得到`好的效果`。

### 删除索引(`dropIndex`)
当索引`性能不佳`或`起不到作用`时，我们需要删除索引，删除索引的命令是`dropIndex()`.

    db.randomInfo.dropIndex('randNum0_1'); // 索引的唯一ID

这里需要`注意`的是删除时填写的值，并`不是 字段名称(key)`，`而是 索引查询表(getIndexes())中 name值`。

### 总结：这节主要内容 `操作索引`，包括`复合索引 建立/删除`。使用 索引的 `窍门`。

## 第18节：索引：全文索引(`$text` `$search`)
有时候需要在`大篇幅文章`中`搜索关键词`，比如文章每篇都在`万字以上`，这时候想`搜索关键字`是非常`不容易`的，`MongoDB`为提供了`全文索引`。

### 准备工作(建立集合 插入 数据)
先建立`集合(collections)` —— `info`，然后`插入` 小段文章，`作用`就是为 建立 全文索引 提供数据，不再建立 百万级数据，只看效果。

    db.info.insert({contextInfo:"I am a programmer, I love life, love family. Every day after work, I write a diary."})
    db.info.insert({contextInfo:"I am a programmer, I love PlayGame, love drink. Every day after work, I playGame and drink."})

再次强调 只是练习需要，实际工作中 简单数据 没必要 建立 全文索引。

### 建立全文索引(`ensureIndex`)

    db.info.ensureIndex({contextInfo:'text'})

需要注意的是这里使用`text`关键词来`代表全文索引`，这里不再 `建立数据模型`。

### 全文索引查找(`$text` `$search`)
建立好了全文索引就可以查找了，查找时需要两个关键修饰符:

+ $text:表示要在全文索引中查东西。
+ $search:后边跟查找的内容。

    db.info.find({$text:{$search:"programmer"}})

### 多词查找(单词关系为 `或||`, 排除关键词`-`)
`全文索引`是支持`多词查找`的，比如我们希望查找数据中有programmer，family，diary，drink的数据(单词关系属于 `或||` 的关系)，所以两条数据都会出现。

    db.info.find({$text:{$search:"programmer family diary drink"}})

如果不希望 查找带有`drink`这个单词的记录，我们可以使用`-`减号来排除。

    db.info.find({$text:{$search:"programmer family diary -drink"}})

### 转义符()
`全文搜索`中`支持转义符`，比如 想 搜索的是 两个词(`love PlayGame`和`drink`)，这时候需要使用`\`反斜杠来转意。

    db.info.find({$text:{$search:"\"love PlayGame\" drink"}})

### 总结
`全文索引`在工作中比较常用,比如`博客文章`搜索、`长文件`的`关键词`搜索,都需要使用全文索引。

## 
