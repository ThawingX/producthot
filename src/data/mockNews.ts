// 模拟新闻数据，符合 Apifox NewsResponse 接口定义
export const mockNewsData = {
  new_products: [
    {
      title: "ProductHunt",
      logo: "https://ph-files.imgix.net/a5d9c1a8-8f8a-4f8a-8f8a-8f8a8f8a8f8a?auto=format&fit=crop&frame=1&h=512&w=1024",
      update_time: "2024-01-15T10:30:00Z",
      posts: [
        {
          title: "AI代码助手 - 革命性的开发工具",
          url: "https://example.com/ai-assistant",
          description: "一款基于GPT-4的智能代码助手，能够自动生成、优化和调试代码，大幅提升开发效率。",
          upvotes: 245
        },
        {
          title: "无代码网站构建器 2.0",
          url: "https://example.com/website-builder",
          description: "全新的拖拽式网站构建器，支持响应式设计和高级动画效果。",
          upvotes: 189
        },
        {
          title: "智能项目管理平台",
          url: "https://example.com/project-manager",
          description: "集成AI的项目管理工具，自动分配任务、预测项目进度和风险评估。",
          upvotes: 156
        }
      ]
    },
    {
      title: "Indie Hackers",
      logo: "https://www.indiehackers.com/images/favicons/favicon--32x32.png",
      update_time: "2024-01-15T14:20:00Z",
      posts: [
        {
          title: "从0到100万用户的增长策略",
          url: "https://example.com/growth-strategy",
          description: "独立开发者分享如何在18个月内将产品用户数从0增长到100万的完整策略。",
          upvotes: 312
        },
        {
          title: "开源项目商业化的最佳实践",
          url: "https://example.com/open-source-monetization",
          description: "探讨开源项目如何在保持开放性的同时实现可持续的商业化。",
          upvotes: 198
        }
      ]
    }
  ],
  reddits: [
    {
      title: "r/SaaS",
      logo: "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png",
      update_time: "2024-01-15T09:45:00Z",
      posts: [
        {
          title: "SaaS增长黑客技巧分享",
          url: "https://reddit.com/r/saas/growth-hacks",
          description: "分享一些实用的SaaS产品增长策略，包括用户获取、留存和变现技巧。",
          upvotes: 156
        },
        {
          title: "如何在6个月内将MRR从0增长到10万",
          url: "https://reddit.com/r/saas/mrr-growth",
          description: "一位创业者分享他的SaaS产品从零到月收入10万的完整历程。",
          upvotes: 234
        },
        {
          title: "2024年最值得关注的SaaS趋势",
          url: "https://reddit.com/r/saas/trends-2024",
          description: "分析2024年SaaS行业的主要趋势，包括AI集成、垂直化和订阅模式创新。",
          upvotes: 98
        }
      ]
    },
    {
      title: "r/Entrepreneur",
      logo: "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png",
      update_time: "2024-01-15T11:20:00Z",
      posts: [
        {
          title: "从副业到全职创业的转换时机",
          url: "https://reddit.com/r/entrepreneur/side-to-full",
          description: "讨论何时应该从副业转为全职创业，以及需要考虑的关键因素。",
          upvotes: 187
        },
        {
          title: "创业失败后的反思与重新开始",
          url: "https://reddit.com/r/entrepreneur/failure-restart",
          description: "一位连续创业者分享失败经验和重新开始的心得体会。",
          upvotes: 145
        },
        {
          title: "小团队如何与大公司竞争",
          url: "https://reddit.com/r/entrepreneur/small-vs-big",
          description: "分析小团队在面对大公司竞争时的优势和策略。",
          upvotes: 203
        }
      ]
    },
    {
      title: "r/startups",
      logo: "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png",
      update_time: "2024-01-15T13:30:00Z",
      posts: [
        {
          title: "种子轮融资的完整指南",
          url: "https://reddit.com/r/startups/seed-funding-guide",
          description: "详细介绍种子轮融资的准备工作、投资人选择和谈判技巧。",
          upvotes: 289
        },
        {
          title: "技术创始人的常见错误",
          url: "https://reddit.com/r/startups/tech-founder-mistakes",
          description: "总结技术背景创始人在创业过程中容易犯的错误和避免方法。",
          upvotes: 167
        }
      ]
    }
  ],
  trendings: [
    {
      title: "GitHub Trending",
      logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      update_time: "2024-01-15T11:00:00Z",
      posts: [
        {
          title: "Next.js 15 - 全栈React框架",
          url: "https://github.com/vercel/next.js",
          description: "最新版本的Next.js，带来了更好的性能优化和开发体验。",
          upvotes: 892
        },
        {
          title: "Shadcn/ui - 现代UI组件库",
          url: "https://github.com/shadcn-ui/ui",
          description: "基于Radix UI和Tailwind CSS的现代化React组件库。",
          upvotes: 567
        },
        {
          title: "Cursor - AI代码编辑器",
          url: "https://github.com/getcursor/cursor",
          description: "集成AI助手的代码编辑器，提供智能代码补全和生成功能。",
          upvotes: 423
        },
        {
          title: "Supabase - 开源Firebase替代品",
          url: "https://github.com/supabase/supabase",
          description: "开源的后端即服务平台，提供数据库、认证、实时订阅等功能。",
          upvotes: 678
        }
      ]
    },
    {
      title: "Hacker News",
      logo: "https://news.ycombinator.com/favicon.ico",
      update_time: "2024-01-15T12:15:00Z",
      posts: [
        {
          title: "OpenAI发布GPT-5预览版",
          url: "https://news.ycombinator.com/gpt5-preview",
          description: "OpenAI宣布GPT-5的早期预览版，在推理能力和多模态处理方面有显著提升。",
          upvotes: 1234
        },
        {
          title: "苹果Vision Pro销量超预期",
          url: "https://news.ycombinator.com/vision-pro-sales",
          description: "苹果Vision Pro在发布后的销量表现超出市场预期，AR/VR市场迎来新机遇。",
          upvotes: 678
        },
        {
          title: "Meta推出新一代VR头显",
          url: "https://news.ycombinator.com/meta-vr-headset",
          description: "Meta发布了新一代VR头显，在分辨率和舒适度方面都有显著改进。",
          upvotes: 456
        }
      ]
    },
    {
      title: "Product Hunt",
      logo: "https://ph-files.imgix.net/a5d9c1a8-8f8a-4f8a-8f8a-8f8a8f8a8f8a?auto=format&fit=crop&frame=1&h=512&w=1024",
      update_time: "2024-01-15T15:45:00Z",
      posts: [
        {
          title: "AI写作助手获得今日第一",
          url: "https://producthunt.com/ai-writing-assistant",
          description: "一款基于GPT-4的AI写作助手在Product Hunt上获得今日产品第一名。",
          upvotes: 789
        },
        {
          title: "无代码自动化工具爆火",
          url: "https://producthunt.com/no-code-automation",
          description: "新推出的无代码自动化工具在Product Hunt上获得大量关注和好评。",
          upvotes: 534
        }
      ]
    }
  ]
};

// 模拟API响应格式
export const mockApiResponse = {
  success: true,
  data: mockNewsData,
  message: "数据获取成功"
};