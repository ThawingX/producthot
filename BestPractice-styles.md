# 样式与主题最佳实践指南

## 目录
1. [设计原则](#设计原则)
2. [主题系统](#主题系统)
3. [样式架构](#样式架构)
4. [组件样式](#组件样式)
5. [响应式设计](#响应式设计)
6. [动画系统](#动画系统)
7. [性能优化](#性能优化)
8. [维护策略](#维护策略)
9. [最佳实践](#最佳实践)

## 设计原则

### 1. 一致性
- 统一的设计语言和视觉风格
- 标准化的组件样式和交互
- 一致的间距、颜色和字体系统

### 2. 可维护性
- 模块化的样式组织
- 可复用的样式组件
- 清晰的命名约定

### 3. 可扩展性
- 灵活的主题系统
- 可配置的设计令牌
- 支持多品牌和定制化

### 4. 性能优先
- 最小化 CSS 包大小
- 优化关键渲染路径
- 高效的样式计算

## 主题系统

### 1. 主题配置结构

```typescript
// theme/index.ts
export const themes = {
  light: {
    name: 'light',
    colors: {
      // 主色调
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#10B981',
      
      // 背景色
      background: '#FFFFFF',
      surface: '#F9FAFB',
      
      // 文本色
      text: {
        primary: '#111827',
        secondary: '#6B7280',
        muted: '#9CA3AF',
        inverse: '#FFFFFF',
      },
      
      // 边框色
      border: '#E5E7EB',
      
      // 状态色
      error: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
      info: '#3B82F6',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#60A5FA',
      secondary: '#9CA3AF',
      accent: '#34D399',
      background: '#111827',
      surface: '#1F2937',
      text: {
        primary: '#F9FAFB',
        secondary: '#D1D5DB',
        muted: '#9CA3AF',
        inverse: '#111827',
      },
      border: '#374151',
      error: '#F87171',
      warning: '#FBBF24',
      success: '#34D399',
      info: '#60A5FA',
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
    },
  },
};
```

### 2. 设计令牌系统

```typescript
// theme/tokens.ts
export const designTokens = {
  // 间距系统 (8px 基准)
  spacing: {
    0: '0px',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
  },
  
  // 字体系统
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },
  
  // 圆角系统
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  // 断点系统
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index 层级
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};
```

### 3. 主题工具函数

```typescript
// theme/utils.ts
export const themeUtils = {
  // 获取当前主题
  getCurrentTheme: (): 'light' | 'dark' => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'system') {
      return savedTheme as 'light' | 'dark';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },
  
  // 应用主题
  applyTheme: (themeName: 'light' | 'dark') => {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    // 设置CSS变量
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--color-${key}`, value);
      } else {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue);
        });
      }
    });
    
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
    
    // 设置data属性用于CSS选择器
    root.setAttribute('data-theme', themeName);
    
    // 更新meta标签
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.colors.primary);
    }
  },
  
  // 切换主题
  toggleTheme: (): 'light' | 'dark' => {
    const currentTheme = themeUtils.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    themeUtils.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 触发主题变化事件
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { theme: newTheme } 
    }));
    
    return newTheme;
  },
  
  // 监听系统主题变化
  watchSystemTheme: (callback: (theme: 'light' | 'dark') => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme || savedTheme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        themeUtils.applyTheme(newTheme);
        callback(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  },
  
  // 获取主题颜色
  getThemeColor: (colorPath: string, fallback?: string): string => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-${colorPath}`)
      .trim();
    
    return value || fallback || '#000000';
  },
  
  // 检查是否为暗色主题
  isDarkTheme: (): boolean => {
    return themeUtils.getCurrentTheme() === 'dark';
  },
};
```

## 样式架构

### 1. CSS 变量系统

```css
/* styles/variables.css */
:root {
  /* 浅色主题 */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-active: #1d4ed8;
  
  --color-secondary: #64748b;
  --color-secondary-hover: #475569;
  --color-secondary-active: #334155;
  
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-hover: #f1f5f9;
  
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-inverse: #ffffff;
  
  --color-border: #e2e8f0;
  --color-border-hover: #cbd5e1;
  
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-success: #10b981;
  --color-info: #3b82f6;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* 间距 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  
  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  /* 动画 */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  --easing-ease: ease;
  --easing-ease-in: ease-in;
  --easing-ease-out: ease-out;
  --easing-ease-in-out: ease-in-out;
  --easing-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 暗色主题 */
[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --color-primary-active: #2563eb;
  
  --color-secondary: #9ca3af;
  --color-secondary-hover: #6b7280;
  --color-secondary-active: #4b5563;
  
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-surface-hover: #334155;
  
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #94a3b8;
  --color-text-inverse: #0f172a;
  
  --color-border: #334155;
  --color-border-hover: #475569;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3);
}
```

### 2. 组件样式变体系统

```typescript
// styles/variants.ts
export const componentVariants = {
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary/50',
        secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary/50',
        outline: 'border border-border text-text-primary hover:bg-surface focus:ring-primary/50',
        ghost: 'text-text-primary hover:bg-surface focus:ring-primary/50',
        danger: 'bg-error text-white hover:bg-error/90 focus:ring-error/50',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
    },
    
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
  
  card: {
    base: 'rounded-lg overflow-hidden transition-all duration-200',
    
    variants: {
      variant: {
        default: 'bg-surface border border-border shadow-sm',
        elevated: 'bg-surface shadow-lg',
        outlined: 'border border-border',
        ghost: 'bg-transparent',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  },
  
  input: {
    base: 'w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
    
    variants: {
      variant: {
        default: 'border border-border bg-background text-text-primary focus:ring-primary/50 focus:border-primary',
        filled: 'border-0 bg-surface text-text-primary focus:ring-primary/50',
        flushed: 'border-0 border-b border-border bg-transparent focus:ring-0 focus:border-primary rounded-none',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-4 py-3 text-lg',
      },
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
};
```

### 3. 样式组合工具

```typescript
// utils/styles.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 样式组合函数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 变体样式生成器
export function createVariants<T extends Record<string, any>>(
  config: T
): (props?: Partial<T['variants']> & { className?: string }) => string {
  return (props = {}) => {
    const { className, ...variantProps } = props;
    
    const variantClasses = Object.entries(config.variants || {}).map(([key, variants]) => {
      const value = variantProps[key] || config.defaultVariants?.[key];
      return variants[value] || '';
    });
    
    return cn(config.base, ...variantClasses, className);
  };
}

// 响应式样式工具
export function responsive(styles: Record<string, string>) {
  return Object.entries(styles)
    .map(([breakpoint, style]) => {
      if (breakpoint === 'base') return style;
      return `${breakpoint}:${style}`;
    })
    .join(' ');
}

// 状态样式工具
export function stateStyles(states: {
  hover?: string;
  focus?: string;
  active?: string;
  disabled?: string;
}) {
  return cn(
    states.hover && `hover:${states.hover}`,
    states.focus && `focus:${states.focus}`,
    states.active && `active:${states.active}`,
    states.disabled && `disabled:${states.disabled}`
  );
}
```

## 组件样式

### 1. 基础组件样式

```typescript
// components/ui/Button.tsx
import React from 'react';
import { cn, createVariants } from '../../utils/styles';
import { componentVariants } from '../../styles/variants';

const buttonVariants = createVariants(componentVariants.button);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && 'w-full',
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
```

### 2. 复合组件样式

```typescript
// components/ui/Card.tsx
import React from 'react';
import { cn, createVariants } from '../../utils/styles';
import { componentVariants } from '../../styles/variants';

const cardVariants = createVariants(componentVariants.card);

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        cardVariants({ variant, padding }),
        hover && 'hover:shadow-md hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('border-b border-border pb-4 mb-4', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={cn('text-lg font-semibold text-text-primary', className)} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('text-text-secondary', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('border-t border-border pt-4 mt-4', className)} {...props}>
    {children}
  </div>
);
```

## 响应式设计

### 1. 断点系统

```typescript
// hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';
import { designTokens } from '../theme/tokens';

type Breakpoint = keyof typeof designTokens.breakpoints;

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');
  
  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= parseInt(designTokens.breakpoints['2xl'])) {
        setCurrentBreakpoint('2xl');
      } else if (width >= parseInt(designTokens.breakpoints.xl)) {
        setCurrentBreakpoint('xl');
      } else if (width >= parseInt(designTokens.breakpoints.lg)) {
        setCurrentBreakpoint('lg');
      } else if (width >= parseInt(designTokens.breakpoints.md)) {
        setCurrentBreakpoint('md');
      } else if (width >= parseInt(designTokens.breakpoints.sm)) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };
    
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return {
    currentBreakpoint,
    isXs: currentBreakpoint === 'xs',
    isSm: currentBreakpoint === 'sm',
    isMd: currentBreakpoint === 'md',
    isLg: currentBreakpoint === 'lg',
    isXl: currentBreakpoint === 'xl',
    is2Xl: currentBreakpoint === '2xl',
    isMobile: ['xs', 'sm'].includes(currentBreakpoint),
    isTablet: currentBreakpoint === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(currentBreakpoint),
  };
};
```

### 2. 响应式组件

```typescript
// components/layout/Grid.tsx
import React from 'react';
import { cn } from '../../utils/styles';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: number;
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  className,
  children,
  ...props
}) => {
  const gridClasses = cn(
    'grid',
    `gap-${gap}`,
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    cols['2xl'] && `2xl:grid-cols-${cols['2xl']}`,
    className
  );
  
  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

// 使用示例
export const ResponsiveLayout: React.FC = () => {
  return (
    <Grid
      cols={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      gap={6}
      className="p-6"
    >
      {/* 网格项目 */}
    </Grid>
  );
};
```

## 动画系统

### 1. 动画配置

```typescript
// theme/animations.ts
export const animations = {
  // 持续时间
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },
  
  // 缓动函数
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // 关键帧动画
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    slideInUp: {
      from: { transform: 'translateY(100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInDown: {
      from: { transform: 'translateY(-100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInLeft: {
      from: { transform: 'translateX(-100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    slideInRight: {
      from: { transform: 'translateX(100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    scaleIn: {
      from: { transform: 'scale(0.9)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    scaleOut: {
      from: { transform: 'scale(1)', opacity: 1 },
      to: { transform: 'scale(0.9)', opacity: 0 },
    },
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
    bounce: {
      '0%, 100%': { 
        transform: 'translateY(-25%)', 
        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' 
      },
      '50%': { 
        transform: 'none', 
        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' 
      },
    },
  },
};
```

### 2. 动画组件

```typescript
// components/ui/Transition.tsx
import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/styles';

interface TransitionProps {
  show: boolean;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

export const Transition: React.FC<TransitionProps> = ({
  show,
  enter = 'transition-all duration-300',
  enterFrom = 'opacity-0',
  enterTo = 'opacity-100',
  leave = 'transition-all duration-300',
  leaveFrom = 'opacity-100',
  leaveTo = 'opacity-0',
  duration = 300,
  children,
  className,
}) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [stage, setStage] = useState<'enter' | 'leave' | 'idle'>('idle');
  
  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setStage('enter');
      
      // 强制重绘
      requestAnimationFrame(() => {
        setStage('idle');
      });
    } else {
      setStage('leave');
      
      setTimeout(() => {
        setShouldRender(false);
        setStage('idle');
      }, duration);
    }
  }, [show, duration]);
  
  if (!shouldRender) return null;
  
  const getClasses = () => {
    if (stage === 'enter') {
      return cn(enter, enterFrom, className);
    }
    if (stage === 'leave') {
      return cn(leave, leaveFrom, leaveTo, className);
    }
    return cn(enter, enterTo, className);
  };
  
  return <div className={getClasses()}>{children}</div>;
};

// 预设动画组件
export const FadeTransition: React.FC<Omit<TransitionProps, 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo'>> = (props) => (
  <Transition
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    {...props}
  />
);

export const SlideUpTransition: React.FC<Omit<TransitionProps, 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo'>> = (props) => (
  <Transition
    enter="transition-all duration-300"
    enterFrom="opacity-0 translate-y-4"
    enterTo="opacity-100 translate-y-0"
    leave="transition-all duration-300"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-4"
    {...props}
  />
);

export const ScaleTransition: React.FC<Omit<TransitionProps, 'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo'>> = (props) => (
  <Transition
    enter="transition-all duration-300"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    leave="transition-all duration-300"
    leaveFrom="opacity-100 scale-100"
    leaveTo="opacity-0 scale-95"
    {...props}
  />
);
```

## 性能优化

### 1. CSS 优化策略

```typescript
// utils/css-optimization.ts

// 关键CSS提取
export const criticalCSS = `
  /* 关键渲染路径样式 */
  body {
    font-family: var(--font-sans);
    line-height: 1.5;
    color: var(--color-text-primary);
    background-color: var(--color-background);
  }
  
  .layout-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }
  
  .main-content {
    flex: 1;
    padding: var(--spacing-md);
  }
`;

// 样式懒加载
export const loadStylesAsync = (href: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });
};

// 样式预加载
export const preloadStyles = (hrefs: string[]) => {
  hrefs.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
};
```

### 2. 动态样式加载

```typescript
// hooks/useDynamicStyles.ts
import { useEffect, useState } from 'react';

export const useDynamicStyles = (condition: boolean, styleHref: string) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (condition && !loaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = styleHref;
      link.onload = () => setLoaded(true);
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
        setLoaded(false);
      };
    }
  }, [condition, styleHref, loaded]);
  
  return loaded;
};

// 使用示例
export const ConditionalComponent: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const stylesLoaded = useDynamicStyles(showAdvanced, '/styles/advanced.css');
  
  return (
    <div>
      <button onClick={() => setShowAdvanced(!showAdvanced)}>
        Toggle Advanced
      </button>
      {showAdvanced && stylesLoaded && (
        <div className="advanced-component">
          {/* 高级组件内容 */}
        </div>
      )}
    </div>
  );
};
```

## 维护策略

### 1. 样式审计工具

```typescript
// tools/style-audit.ts
interface StyleAuditResult {
  unusedClasses: string[];
  duplicateRules: string[];
  performanceIssues: string[];
  accessibilityIssues: string[];
}

export class StyleAuditor {
  private usedClasses = new Set<string>();
  private definedClasses = new Set<string>();
  
  // 扫描使用的类名
  scanUsedClasses(htmlContent: string) {
    const classRegex = /class(?:Name)?=["']([^"']+)["']/g;
    let match;
    
    while ((match = classRegex.exec(htmlContent)) !== null) {
      const classes = match[1].split(/\s+/);
      classes.forEach(cls => this.usedClasses.add(cls));
    }
  }
  
  // 扫描定义的类名
  scanDefinedClasses(cssContent: string) {
    const classRegex = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
    let match;
    
    while ((match = classRegex.exec(cssContent)) !== null) {
      this.definedClasses.add(match[1]);
    }
  }
  
  // 生成审计报告
  generateReport(): StyleAuditResult {
    const unusedClasses = Array.from(this.definedClasses)
      .filter(cls => !this.usedClasses.has(cls));
    
    return {
      unusedClasses,
      duplicateRules: this.findDuplicateRules(),
      performanceIssues: this.findPerformanceIssues(),
      accessibilityIssues: this.findAccessibilityIssues(),
    };
  }
  
  private findDuplicateRules(): string[] {
    // 实现重复规则检测逻辑
    return [];
  }
  
  private findPerformanceIssues(): string[] {
    // 实现性能问题检测逻辑
    return [];
  }
  
  private findAccessibilityIssues(): string[] {
    // 实现可访问性问题检测逻辑
    return [];
  }
}
```

### 2. 样式文档生成

```typescript
// tools/style-docs.ts
interface ComponentStyleDoc {
  name: string;
  description: string;
  variants: Record<string, string>;
  examples: string[];
  props: Record<string, string>;
}

export const generateStyleDocs = (components: ComponentStyleDoc[]) => {
  return components.map(component => `
# ${component.name}

${component.description}

## 变体

${Object.entries(component.variants).map(([name, desc]) => 
  `- **${name}**: ${desc}`
).join('\n')}

## 属性

${Object.entries(component.props).map(([prop, desc]) => 
  `- **${prop}**: ${desc}`
).join('\n')}

## 示例

${component.examples.map(example => 
  `\`\`\`tsx\n${example}\n\`\`\``
).join('\n\n')}
  `).join('\n\n---\n\n');
};
```

## 最佳实践

### 1. 命名约定

```typescript
// ✅ 好的命名
const styles = {
  // 使用语义化命名
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-600 text-white',
  success: 'bg-green-600 text-white',
  
  // 使用一致的前缀
  buttonPrimary: 'btn btn-primary',
  buttonSecondary: 'btn btn-secondary',
  
  // 使用描述性命名
  cardElevated: 'shadow-lg rounded-lg',
  textLarge: 'text-xl font-semibold',
};

// ❌ 避免的命名
const badStyles = {
  blue: 'bg-blue-600',      // 过于具体
  btn1: 'btn btn-primary',  // 无意义的数字
  big: 'text-xl',           // 模糊的描述
};
```

### 2. 组织结构

```
styles/
├── base/                 # 基础样式
│   ├── reset.css        # 样式重置
│   ├── typography.css   # 字体样式
│   └── layout.css       # 布局样式
├── components/          # 组件样式
│   ├── button.css
│   ├── card.css
│   └── input.css
├── utilities/           # 工具类
│   ├── spacing.css
│   ├── colors.css
│   └── animations.css
├── themes/              # 主题文件
│   ├── light.css
│   ├── dark.css
│   └── variables.css
└── vendor/              # 第三方样式
    └── normalize.css
```

### 3. 性能考虑

```typescript
// ✅ 性能优化
const optimizedStyles = {
  // 使用 CSS 变量减少重复
  button: 'bg-[var(--color-primary)] text-white',
  
  // 避免深层嵌套
  cardTitle: 'text-lg font-semibold',
  
  // 使用简洁的选择器
  active: 'bg-blue-600',
};

// ❌ 性能问题
const problematicStyles = {
  // 过度使用 !important
  button: 'bg-blue-600 !important',
  
  // 复杂的选择器
  nested: 'div > ul > li > a:hover',
  
  // 内联样式
  inline: { backgroundColor: '#3B82F6' },
};
```

## 总结

这个样式与主题最佳实践指南提供了：

1. **完整的主题系统** - 支持亮色/暗色主题切换
2. **设计令牌系统** - 统一的设计语言
3. **组件样式架构** - 可复用的样式组件
4. **响应式设计** - 移动优先的布局策略
5. **动画系统** - 流畅的用户体验
6. **性能优化** - 高效的样式加载和渲染
7. **维护工具** - 样式审计和文档生成
8. **最佳实践** - 可维护的代码组织

通过遵循这些最佳实践，可以构建一个一致、可维护、高性能的样式系统。