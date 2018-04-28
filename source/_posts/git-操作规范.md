---
title: git 操作规范
date: 2018-04-28 15:25:23
tags: git 操作规范
archives: 版本控制
categories: git
---
## 一、 创建与合并分支
1. 从master分支创建dev分支并切换到dev分支
````
  git checkout master    
  git checkout -b dev
````
+ `git checkout -b dev` 等价于：
````
  git branch dev    
  git checkout dev
````
+ 查看`本地当前分支`，分支前面带` "*" `表示当前分支，剩下的分支表示本地有的分支：
````
  git branch
````
+ 查看`远程全部分支`，白色的表示本地有的，红色的表示本地没有，仅在远程存在：
````
  git branch -a
````

2. 修改代码、提交代码(当前的操作是在dev分支上进行)
````
  git add a.html
  git commit -m "提交文件a.html"
````

3. 分支合并(将dev合并到master)
````
  git checkout master     
  git merge dev
````

4. 合并完成后，删除dev分支.(删除dev分支时，注意我们当前所在的分支不能是dev分支)
````
  git branch -d dev
````

5. 删除后，查看分支(此时看不到dev分支了)
````
  git branch
````

6. 总结 ：工作中经常从`master`创建新分支，具体操作如下：
````
  git checkout master   
  git checkout -b  issues1234   
  git push origin issues1234   
  git add ..  
  git commit -m "***"
  git push origin issues1234
````

+ 注意：将本地分支branch1推到远端的branch2操作步骤：
````
  git push origin branch1:branch2
````

7. 删除分支

  git branch -D issues1234 // 本地强制删除分支 issues1234    

  git push origin  :issues1234  //推到远程