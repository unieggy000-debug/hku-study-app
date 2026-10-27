# HKU Study App

一个面向课程复习的本地优先学习应用，支持课程切换、刷题、错题复习、英语复习、概念定义卡和冲刺学习内容。

## 主要功能

- `Practice`：按课程进行练习和错题记录
- `Study`：按章节查看双语知识卡、示意图和复习计划
- `Papers`：查看课程原卷或例题
- `Review`：错题本、英语复习和 Concept Definitions
- 多课程切换：当前包含 IDAT 7215 和 IDAT 7224 的课程结构
- 概念定义卡：输入 English term 和 English definition，生成中文辅助解释并进行间隔复习

## 本地运行

这是一个静态 HTML/CSS/JavaScript 应用，不需要构建工具即可运行。

```powershell
python -m http.server 8902
```

然后打开：

```text
http://127.0.0.1:8902/index.html
```

## Supabase / AI 功能

云端用户登录、用户数据隔离、私有文件上传和 AI 解析功能需要自行连接 Supabase 与 AI 服务。

1. 创建自己的 Supabase Project。
2. 执行 `supabase/schema.sql`。
3. 将 `supabase-config.example.js` 复制为本地的 `supabase-config.js`。
4. 填入自己的 Supabase Project URL 和 publishable/anon key。
5. 自己实现或接入 AI Provider 的后端函数。

项目不会内置任何 AI API key，也不会提供共享 API。AI API key 必须保存在服务器端 Secret 中，不能写入前端 JavaScript、公开仓库或浏览器 localStorage。

## 隐私和安全

- 不要上传 `.env`、密码、Token、Service Role Key 或 AI API Key。
- 不要把私人录音、课程原始资料或包含个人信息的文件提交到公开仓库。
- Supabase 的 `service_role` key 只能放在后端，绝不能放进网页。
- 用户文件应放在 private Storage bucket，并使用用户 ID 和 RLS 隔离。
- 发布前请检查 Git 历史，避免密钥曾经被提交后仍可被恢复。

## 项目结构

```text
index.html                 Practice 首页
study-plan.html            Study 页面
papers.html                Papers 页面
review.html                Review 页面
7224-study/                IDAT 7224 学习资料模块
supabase/schema.sql        Supabase 数据表、RLS 和私有存储策略
supabase-config.example.js 配置模板，不含真实密钥
.github/workflows/         GitHub Pages 部署配置
```

## License / course materials

本仓库中的应用代码仅用于学习和 Demo。课程 PPT、录音、图片和题目资料可能受课程平台或教师版权限制，公开部署前请确认拥有相应的分享权限。
