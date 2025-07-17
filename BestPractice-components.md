# 组件实现最佳实践指南

## 目录
- [组件设计原则](#组件设计原则)
- [组件结构规范](#组件结构规范)
- [TypeScript 接口定义](#typescript-接口定义)
- [样式处理](#样式处理)
- [状态管理](#状态管理)
- [性能优化](#性能优化)
- [测试策略](#测试策略)
- [文档规范](#文档规范)

## 组件设计原则

### 1. 单一职责原则
每个组件应该只负责一个功能，保持组件的简洁和可维护性。

```typescript
// ✅ 好的实践 - 单一职责
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', disabled }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ❌ 避免 - 职责过多
export const ButtonWithModal: React.FC = () => {
  // 按钮 + 模态框 + 表单验证 = 职责过多
};
```

### 2. 组合优于继承
使用组合模式构建复杂组件，提高代码复用性。

```typescript
// ✅ 组合模式
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={clsx('card', className)}>
    {children}
  </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-header">{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="card-content">{children}</div>
);

// 使用
<Card>
  <CardHeader>标题</CardHeader>
  <CardContent>内容</CardContent>
</Card>
```

### 3. 可配置性
组件应该通过 props 提供足够的配置选项。

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}
```

## 组件结构规范

### 1. 文件组织结构
```
src/components/
├── ui/                    # 基础 UI 组件
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   └── index.ts
├── layout/                # 布局组件
│   ├── Header/
│   ├── Sidebar/
│   └── Layout/
├── business/              # 业务组件
│   ├── NewsCard/
│   ├── UserProfile/
│   └── ProductList/
└── index.ts
```

### 2. 组件文件模板
```typescript
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

// 1. 类型定义
interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

// 2. 组件实现
export const Component = forwardRef<HTMLDivElement, ComponentProps>(({
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className,
  ...props
}, ref) => {
  const { t } = useTranslation();
  
  // 3. 样式类名计算
  const componentClasses = clsx(
    'component-base',
    `component-${variant}`,
    `component-${size}`,
    {
      'component-disabled': disabled,
      'component-loading': loading,
    },
    className
  );
  
  // 4. 事件处理
  const handleClick = (event: React.MouseEvent) => {
    if (disabled || loading) return;
    props.onClick?.(event);
  };
  
  // 5. 渲染
  return (
    <div
      ref={ref}
      className={componentClasses}
      onClick={handleClick}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </div>
  );
});

Component.displayName = 'Component';
```

### 3. 导出规范
```typescript
// components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// components/ui/index.ts
export * from './Button';
export * from './Card';
export * from './Input';

// components/index.ts
export * from './ui';
export * from './layout';
export * from './business';
```

## TypeScript 接口定义

### 1. Props 接口规范
```typescript
// 基础 Props 接口
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

// 扩展 HTML 元素属性
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

// 复杂组件 Props
interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'compact' | 'featured';
  showActions?: boolean;
  onRead?: (id: number) => void;
  onLike?: (id: number) => void;
  onShare?: (id: number) => void;
}
```

### 2. 泛型组件
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  loading?: boolean;
  empty?: React.ReactNode;
}

export const List = <T,>({ 
  items, 
  renderItem, 
  keyExtractor, 
  loading, 
  empty 
}: ListProps<T>) => {
  if (loading) return <Loading />;
  if (items.length === 0) return empty || <div>No items</div>;
  
  return (
    <div className="list">
      {items.map((item, index) => (
        <div key={keyExtractor(item)} className="list-item">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};
```

### 3. 联合类型和字面量类型
```typescript
// 字面量类型
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

// 联合类型
type IconPosition = 'left' | 'right';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// 条件类型
type ButtonProps<T extends boolean = false> = {
  loading?: T;
  children: T extends true ? never : React.ReactNode;
  loadingText?: T extends true ? string : never;
};
```

## 样式处理

### 1. CSS-in-JS 与 Tailwind CSS
```typescript
import { clsx } from 'clsx';

// 使用 clsx 进行条件样式
const Button: React.FC<ButtonProps> = ({ variant, size, disabled, className }) => {
  const buttonClasses = clsx(
    // 基础样式
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    
    // 变体样式
    {
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500': variant === 'secondary',
      'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost',
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
    },
    
    // 尺寸样式
    {
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    },
    
    // 状态样式
    {
      'opacity-50 cursor-not-allowed': disabled,
    },
    
    className
  );
  
  return <button className={buttonClasses}>...</button>;
};
```

### 2. CSS 变量和主题
```typescript
// theme/index.ts
export const themeVariables = {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    surface: 'var(--color-surface)',
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
    },
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
  },
};

// 在组件中使用
const Card: React.FC = ({ children }) => (
  <div 
    className="card"
    style={{
      backgroundColor: themeVariables.colors.surface,
      color: themeVariables.colors.text.primary,
      padding: themeVariables.spacing.md,
    }}
  >
    {children}
  </div>
);
```

### 3. 响应式设计
```typescript
const ResponsiveGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {children}
  </div>
);

// 使用断点工具
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('md');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('sm');
      else if (width < 768) setBreakpoint('md');
      else if (width < 1024) setBreakpoint('lg');
      else setBreakpoint('xl');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};
```

## 状态管理

### 1. 本地状态管理
```typescript
// 使用 useState
const [count, setCount] = useState(0);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// 使用 useReducer 处理复杂状态
interface State {
  data: any[];
  loading: boolean;
  error: string | null;
  page: number;
}

type Action = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'LOAD_MORE' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOAD_MORE':
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
};

const useDataFetch = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    loading: false,
    error: null,
    page: 1,
  });
  
  return { state, dispatch };
};
```

### 2. 全局状态管理
```typescript
// 使用 Zustand
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  language: string;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  theme: 'light',
  language: 'zh-CN',
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));

// 在组件中使用
const Component: React.FC = () => {
  const { user, theme, setTheme } = useAppStore();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};
```

### 3. 状态持久化
```typescript
// 本地存储 Hook
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};
```

## 性能优化

### 1. React.memo 和 useMemo
```typescript
// 使用 React.memo 防止不必要的重渲染
const ExpensiveComponent = React.memo<{ data: any[]; filter: string }>(({ data, filter }) => {
  const filteredData = useMemo(() => {
    return data.filter(item => item.name.includes(filter));
  }, [data, filter]);
  
  return (
    <div>
      {filteredData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// 自定义比较函数
const areEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.id === nextProps.id && prevProps.version === nextProps.version;
};

const OptimizedComponent = React.memo(Component, areEqual);
```

### 2. useCallback 优化
```typescript
const ParentComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  
  // ✅ 使用 useCallback 缓存函数
  const handleItemClick = useCallback((id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  }, []);
  
  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, createNewItem()]);
  }, []);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ItemList items={items} onItemClick={handleItemClick} />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};
```

### 3. 虚拟化长列表
```typescript
import { FixedSizeList as List } from 'react-window';

interface VirtualListProps {
  items: any[];
  itemHeight: number;
  height: number;
}

const VirtualList: React.FC<VirtualListProps> = ({ items, itemHeight, height }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ItemComponent item={items[index]} />
    </div>
  );
  
  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

### 4. 懒加载组件
```typescript
import { lazy, Suspense } from 'react';

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'));

const App: React.FC = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  </div>
);

// 预加载
const preloadComponent = () => {
  import('./LazyComponent');
};

// 在用户交互时预加载
<button onMouseEnter={preloadComponent}>
  Hover to preload
</button>
```

## 测试策略

### 1. 单元测试
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });
});
```

### 2. 集成测试
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { NewsCard } from './NewsCard';
import { NewsProvider } from '../context/NewsContext';

const mockNews = {
  id: 1,
  title: 'Test News',
  summary: 'Test summary',
  date: '2023-01-01',
  views: 100,
  likes: 10,
};

describe('NewsCard Integration', () => {
  it('handles like action correctly', async () => {
    const mockOnLike = jest.fn();
    
    render(
      <NewsProvider>
        <NewsCard news={mockNews} onLike={mockOnLike} />
      </NewsProvider>
    );
    
    const likeButton = screen.getByLabelText('Like');
    fireEvent.click(likeButton);
    
    await waitFor(() => {
      expect(mockOnLike).toHaveBeenCalledWith(1);
    });
  });
});
```

### 3. Storybook 文档
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <HeartIcon />,
    children: 'With Icon',
  },
};
```

## 文档规范

### 1. JSDoc 注释
```typescript
/**
 * 通用按钮组件
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   点击我
 * </Button>
 * ```
 */
interface ButtonProps {
  /** 按钮变体样式 */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 按钮图标 */
  icon?: React.ReactNode;
  /** 图标位置 */
  iconPosition?: 'left' | 'right';
  /** 是否全宽显示 */
  fullWidth?: boolean;
  /** 点击事件处理函数 */
  onClick?: () => void;
  /** 按钮内容 */
  children: React.ReactNode;
}

/**
 * 按钮组件
 * 
 * 提供多种样式变体和尺寸选项的通用按钮组件
 * 
 * @param props - 按钮属性
 * @returns 按钮组件
 */
export const Button: React.FC<ButtonProps> = (props) => {
  // 实现...
};
```

### 2. README 文档
```markdown
# Button Component

通用按钮组件，支持多种样式变体和交互状态。

## 特性

- 🎨 多种样式变体（primary、secondary、ghost、danger）
- 📏 三种尺寸选项（sm、md、lg）
- ⚡ 加载状态支持
- 🔧 完全可定制
- ♿ 无障碍访问支持
- 📱 响应式设计

## 安装

```bash
npm install @your-org/ui-components
```

## 使用方法

```tsx
import { Button } from '@your-org/ui-components';

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      点击我
    </Button>
  );
}
```

## API

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'danger' | 'primary' | 按钮样式变体 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 按钮尺寸 |
| loading | boolean | false | 是否显示加载状态 |
| disabled | boolean | false | 是否禁用按钮 |
| fullWidth | boolean | false | 是否全宽显示 |

## 示例

### 基础用法
```tsx
<Button>默认按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="danger">危险按钮</Button>
```

### 加载状态
```tsx
<Button loading>加载中...</Button>
```

### 带图标
```tsx
<Button icon={<HeartIcon />}>收藏</Button>
```
```

这个组件实现最佳实践指南涵盖了：
1. 组件设计原则和架构
2. 文件组织和结构规范
3. TypeScript 类型定义
4. 样式处理和主题系统
5. 状态管理策略
6. 性能优化技巧
7. 测试策略和方法
8. 文档编写规范

这些实践可以帮助团队构建高质量、可维护的 React 组件库。