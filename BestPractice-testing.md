# 测试最佳实践指南

## 目录

- [测试策略](#测试策略)
- [测试环境配置](#测试环境配置)
- [单元测试](#单元测试)
- [集成测试](#集成测试)
- [E2E测试](#e2e测试)
- [测试工具](#测试工具)
- [测试覆盖率](#测试覆盖率)
- [性能测试](#性能测试)
- [可访问性测试](#可访问性测试)
- [最佳实践](#最佳实践)

## 测试策略

### 1. 测试金字塔

```
    /\
   /  \     E2E Tests (少量)
  /____\    
 /      \   Integration Tests (适量)
/__________\ Unit Tests (大量)
```

### 2. 测试分层

```typescript
// 测试分层策略
interface TestingStrategy {
  unit: {
    coverage: '70-80%';
    focus: ['纯函数', '工具类', '组件逻辑'];
    tools: ['Jest', 'React Testing Library'];
  };
  integration: {
    coverage: '15-25%';
    focus: ['API集成', '状态管理', '组件交互'];
    tools: ['Jest', 'MSW', 'React Testing Library'];
  };
  e2e: {
    coverage: '5-15%';
    focus: ['关键用户流程', '跨浏览器兼容性'];
    tools: ['Playwright', 'Cypress'];
  };
}
```

## 测试环境配置

### 1. 依赖安装

```json
// package.json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "jest": "^29.3.1",
    "jest-environment-jsdom": "^29.3.1",
    "msw": "^0.49.2",
    "playwright": "^1.28.1",
    "@types/jest": "^29.2.4",
    "vitest": "^0.25.8",
    "@vitest/ui": "^0.25.8"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:watch": "vitest --watch"
  }
}
```

### 2. Vitest 配置

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

### 3. 测试环境设置

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// 启动 MSW 服务器
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 模拟 localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// 模拟 matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

## 单元测试

### 1. 组件测试

```typescript
// src/components/ui/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-lg');
  });
});
```

### 2. Hook 测试

```typescript
// src/hooks/useNewsStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useNewsStore } from '../store';

describe('useNewsStore', () => {
  beforeEach(() => {
    useNewsStore.getState().reset();
  });

  it('initializes with empty news list', () => {
    const { result } = renderHook(() => useNewsStore());
    expect(result.current.news).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('sets loading state when fetching news', async () => {
    const { result } = renderHook(() => useNewsStore());
    
    act(() => {
      result.current.fetchNews();
    });

    expect(result.current.loading).toBe(true);
  });

  it('updates news list after successful fetch', async () => {
    const mockNews = [
      { id: 1, title: 'Test News', summary: 'Test Summary' }
    ];

    const { result } = renderHook(() => useNewsStore());
    
    await act(async () => {
      await result.current.setNews(mockNews);
    });

    expect(result.current.news).toEqual(mockNews);
    expect(result.current.loading).toBe(false);
  });
});
```

### 3. 工具函数测试

```typescript
// src/utils/formatters.test.ts
import { formatDate, formatNumber, truncateText } from './formatters';

describe('Formatters', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2023-12-01T10:30:00Z');
      expect(formatDate(date)).toBe('2023-12-01');
    });

    it('handles invalid dates', () => {
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('formatNumber', () => {
    it('formats large numbers with K suffix', () => {
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1000000)).toBe('1M');
    });

    it('returns original number for small values', () => {
      expect(formatNumber(999)).toBe('999');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    it('returns original text if shorter than limit', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });
  });
});
```

## 集成测试

### 1. API 集成测试

```typescript
// src/test/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/news', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 1,
            title: 'Test News',
            summary: 'Test Summary',
            date: '2023-12-01',
            views: 100,
            likes: 10
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1
        }
      })
    );
  }),

  rest.post('/api/news/:id/like', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),

  rest.get('/api/channels', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { id: '1', name: 'Tech News', description: 'Technology updates' }
        ]
      })
    );
  })
];
```

```typescript
// src/test/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### 2. 组件集成测试

```typescript
// src/components/news/NewsCard.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewsCard } from './NewsCard';
import { TestWrapper } from '../../test/TestWrapper';

const mockNews = {
  id: 1,
  title: 'Test News Title',
  summary: 'Test news summary',
  date: '2023-12-01',
  views: 100,
  likes: 10,
  link: 'https://example.com'
};

describe('NewsCard Integration', () => {
  it('renders news card with all information', () => {
    render(
      <TestWrapper>
        <NewsCard news={mockNews} />
      </TestWrapper>
    );

    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.getByText('Test news summary')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('handles like action', async () => {
    render(
      <TestWrapper>
        <NewsCard news={mockNews} />
      </TestWrapper>
    );

    const likeButton = screen.getByLabelText(/点赞/i);
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(screen.getByText('11')).toBeInTheDocument();
    });
  });

  it('opens news link when clicked', () => {
    const mockOpen = vi.fn();
    window.open = mockOpen;

    render(
      <TestWrapper>
        <NewsCard news={mockNews} />
      </TestWrapper>
    );

    const readButton = screen.getByText(/阅读全文/i);
    fireEvent.click(readButton);

    expect(mockOpen).toHaveBeenCalledWith(mockNews.link, '_blank');
  });
});
```

### 3. 状态管理集成测试

```typescript
// src/test/integration/news-flow.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HomePage } from '../../pages/HomePage';
import { TestWrapper } from '../TestWrapper';

describe('News Flow Integration', () => {
  it('loads and displays news on page load', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    expect(screen.getByText(/加载中/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test News')).toBeInTheDocument();
    });
  });

  it('filters news by category', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Test News')).toBeInTheDocument();
    });

    const categoryFilter = screen.getByLabelText(/分类筛选/i);
    fireEvent.change(categoryFilter, { target: { value: 'tech' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('tech')).toBeInTheDocument();
    });
  });
});
```

## E2E测试

### 1. Playwright 配置

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 2. E2E 测试用例

```typescript
// e2e/news-app.spec.ts
import { test, expect } from '@playwright/test';

test.describe('News App E2E', () => {
  test('should load homepage and display news', async ({ page }) => {
    await page.goto('/');
    
    // 等待新闻加载
    await expect(page.locator('[data-testid="news-list"]')).toBeVisible();
    
    // 检查是否有新闻卡片
    const newsCards = page.locator('[data-testid="news-card"]');
    await expect(newsCards).toHaveCountGreaterThan(0);
  });

  test('should filter news by category', async ({ page }) => {
    await page.goto('/');
    
    // 等待页面加载
    await page.waitForLoadState('networkidle');
    
    // 选择分类筛选
    await page.selectOption('[data-testid="category-filter"]', 'tech');
    
    // 等待筛选结果
    await page.waitForTimeout(1000);
    
    // 验证筛选结果
    const newsCards = page.locator('[data-testid="news-card"]');
    await expect(newsCards.first()).toBeVisible();
  });

  test('should like a news item', async ({ page }) => {
    await page.goto('/');
    
    // 等待新闻加载
    await page.waitForSelector('[data-testid="news-card"]');
    
    // 获取第一个新闻卡片的点赞数
    const firstCard = page.locator('[data-testid="news-card"]').first();
    const likeButton = firstCard.locator('[data-testid="like-button"]');
    const likeCount = firstCard.locator('[data-testid="like-count"]');
    
    const initialCount = await likeCount.textContent();
    
    // 点击点赞
    await likeButton.click();
    
    // 验证点赞数增加
    await expect(likeCount).not.toHaveText(initialCount || '');
  });

  test('should switch language', async ({ page }) => {
    await page.goto('/');
    
    // 点击语言切换按钮
    await page.click('[data-testid="language-switcher"]');
    
    // 选择英文
    await page.click('[data-testid="lang-en"]');
    
    // 验证语言切换
    await expect(page.locator('text=News')).toBeVisible();
    await expect(page.locator('text=新闻')).not.toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // 验证移动端布局
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="sidebar"]')).not.toBeVisible();
    
    // 测试移动端菜单
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
  });
});
```

## 测试工具

### 1. 测试工具函数

```typescript
// src/test/utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// 测试包装器
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

// 自定义渲染函数
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### 2. 测试数据工厂

```typescript
// src/test/factories.ts
import { NewsItem, Channel } from '../types';

export const createMockNews = (overrides?: Partial<NewsItem>): NewsItem => ({
  id: 1,
  title: 'Mock News Title',
  summary: 'Mock news summary',
  link: 'https://example.com',
  date: '2023-12-01',
  views: 100,
  likes: 10,
  category: 'tech',
  tags: ['technology', 'news'],
  ...overrides,
});

export const createMockChannel = (overrides?: Partial<Channel>): Channel => ({
  id: '1',
  name: 'Mock Channel',
  description: 'Mock channel description',
  url: 'https://example.com/feed',
  category: 'tech',
  isActive: true,
  ...overrides,
});

export const createMockNewsList = (count: number = 3): NewsItem[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockNews({ id: index + 1, title: `News ${index + 1}` })
  );
};
```

## 测试覆盖率

### 1. 覆盖率配置

```typescript
// vitest.config.ts (覆盖率部分)
export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        'src/main.tsx',
        'src/vite-env.d.ts'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
});
```

### 2. 覆盖率报告

```bash
# 生成覆盖率报告
npm run test:coverage

# 查看覆盖率报告
open coverage/index.html
```

## 性能测试

### 1. 组件性能测试

```typescript
// src/test/performance/component-performance.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { NewsCard } from '../../components/news/NewsCard';
import { createMockNews } from '../factories';

describe('Component Performance', () => {
  it('renders large news list efficiently', () => {
    const startTime = performance.now();
    
    const newsList = Array.from({ length: 1000 }, (_, i) =>
      createMockNews({ id: i, title: `News ${i}` })
    );

    render(
      <div>
        {newsList.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // 渲染时间应该小于 100ms
    expect(renderTime).toBeLessThan(100);
  });
});
```

### 2. 内存泄漏测试

```typescript
// src/test/performance/memory-leak.test.tsx
import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react';
import { HomePage } from '../../pages/HomePage';

describe('Memory Leak Tests', () => {
  it('cleans up event listeners on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<HomePage />);
    
    const addedListeners = addEventListenerSpy.mock.calls.length;
    
    unmount();
    
    const removedListeners = removeEventListenerSpy.mock.calls.length;
    
    // 确保所有添加的监听器都被移除
    expect(removedListeners).toBeGreaterThanOrEqual(addedListeners);
  });
});
```

## 可访问性测试

### 1. 自动化可访问性测试

```typescript
// src/test/accessibility/a11y.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HomePage } from '../../pages/HomePage';
import { TestWrapper } from '../TestWrapper';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // 测试 Tab 键导航
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    expect(focusableElements.length).toBeGreaterThan(0);
  });
});
```

## 最佳实践

### 1. 测试命名约定

```typescript
// ✅ 好的测试命名
describe('NewsCard Component', () => {
  it('renders news title and summary', () => {});
  it('handles like button click', () => {});
  it('shows loading state when data is fetching', () => {});
});

// ❌ 不好的测试命名
describe('NewsCard', () => {
  it('test1', () => {});
  it('should work', () => {});
  it('renders', () => {});
});
```

### 2. 测试组织结构

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx
├── test/
│   ├── setup.ts
│   ├── utils.tsx
│   ├── factories.ts
│   ├── mocks/
│   │   ├── handlers.ts
│   │   └── server.ts
│   └── integration/
│       └── news-flow.test.tsx
└── e2e/
    ├── news-app.spec.ts
    └── accessibility.spec.ts
```

### 3. 测试数据管理

```typescript
// ✅ 使用工厂函数
const mockNews = createMockNews({
  title: 'Custom Title',
  views: 500
});

// ✅ 使用 beforeEach 清理状态
beforeEach(() => {
  useNewsStore.getState().reset();
  localStorage.clear();
});

// ❌ 硬编码测试数据
const mockNews = {
  id: 1,
  title: 'Hard coded title',
  // ... 大量重复数据
};
```

### 4. 异步测试处理

```typescript
// ✅ 正确的异步测试
it('loads news data', async () => {
  render(<NewsComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('News Title')).toBeInTheDocument();
  });
});

// ❌ 错误的异步测试
it('loads news data', () => {
  render(<NewsComponent />);
  
  // 没有等待异步操作完成
  expect(screen.getByText('News Title')).toBeInTheDocument();
});
```

### 5. 测试隔离

```typescript
// ✅ 每个测试都是独立的
describe('NewsStore', () => {
  beforeEach(() => {
    // 重置状态
    useNewsStore.getState().reset();
  });

  it('test 1', () => {
    // 测试逻辑
  });

  it('test 2', () => {
    // 测试逻辑，不依赖 test 1
  });
});
```

### 6. 测试维护

```typescript
// ✅ 使用页面对象模式 (E2E)
class NewsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async likeFirstNews() {
    await this.page.click('[data-testid="news-card"]:first-child [data-testid="like-button"]');
  }

  async getFirstNewsLikeCount() {
    return await this.page.textContent('[data-testid="news-card"]:first-child [data-testid="like-count"]');
  }
}

// 在测试中使用
it('should like news', async ({ page }) => {
  const newsPage = new NewsPage(page);
  await newsPage.goto();
  
  const initialCount = await newsPage.getFirstNewsLikeCount();
  await newsPage.likeFirstNews();
  
  const newCount = await newsPage.getFirstNewsLikeCount();
  expect(newCount).not.toBe(initialCount);
});
```

这个测试最佳实践指南提供了完整的测试策略和实现方案，帮助确保代码质量和应用稳定性。