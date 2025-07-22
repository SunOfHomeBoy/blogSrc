---
title: LeetCode刷题笔记
date: 2025年7月22日 17:38:54
update:
tags: LeetCode
categories: LeetCode 笔记
---
# LeetCode刷题笔记
  3. 无重复字符的最长子串
    + 滑动窗口解法
      1. map对象 缓存 字符串出现位置
      2. max 记录最大长度
      3. left 记录当前窗口的起始位置
      4. 循环遍历字符串
         1. map对象中存在当前字符，则更新当前窗口的起始位置为map对象中当前字符的位置加1
         2. <!-- map对象中不存在当前字符，则 -->更新map对象中当前字符的位置为当前位置
         3. 更新最大长度
            1. max = Math.max(max, i - left + 1); // Updates maximum length by comparing current window size (i-left+1) with previous max
            2. 公式 `i - left + 1` 用于计算当前窗口大小，其中：
               - `i` is the current right pointer position
               - `left` is the window's starting position
               - `+1` converts from zero-based to length (since `i-left` gives the distance)
               This represents the length of current substring without repeating characters
