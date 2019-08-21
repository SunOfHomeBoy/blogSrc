---
title: git 删除远程文件/目录
date: 2018-04-28 16:27:48
tags: git 删除
archives: 版本控制
categories: git
---
# git删除远程仓库的文件或目录
删除a目录下的2.txt文件   
````
git rm -r --cached a/2.txt
````

删除a目录
    
    git rm -r --cached a
    
    git commit -m "删除a目录下的2.txt文件" 
    git push


**Note:**

用`-r`参数删除目录, `git rm --cached a.txt` 删除的是本地仓库中的文件，且`本地工作区`的文件会`保留`且`不再与远程仓库发生跟踪关系`，如果本地仓库中的文件也要删除则用`git rm a.txt`