root@t-desktop:/data/llama-cuda/build# ./bin/llama-server -m ../models/qwen/model.gguf
ggml_cuda_init: GGML_CUDA_FORCE_MMQ:    no
ggml_cuda_init: GGML_CUDA_FORCE_CUBLAS: no
ggml_cuda_init: found 1 CUDA devices:
  Device 0: Orin, compute capability 8.7, VMM: yes
build: 5489 (2d38b6e4) with cc (Ubuntu 9.4.0-1ubuntu1~20.04.2) 9.4.0 for aarch64-linux-gnu
system info: n_threads = 8, n_threads_batch = 8, total_threads = 8

system_info: n_threads = 8 (n_threads_batch = 8) / 8 | CUDA : USE_GRAPHS = 1 | PEER_MAX_BATCH_SIZE = 128 | CPU : NEON = 1 | ARM_FMA = 1 | LLAMAFILE = 1 | OPENMP = 1 | AARCH64_REPACK = 1 | 

main: binding port with default address family
main: HTTP server is listening, hostname: 127.0.0.1, port: 8080, http threads: 7
main: loading model
srv    load_model: loading model '../models/qwen/model.gguf'
srv  log_server_r: request: POST /completion 127.0.0.1 503
srv  log_server_r: request: POST /completion 127.0.0.1 503
srv  log_server_r: request: POST /completion 127.0.0.1 503
llama_model_load_from_file_impl: using device CUDA0 (Orin) - 22926 MiB free
llama_model_loader: loaded meta data with 27 key-value pairs and 311 tensors from ../models/qwen/model.gguf (version GGUF V3 (latest))
llama_model_loader: Dumping metadata keys/values. Note: KV overrides do not apply in this output.
llama_model_loader: - kv   0:                       general.architecture str              = qwen3
llama_model_loader: - kv   1:                               general.type str              = model
llama_model_loader: - kv   2:                               general.name str              = Qwen3 0.6B
llama_model_loader: - kv   3:                           general.basename str              = Qwen3
llama_model_loader: - kv   4:                         general.size_label str              = 0.6B
llama_model_loader: - kv   5:                          qwen3.block_count u32              = 28
llama_model_loader: - kv   6:                       qwen3.context_length u32              = 40960
llama_model_loader: - kv   7:                     qwen3.embedding_length u32              = 1024
llama_model_loader: - kv   8:                  qwen3.feed_forward_length u32              = 3072
llama_model_loader: - kv   9:                 qwen3.attention.head_count u32              = 16
llama_model_loader: - kv  10:              qwen3.attention.head_count_kv u32              = 8
llama_model_loader: - kv  11:                       qwen3.rope.freq_base f32              = 1000000.000000
llama_model_loader: - kv  12:     qwen3.attention.layer_norm_rms_epsilon f32              = 0.000001
llama_model_loader: - kv  13:                 qwen3.attention.key_length u32              = 128
llama_model_loader: - kv  14:               qwen3.attention.value_length u32              = 128
llama_model_loader: - kv  15:                       tokenizer.ggml.model str              = gpt2
llama_model_loader: - kv  16:                         tokenizer.ggml.pre str              = qwen2
llama_model_loader: - kv  17:                      tokenizer.ggml.tokens arr[str,151936]  = ["!", "\"", "#", "$", "%", "&", "'", ...
llama_model_loader: - kv  18:                  tokenizer.ggml.token_type arr[i32,151936]  = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...
llama_model_loader: - kv  19:                      tokenizer.ggml.merges arr[str,151387]  = ["Ġ Ġ", "ĠĠ ĠĠ", "i n", "Ġ t",...
llama_model_loader: - kv  20:                tokenizer.ggml.eos_token_id u32              = 151645
llama_model_loader: - kv  21:            tokenizer.ggml.padding_token_id u32              = 151643
llama_model_loader: - kv  22:                tokenizer.ggml.bos_token_id u32              = 151643
llama_model_loader: - kv  23:               tokenizer.ggml.add_bos_token bool             = false
llama_model_loader: - kv  24:                    tokenizer.chat_template str              = {%- if tools %}\n    {{- '<|im_start|>...
llama_model_loader: - kv  25:               general.quantization_version u32              = 2
llama_model_loader: - kv  26:                          general.file_type u32              = 15
llama_model_loader: - type  f32:  113 tensors
llama_model_loader: - type q4_K:  169 tensors
llama_model_loader: - type q6_K:   29 tensors
print_info: file format = GGUF V3 (latest)
print_info: file type   = Q4_K - Medium
print_info: file size   = 456.11 MiB (5.09 BPW) 
load: special tokens cache size = 26
load: token to piece cache size = 0.9311 MB
print_info: arch             = qwen3
print_info: vocab_only       = 0
print_info: n_ctx_train      = 40960
print_info: n_embd           = 1024
print_info: n_layer          = 28
print_info: n_head           = 16
print_info: n_head_kv        = 8
print_info: n_rot            = 128
print_info: n_swa            = 0
print_info: is_swa_any       = 0
print_info: n_embd_head_k    = 128
print_info: n_embd_head_v    = 128
print_info: n_gqa            = 2
print_info: n_embd_k_gqa     = 1024
print_info: n_embd_v_gqa     = 1024
print_info: f_norm_eps       = 0.0e+00
print_info: f_norm_rms_eps   = 1.0e-06
print_info: f_clamp_kqv      = 0.0e+00
print_info: f_max_alibi_bias = 0.0e+00
print_info: f_logit_scale    = 0.0e+00
print_info: f_attn_scale     = 0.0e+00
print_info: n_ff             = 3072
print_info: n_expert         = 0
print_info: n_expert_used    = 0
print_info: causal attn      = 1
print_info: pooling type     = 0
print_info: rope type        = 2
print_info: rope scaling     = linear
print_info: freq_base_train  = 1000000.0
print_info: freq_scale_train = 1
print_info: n_ctx_orig_yarn  = 40960
print_info: rope_finetuned   = unknown
print_info: ssm_d_conv       = 0
print_info: ssm_d_inner      = 0
print_info: ssm_d_state      = 0
print_info: ssm_dt_rank      = 0
print_info: ssm_dt_b_c_rms   = 0
print_info: model type       = 0.6B
print_info: model params     = 751.63 M
print_info: general.name     = Qwen3 0.6B
print_info: vocab type       = BPE
print_info: n_vocab          = 151936
print_info: n_merges         = 151387
print_info: BOS token        = 151643 '<|endoftext|>'
print_info: EOS token        = 151645 '<|im_end|>'
print_info: EOT token        = 151645 '<|im_end|>'
print_info: PAD token        = 151643 '<|endoftext|>'
print_info: LF token         = 198 'Ċ'
print_info: FIM PRE token    = 151659 '<|fim_prefix|>'
print_info: FIM SUF token    = 151661 '<|fim_suffix|>'
print_info: FIM MID token    = 151660 '<|fim_middle|>'
print_info: FIM PAD token    = 151662 '<|fim_pad|>'
print_info: FIM REP token    = 151663 '<|repo_name|>'
print_info: FIM SEP token    = 151664 '<|file_sep|>'
print_info: EOG token        = 151643 '<|endoftext|>'
print_info: EOG token        = 151645 '<|im_end|>'
print_info: EOG token        = 151662 '<|fim_pad|>'
print_info: EOG token        = 151663 '<|repo_name|>'
print_info: EOG token        = 151664 '<|file_sep|>'
print_info: max token length = 256
load_tensors: loading model tensors, this can take a while... (mmap = true)
load_tensors: offloading 0 repeating layers to GPU
load_tensors: offloaded 0/29 layers to GPU
load_tensors:   CPU_Mapped model buffer size =   456.11 MiB
..........................................................
llama_context: constructing llama_context
llama_context: n_seq_max     = 1
llama_context: n_ctx         = 4096
llama_context: n_ctx_per_seq = 4096
llama_context: n_batch       = 2048
llama_context: n_ubatch      = 512
llama_context: causal_attn   = 1
llama_context: flash_attn    = 0
llama_context: freq_base     = 1000000.0
llama_context: freq_scale    = 1
llama_context: n_ctx_per_seq (4096) < n_ctx_train (40960) -- the full capacity of the model will not be utilized
llama_context:        CPU  output buffer size =     0.58 MiB
llama_kv_cache_unified:        CPU KV buffer size =   448.00 MiB
llama_kv_cache_unified: size =  448.00 MiB (  4096 cells,  28 layers,  1 seqs), K (f16):  224.00 MiB, V (f16):  224.00 MiB
llama_context:      CUDA0 compute buffer size =   422.92 MiB
llama_context:  CUDA_Host compute buffer size =    12.01 MiB
llama_context: graph nodes  = 1126
llama_context: graph splits = 368 (with bs=512), 1 (with bs=1)
common_init_from_params: setting dry_penalty_last_n to ctx_size = 4096
common_init_from_params: warming up the model with an empty run - please wait ... (--no-warmup to disable)
srv          init: initializing slots, n_slots = 1
slot         init: id  0 | task -1 | new slot n_ctx_slot = 4096
main: model loaded
main: chat template, chat_template: {%- if tools %}
    {{- '<|im_start|>system\n' }}
    {%- if messages[0].role == 'system' %}
        {{- messages[0].content + '\n\n' }}
    {%- endif %}
    {{- "# Tools\n\nYou may call one or more functions to assist with the user query.\n\nYou are provided with function signatures within <tools></tools> XML tags:\n<tools>" }}
    {%- for tool in tools %}
        {{- "\n" }}
        {{- tool | tojson }}
    {%- endfor %}
    {{- "\n</tools>\n\nFor each function call, return a json object with function name and arguments within <tool_call></tool_call> XML tags:\n<tool_call>\n{\"name\": <function-name>, \"arguments\": <args-json-object>}\n</tool_call><|im_end|>\n" }}
{%- else %}
    {%- if messages[0].role == 'system' %}
        {{- '<|im_start|>system\n' + messages[0].content + '<|im_end|>\n' }}
    {%- endif %}
{%- endif %}
{%- set ns = namespace(multi_step_tool=true, last_query_index=messages|length - 1) %}
{%- for message in messages[::-1] %}
    {%- set index = (messages|length - 1) - loop.index0 %}
    {%- if ns.multi_step_tool and message.role == "user" and not(message.content.startswith('<tool_response>') and message.content.endswith('</tool_response>')) %}
        {%- set ns.multi_step_tool = false %}
        {%- set ns.last_query_index = index %}
    {%- endif %}
{%- endfor %}
{%- for message in messages %}
    {%- if (message.role == "user") or (message.role == "system" and not loop.first) %}
        {{- '<|im_start|>' + message.role + '\n' + message.content + '<|im_end|>' + '\n' }}
    {%- elif message.role == "assistant" %}
        {%- set content = message.content %}
        {%- set reasoning_content = '' %}
        {%- if message.reasoning_content is defined and message.reasoning_content is not none %}
            {%- set reasoning_content = message.reasoning_content %}
        {%- else %}
            {%- if '</think>' in message.content %}
                {%- set content = message.content.split('</think>')[-1].lstrip('\n') %}
                {%- set reasoning_content = message.content.split('</think>')[0].rstrip('\n').split('<think>')[-1].lstrip('\n') %}
            {%- endif %}
        {%- endif %}
        {%- if loop.index0 > ns.last_query_index %}
            {%- if loop.last or (not loop.last and reasoning_content) %}
                {{- '<|im_start|>' + message.role + '\n<think>\n' + reasoning_content.strip('\n') + '\n</think>\n\n' + content.lstrip('\n') }}
            {%- else %}
                {{- '<|im_start|>' + message.role + '\n' + content }}
            {%- endif %}
        {%- else %}
            {{- '<|im_start|>' + message.role + '\n' + content }}
        {%- endif %}
        {%- if message.tool_calls %}
            {%- for tool_call in message.tool_calls %}
                {%- if (loop.first and content) or (not loop.first) %}
                    {{- '\n' }}
                {%- endif %}
                {%- if tool_call.function %}
                    {%- set tool_call = tool_call.function %}
                {%- endif %}
                {{- '<tool_call>\n{"name": "' }}
                {{- tool_call.name }}
                {{- '", "arguments": ' }}
                {%- if tool_call.arguments is string %}
                    {{- tool_call.arguments }}
                {%- else %}
                    {{- tool_call.arguments | tojson }}
                {%- endif %}
                {{- '}\n</tool_call>' }}
            {%- endfor %}
        {%- endif %}
        {{- '<|im_end|>\n' }}
    {%- elif message.role == "tool" %}
        {%- if loop.first or (messages[loop.index0 - 1].role != "tool") %}
            {{- '<|im_start|>user' }}
        {%- endif %}
        {{- '\n<tool_response>\n' }}
        {{- message.content }}
        {{- '\n</tool_response>' }}
        {%- if loop.last or (messages[loop.index0 + 1].role != "tool") %}
            {{- '<|im_end|>\n' }}
        {%- endif %}
    {%- endif %}
{%- endfor %}
{%- if add_generation_prompt %}
    {{- '<|im_start|>assistant\n' }}
    {%- if enable_thinking is defined and enable_thinking is false %}
        {{- '<think>\n\n</think>\n\n' }}
    {%- endif %}
{%- endif %}, example_format: '<|im_start|>system
You are a helpful assistant<|im_end|>
<|im_start|>user
Hello<|im_end|>
<|im_start|>assistant
Hi there<|im_end|>
<|im_start|>user
How are you?<|im_end|>
<|im_start|>assistant
'
main: server is listening on http://127.0.0.1:8080 - starting the main loop
srv  update_slots: all slots are idle
slot launch_slot_: id  0 | task 0 | processing task
slot update_slots: id  0 | task 0 | new prompt, n_ctx_slot = 4096, n_keep = 0, n_prompt_tokens = 4
slot update_slots: id  0 | task 0 | kv cache rm [0, end)
slot update_slots: id  0 | task 0 | prompt processing progress, n_past = 4, n_tokens = 4, progress = 1.000000
slot update_slots: id  0 | task 0 | prompt done, n_past = 4, n_tokens = 4
slot      release: id  0 | task 0 | stop processing: n_past = 131, truncated = 0
slot print_timing: id  0 | task 0 | 
prompt eval time =     410.44 ms /     4 tokens (  102.61 ms per token,     9.75 tokens per second)
       eval time =   25055.10 ms /   128 tokens (  195.74 ms per token,     5.11 tokens per second)
      total time =   25465.54 ms /   132 tokens
srv  update_slots: all slots are idle
srv  log_server_r: request: POST /completion 127.0.0.1 200


---

# [接口输出]()
```json
{
    "index": 0,
    "content": "",
    "tokens": [],
    "id_slot": 0,
    "stop": true,
    "model": "gpt-3.5-turbo",
    "tokens_predicted": 128,
    "tokens_evaluated": 4,
    "generation_settings": {
        "n_predict": 128,
        "seed": 4294967295,
        "temperature": 0.800000011920929,
        "dynatemp_range": 0.0,
        "dynatemp_exponent": 1.0,
        "top_k": 40,
        "top_p": 0.949999988079071,
        "min_p": 0.05000000074505806,
        "top_n_sigma": -1.0,
        "xtc_probability": 0.0,
        "xtc_threshold": 0.10000000149011612,
        "typical_p": 1.0,
        "repeat_last_n": 64,
        "repeat_penalty": 1.0,
        "presence_penalty": 0.0,
        "frequency_penalty": 0.0,
        "dry_multiplier": 0.0,
        "dry_base": 1.75,
        "dry_allowed_length": 2,
        "dry_penalty_last_n": 4096,
        "dry_sequence_breakers": [
            "\n",
            ":",
            "\"",
            "*"
        ],
        "mirostat": 0,
        "mirostat_tau": 5.0,
        "mirostat_eta": 0.10000000149011612,
        "stop": [],
        "max_tokens": 128,
        "n_keep": 0,
        "n_discard": 0,
        "ignore_eos": false,
        "stream": true,
        "logit_bias": [],
        "n_probs": 0,
        "min_keep": 0,
        "grammar": "",
        "grammar_lazy": false,
        "grammar_triggers": [],
        "preserved_tokens": [],
        "chat_format": "Content-only",
        "reasoning_format": "deepseek",
        "reasoning_in_content": true,
        "thinking_forced_open": false,
        "samplers": [
            "penalties",
            "dry",
            "top_n_sigma",
            "top_k",
            "typ_p",
            "top_p",
            "min_p",
            "xtc",
            "temperature"
        ],
        "speculative.n_max": 16,
        "speculative.n_min": 0,
        "speculative.p_min": 0.75,
        "timings_per_token": false,
        "post_sampling_probs": false,
        "lora": []
    },
    "prompt": "你好，请自我介绍一下",
    "has_new_line": true,
    "truncated": false,
    "stop_type": "limit",
    "stopping_word": "",
    "tokens_cached": 131,
    "timings": {
        "prompt_n": 1,
        "prompt_ms": 177.748,
        "prompt_per_token_ms": 177.748,
        "prompt_per_second": 5.625942345342845,
        "predicted_n": 128,
        "predicted_ms": 28994.201,
        "predicted_per_token_ms": 226.5171953125,
        "predicted_per_second": 4.414675886395352
    }
}
```