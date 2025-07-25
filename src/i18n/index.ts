import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 中文翻译
const zhCN = {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    search: '搜索',
    filter: '筛选',
    sort: '排序',
    refresh: '刷新',
    more: '更多',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    reset: '重置',
    close: '关闭',
    open: '打开',
    view: '查看',
    share: '分享',
    like: '点赞',
    bookmark: '收藏',
    subscribe: '订阅',
    unsubscribe: '取消订阅',
  },
  navigation: {
    home: '首页',
    trending: '热门',
    bookmarks: '收藏',
    settings: '设置',
    profile: '个人资料',
    login: '登录',
    logout: '退出登录',
    register: '注册',
  },
  news: {
    title: '新闻标题',
    summary: '摘要',
    content: '内容',
    author: '作者',
    publishDate: '发布时间',
    readTime: '阅读时间',
    views: '浏览量',
    likes: '点赞数',
    comments: '评论',
    tags: '标签',
    category: '分类',
    relatedNews: '相关新闻',
    noNews: '暂无新闻',
    loadMore: '加载更多',
    searchPlaceholder: '搜索新闻...',
    filterByCategory: '按分类筛选',
    sortByDate: '按时间排序',
    sortByViews: '按浏览量排序',
    sortByLikes: '按点赞数排序',
  },
  settings: {
    general: '通用设置',
    appearance: '外观',
    notifications: '通知',
    privacy: '隐私',
    account: '账户',
    language: '语言',
    theme: '主题',
    lightTheme: '浅色主题',
    darkTheme: '深色主题',
    systemTheme: '跟随系统',
    emailNotifications: '邮件通知',
    pushNotifications: '推送通知',
    desktopNotifications: '桌面通知',
    autoRefresh: '自动刷新',
    refreshInterval: '刷新间隔',
    compactView: '紧凑视图',
    showImages: '显示图片',
  },
  auth: {
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    name: '姓名',
    loginTitle: '登录',
    registerTitle: '注册',
    forgotPassword: '忘记密码？',
    rememberMe: '记住我',
    loginSuccess: '登录成功',
    registerSuccess: '注册成功',
    logoutSuccess: '退出成功',
    invalidCredentials: '用户名或密码错误',
    emailRequired: '请输入邮箱',
    passwordRequired: '请输入密码',
    nameRequired: '请输入姓名',
    emailInvalid: '邮箱格式不正确',
    passwordTooShort: '密码至少6位',
    passwordMismatch: '两次密码不一致',
  },
  errors: {
    networkError: '网络连接失败',
    serverError: '服务器错误',
    notFound: '页面未找到',
    unauthorized: '未授权访问',
    forbidden: '权限不足',
    validationError: '数据验证失败',
    unknownError: '未知错误',
    tryAgain: '请重试',
  },
  time: {
    justNow: '刚刚',
    minutesAgo: '{{count}}分钟前',
    hoursAgo: '{{count}}小时前',
    daysAgo: '{{count}}天前',
    weeksAgo: '{{count}}周前',
    monthsAgo: '{{count}}月前',
    yearsAgo: '{{count}}年前',
  },
};

// 英文翻译
const enUS = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    more: 'More',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    close: 'Close',
    open: 'Open',
    view: 'View',
    share: 'Share',
    like: 'Like',
    bookmark: 'Bookmark',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
  },
  navigation: {
    home: 'Home',
    trending: 'Trending',
    bookmarks: 'Bookmarks',
    settings: 'Settings',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
  },
  news: {
    title: 'Title',
    summary: 'Summary',
    content: 'Content',
    author: 'Author',
    publishDate: 'Publish Date',
    readTime: 'Read Time',
    views: 'Views',
    likes: 'Likes',
    comments: 'Comments',
    tags: 'Tags',
    category: 'Category',
    relatedNews: 'Related News',
    noNews: 'No news available',
    loadMore: 'Load More',
    searchPlaceholder: 'Search news...',
    filterByCategory: 'Filter by Category',
    sortByDate: 'Sort by Date',
    sortByViews: 'Sort by Views',
    sortByLikes: 'Sort by Likes',
  },
  settings: {
    general: 'General',
    appearance: 'Appearance',
    notifications: 'Notifications',
    privacy: 'Privacy',
    account: 'Account',
    language: 'Language',
    theme: 'Theme',
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    systemTheme: 'System Theme',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    desktopNotifications: 'Desktop Notifications',
    autoRefresh: 'Auto Refresh',
    refreshInterval: 'Refresh Interval',
    compactView: 'Compact View',
    showImages: 'Show Images',
  },
  auth: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    loginTitle: 'Login',
    registerTitle: 'Register',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    loginSuccess: 'Login successful',
    registerSuccess: 'Registration successful',
    logoutSuccess: 'Logout successful',
    invalidCredentials: 'Invalid email or password',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    nameRequired: 'Name is required',
    emailInvalid: 'Invalid email format',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
  },
  errors: {
    networkError: 'Network connection failed',
    serverError: 'Server error',
    notFound: 'Page not found',
    unauthorized: 'Unauthorized access',
    forbidden: 'Insufficient permissions',
    validationError: 'Data validation failed',
    unknownError: 'Unknown error',
    tryAgain: 'Please try again',
  },
  time: {
    justNow: 'Just now',
    minutesAgo: '{{count}} minutes ago',
    hoursAgo: '{{count}} hours ago',
    daysAgo: '{{count}} days ago',
    weeksAgo: '{{count}} weeks ago',
    monthsAgo: '{{count}} months ago',
    yearsAgo: '{{count}} years ago',
  },
};

// 初始化i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': { translation: zhCN },
      'en-US': { translation: enUS },
    },
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;