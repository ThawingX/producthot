// 主题配置
export const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#10B981',
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: {
        primary: '#111827',
        secondary: '#6B7280',
        muted: '#9CA3AF',
      },
      border: '#E5E7EB',
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

// 响应式断点
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// 间距系统
export const spacing = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

// 字体系统
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
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
};

// 动画配置
export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
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
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    pulse: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
    bounce: {
      '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
      '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
    },
  },
};

// 组件样式变体
export const variants = {
  button: {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      border: 'none',
      '&:hover': {
        backgroundColor: 'var(--color-primary-dark)',
      },
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)',
      '&:hover': {
        backgroundColor: 'var(--color-primary)',
        color: 'white',
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
      border: 'none',
      '&:hover': {
        backgroundColor: 'var(--color-surface)',
      },
    },
  },
  card: {
    default: {
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '0.5rem',
      boxShadow: 'var(--shadow-sm)',
    },
    elevated: {
      backgroundColor: 'var(--color-surface)',
      border: 'none',
      borderRadius: '0.5rem',
      boxShadow: 'var(--shadow-lg)',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border)',
      borderRadius: '0.5rem',
      boxShadow: 'none',
    },
  },
  input: {
    default: {
      backgroundColor: 'var(--color-background)',
      border: '1px solid var(--color-border)',
      borderRadius: '0.375rem',
      color: 'var(--color-text-primary)',
      '&:focus': {
        borderColor: 'var(--color-primary)',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      },
    },
    filled: {
      backgroundColor: 'var(--color-surface)',
      border: 'none',
      borderRadius: '0.375rem',
      color: 'var(--color-text-primary)',
      '&:focus': {
        outline: 'none',
        boxShadow: '0 0 0 2px var(--color-primary)',
      },
    },
  },
};

// 工具函数
export const themeUtils = {
  // 获取当前主题
  getCurrentTheme: () => {
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
  },
  
  // 切换主题
  toggleTheme: () => {
    const currentTheme = themeUtils.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    themeUtils.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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
};

export default {
  themes,
  breakpoints,
  spacing,
  typography,
  animations,
  variants,
  themeUtils,
};