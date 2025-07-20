# 环境配置说明

本项目支持多环境配置，包括开发环境、预发布环境和生产环境。

## 环境类型

### 开发环境 (Development)
- **用途**: 本地开发和调试
- **API地址**: `http://localhost:8000`
- **特点**: 启用调试模式、模拟数据、详细日志

### 预发布环境 (Staging)
- **用途**: 测试和验证
- **API地址**: `https://staging-api.producthot.top`
- **特点**: 接近生产环境的配置，但保留部分调试功能

### 生产环境 (Production)
- **用途**: 正式发布
- **API地址**: `https://api.producthot.top`
- **特点**: 最优性能配置，禁用调试功能，启用安全特性

## 环境配置文件

### 环境变量文件
- `.env.development` - 开发环境配置
- `.env.staging` - 预发布环境配置
- `.env.production` - 生产环境配置
- `.env.example` - 环境变量模板

### 配置文件
- `src/config/environment.ts` - 环境配置定义
- `src/utils/environment.ts` - 环境工具类
- `src/components/EnvironmentBadge.tsx` - 环境状态显示组件

## 使用方法

### 1. 设置环境变量
复制 `.env.example` 为 `.env.local` 并根据需要修改：
```bash
cp .env.example .env.local
```

### 2. 运行不同环境

#### 开发环境
```bash
npm run dev                # 默认开发环境
npm run dev:staging        # 预发布环境
npm run dev:prod          # 生产环境
```

#### 构建不同环境
```bash
npm run build             # 默认生产环境构建
npm run build:dev         # 开发环境构建
npm run build:staging     # 预发布环境构建
npm run build:prod        # 生产环境构建
```

#### 预览不同环境
```bash
npm run preview           # 默认预览
npm run preview:dev       # 开发环境预览
npm run preview:staging   # 预发布环境预览
npm run preview:prod      # 生产环境预览
```

### 3. 在代码中使用环境配置

#### 使用环境工具类
```typescript
import { EnvironmentUtils } from '@/utils/environment';

// 检查环境
if (EnvironmentUtils.isDev()) {
  console.log('开发环境');
}

// 获取配置
const apiUrl = EnvironmentUtils.getApiBaseUrl();
const isDebug = EnvironmentUtils.isDebugEnabled();

// 条件执行
EnvironmentUtils.runByEnvironment({
  development: () => console.log('开发环境逻辑'),
  production: () => console.log('生产环境逻辑'),
  default: () => console.log('默认逻辑')
});

// 环境日志
EnvironmentUtils.debug('调试信息');
EnvironmentUtils.info('普通信息');
EnvironmentUtils.warn('警告信息');
EnvironmentUtils.error('错误信息');
```

#### 直接使用环境配置
```typescript
import { config, getCurrentEnvironment } from '@/config/environment';

const currentEnv = getCurrentEnvironment();
const apiConfig = config.api;
```

### 4. 环境状态显示

在非生产环境下，应用会显示：
- **环境徽章**: 右上角显示当前环境
- **环境面板**: 右下角齿轮按钮，点击查看详细配置

## 环境变量说明

### 应用配置
- `VITE_APP_ENV`: 应用环境 (development/staging/production)
- `VITE_APP_NAME`: 应用名称
- `VITE_APP_VERSION`: 应用版本
- `VITE_APP_DESCRIPTION`: 应用描述

### API 配置
- `VITE_API_BASE_URL`: API 基础地址

### 功能开关
- `VITE_ENABLE_DEBUG`: 启用调试模式
- `VITE_ENABLE_ANALYTICS`: 启用分析统计
- `VITE_ENABLE_ERROR_REPORTING`: 启用错误报告
- `VITE_ENABLE_MOCK_DATA`: 启用模拟数据

### 日志配置
- `VITE_LOG_LEVEL`: 日志级别 (debug/info/warn/error)
- `VITE_ENABLE_CONSOLE_LOG`: 启用控制台日志
- `VITE_ENABLE_REMOTE_LOG`: 启用远程日志

### 性能配置
- `VITE_ENABLE_CACHING`: 启用缓存
- `VITE_CACHE_TIMEOUT`: 缓存超时时间 (毫秒)
- `VITE_ENABLE_LAZY_LOADING`: 启用懒加载

### 安全配置
- `VITE_ENABLE_CSP`: 启用内容安全策略
- `VITE_ENABLE_HTTPS`: 启用 HTTPS
- `VITE_TOKEN_EXPIRY`: Token 过期时间 (毫秒)

## 最佳实践

### 1. 环境隔离
- 不同环境使用不同的 API 地址
- 生产环境禁用调试功能
- 开发环境启用详细日志

### 2. 配置管理
- 敏感信息不要提交到版本控制
- 使用 `.env.local` 覆盖默认配置
- 定期更新环境配置文档

### 3. 部署策略
- 开发环境：自动部署，启用所有调试功能
- 预发布环境：手动部署，接近生产配置
- 生产环境：严格审核，最优性能配置

### 4. 监控和日志
- 开发环境：详细的控制台日志
- 预发布环境：远程日志 + 控制台日志
- 生产环境：仅远程日志，错误级别

## 故障排除

### 1. 环境变量不生效
- 检查文件名是否正确 (`.env.development` 等)
- 确保变量名以 `VITE_` 开头
- 重启开发服务器

### 2. API 请求失败
- 检查 `VITE_API_BASE_URL` 配置
- 确认 API 服务器是否运行
- 查看网络请求日志

### 3. 环境显示组件不显示
- 确认不是生产环境
- 检查组件是否正确导入
- 查看控制台错误信息

## 相关文件

- [环境配置](./src/config/environment.ts)
- [环境工具类](./src/utils/environment.ts)
- [环境显示组件](./src/components/EnvironmentBadge.tsx)
- [API 配置](./src/services/api/config.ts)
- [包配置](./package.json)