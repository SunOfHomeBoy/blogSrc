def parse(json_str)
  parsed = json.loads(json_str)
  logger.info(f"解析后的JSON对象: {parsed}")

  # 如果 响应类型为 json, 但是 没有 action 字段 || action 为空
  # 1. 这种 json 如何处理？
      # 使用输出解析器（Output Parser）来规范化模型输出
      # 在Agent中启用错误处理机制，如handle_parsing_errors=True
      # 为模型提供更明确的提示词，明确要求输出格式
      prompt = (
          "请严格按照以下JSON格式输出，不要包含其他内容：\n"
          "{\n"
          '  "action": "工具名称",\n'
          '  "action_input": "工具输入"\n'
          "}\n"
          "如果不需要调用工具，请直接返回：\n"
          "{\n"
          '  "action": "Final Answer",\n'
          '  "action_input": "最终答案"\n'
          "}"
      )
      # 实现重试机制，当解析失败时重新请求模型生成输出
      # 添加默认处理逻辑，当action为空时执行默认操作或返回错误信息

  if "action" not in parsed or not parsed.get("action"):
      # Handle the case where action field is missing or empty
      logger.warning("Missing or empty 'action' field in parsed JSON")
      # You can choose to return a default action, raise an exception,
      # or implement a retry mechanism here
      return AgentFinish(
          return_values={"output": "Invalid response format"},
          log="Missing or empty 'action' field"
      )
  # 检查是否是Final Answer
  if parsed.get("action") == "Final Answer":
      return AgentFinish(
          return_values={"output": parsed["action_input"]},
          log=cleaned_text
      )
  else:
      return AgentAction(
          tool=parsed["action"],
          tool_input=parsed["action_input"],
          log=cleaned_text
      )
