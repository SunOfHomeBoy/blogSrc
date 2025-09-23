<!--
 * @Description:
 * @Date: 2025-09-23 10:18:38
 * @LastEditTime: 2025-09-23 10:30:24
 * @FilePath: \blogSrc\source\_posts\工作学习日记\25年\9月\git配置lfs追踪.md
-->
# 大文件加入Git LFS

## 首先，检查Git LFS是否安装
  > git lfs --version
  如果没安装
  Mac: brew install git-lfs
  Windows: choco install git-lfs
  Linux看发行版的包管理器。

## 然后，在Git仓库根目录初始化Git LFS
  > git lfs install # 这一步是设置仓库的LFS钩子

## 接下来，确定要跟踪的大文件类型或者具体文件
  可用git lfs track命令。
  + 比如要`跟踪所有.rar文件`
    > git lfs track "*.rar"
  + 如果是`特定文件`，比如这个“前端面试之道 2.2.rar”
    > git lfs track "source/_posts/读书笔记/变通：受用一生的学问.zip"

## 执行track命令后，会生成一个`.gitattributes`文件，里面记录了跟踪的规则。这时候要把`.gitattributes`也加入版本控制，因为它是LFS的关键配置。

## 然后，添加要跟踪的文件到暂存区，比如git add `.gitattributes` 和 git add 要跟踪的大文件。注意，必须先add `.gitattributes`，再add大文件，确保跟踪规则生效。
  提交：
    > git commit -m "Add large file to LFS"
  推送到远程仓库：
    > git push origin 分支名
