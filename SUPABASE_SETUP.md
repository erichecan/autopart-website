# Supabase 配置指南

本项目已经集成了 Supabase 作为后端数据库，支持多语言产品和分类管理。请按照以下步骤配置您的 Supabase 项目。

## 🚀 快速开始

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/) 并注册账号
2. 点击 "New Project" 创建新项目
3. 选择组织和数据库区域（建议选择离您用户最近的区域）
4. 设置数据库密码并等待项目创建完成

### 2. 获取项目配置信息

项目创建完成后，在项目设置页面获取以下信息：

- **项目 URL**: `https://your-project-id.supabase.co`
- **Anon Key**: 在 Settings → API 页面找到 `anon` `public` key

### 3. 配置环境变量

在项目根目录的 `.env.local` 文件中配置 Supabase 连接信息：

```bash
# Supabase 配置
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. 创建数据库表

在 Supabase 项目的 SQL Editor 中执行 `supabase-schema.sql` 文件中的所有 SQL 语句：

1. 打开 Supabase 项目
2. 点击左侧菜单的 "SQL Editor"
3. 点击 "New Query"
4. 复制并粘贴 `supabase-schema.sql` 文件的全部内容
5. 点击 "Run" 执行 SQL

## 📊 数据库架构

### 核心表结构

#### 1. categories (分类表)
- `id`: 主键 (UUID)
- `slug`: URL友好的标识符 (如 'engine', 'brake')
- `icon`: 表情符号图标
- `sort_order`: 排序顺序
- `created_at`, `updated_at`: 时间戳

#### 2. category_translations (分类翻译表)
- `id`: 主键 (UUID)
- `category_id`: 关联分类ID
- `language`: 语言代码 ('zh', 'en', 'fr', 'es', 'ar')
- `name`: 分类名称

#### 3. products (产品表)
- `id`: 主键 (UUID)
- `category_id`: 关联分类ID
- `slug`: 产品标识符
- `oemCode`: OEM代码
- `price`: 价格 (DECIMAL)
- `moq`: 最小起订量 (INTEGER)
- `image`: 图片URL
- `featured`: 是否推荐 (BOOLEAN)
- `status`: 状态 ('active', 'inactive')

#### 4. product_translations (产品翻译表)
- `id`: 主键 (UUID)
- `product_id`: 关联产品ID
- `language`: 语言代码
- `name`: 产品名称
- `description`: 产品描述

## 🌐 多语言支持

### 自动翻译机制

当您在 CMS 中添加或编辑产品/分类时：

1. **输入中文**: 您只需要输入中文名称和描述
2. **自动生成**: 系统会自动生成英文、法文、西班牙文、阿拉伯文版本
3. **专业词汇**: 系统内置汽车配件专业词汇翻译字典
4. **支持语言**:
   - 🇨🇳 中文 (zh)
   - 🇺🇸 英文 (en)
   - 🇫🇷 法文 (fr)
   - 🇪🇸 西班牙文 (es)
   - 🇸🇦 阿拉伯文 (ar) - 支持RTL显示

### 翻译质量说明

- **汽车配件术语**: 使用专业翻译字典，确保行业术语准确
- **通用词汇**: 自动匹配常用商业术语
- **未匹配词汇**: 显示为 `原文 (语言代码)` 格式，可后续手动优化

## 🔧 CMS 功能特性

### 产品管理
- ✅ 中文输入，多语言自动生成
- ✅ 图片上传支持
- ✅ OEM代码管理
- ✅ 价格和MOQ设置
- ✅ 产品状态管理 (启用/禁用)
- ✅ 推荐产品标记
- ✅ 分类关联

### 分类管理
- ✅ 中文输入，多语言自动生成
- ✅ 表情符号图标选择
- ✅ 排序功能
- ✅ 产品数量统计

### 前端展示
- ✅ 多语言切换
- ✅ RTL支持 (阿拉伯文)
- ✅ 响应式设计
- ✅ 实时数据加载

## 🔐 安全配置

### 行级安全策略 (RLS)

数据库已启用 RLS 策略：

- **读取权限**: 所有用户可以读取产品和分类数据
- **写入权限**: 只有认证用户可以修改数据 (用于CMS)

### CMS 访问控制

- **访问地址**: `http://localhost:5173/admin`
- **演示账号**: 
  - 用户名: `admin`
  - 密码: `admin123`

## 🚀 部署建议

### Netlify 部署
1. 在 Netlify 项目设置中添加环境变量
2. 确保 `REACT_APP_SUPABASE_URL` 和 `REACT_APP_SUPABASE_ANON_KEY` 正确配置
3. 部署后 CMS 和前端都将正常工作

### Vercel 部署
1. 在 Vercel 项目设置中添加环境变量
2. 确保环境变量名称正确（必须以 `REACT_APP_` 开头）

## 📈 性能优化

### 数据库索引
SQL schema 已包含必要的索引：
- 分类 slug 索引
- 产品 slug 索引
- 翻译表的 (entity_id, language) 联合索引

### 前端优化
- 使用 React.memo 优化组件渲染
- 实现数据缓存机制
- 支持懒加载

## 🔧 故障排除

### 常见问题

1. **连接失败**
   - 检查环境变量是否正确配置
   - 确认 Supabase 项目 URL 和 API Key 正确

2. **表不存在**
   - 确保已执行 `supabase-schema.sql` 文件
   - 检查 SQL 执行是否成功

3. **权限错误**
   - 确认 RLS 策略已正确设置
   - 检查 API Key 是否为 `anon` key

4. **多语言显示问题**
   - 确认翻译数据已正确创建
   - 检查语言代码是否正确 ('zh', 'en', 'fr', 'es', 'ar')

### 调试建议

1. 打开浏览器开发者工具查看网络请求
2. 检查 Supabase 项目的 Logs 页面
3. 在代码中添加 console.log 输出调试信息

## 🎯 下一步

1. 配置完成后，访问 `/admin` 测试 CMS 功能
2. 添加您的第一个产品分类
3. 创建产品并测试多语言生成
4. 在前端验证多语言显示效果

如有问题，请检查浏览器控制台错误信息或查看 Supabase 项目日志。