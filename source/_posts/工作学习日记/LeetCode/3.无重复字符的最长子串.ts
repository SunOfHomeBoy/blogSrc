/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  /* 非空校验 */
  if (s.length === 0) return 0;
  /* map对象 缓存 字符串出现位置 */
  let map = {}
  /* 记录最大长度 */
  let max = 0;
  /* 记录当前窗口的起始位置 */
  let left = 0;
  for (let i = 0; i < s.length; i++) {
    /* if 字符是否重复[map对象中存在当前字符] */
    if (map.hasOwnProperty(s[i])) {
      /* 更新 left[滑动窗口左侧指针] 至 索引+1[当前重复字符右侧] */
      left = Math.max(left, map[s[i]] + 1);
    }
    /* 更新map对象中当前字符的位置为当前位置 */
    map[s[i]] = i

    max = Math.max(max, i - left + 1);
  }
  return max;
};


/**
 * 算法逻辑分析
  1. map对象 缓存 字符串出现位置
  2. max 记录 最大长度
  3. left 记录 当前窗口的起始位置
  4. 循环遍历字符串
    1. if map对象中存在当前字符, 则更新 当前窗口的起始位置(left) 为 map对象中当前字符的位置加1
    2. 更新map对象中当前字符的位置为当前位置
    3. 更新最大长度
      1. max = Math.max(max, i - left + 1); // Updates maximum length by comparing current window size (i-left+1) with previous max
      2. 公式 `i - left + 1` 用于计算当前窗口大小，其中：
        - `i` is the current right pointer position // `i` 当前右指针位置
        - `left` is the window's starting position  // `left` 窗口起始位置
        - `+1` converts from zero-based to length (since `i-left` gives the distance) // `+1` 是将基于零的索引转换为长度（因为 `i-left` 给出的是距离）
        This represents the length of current substring without repeating characters
 */
