import React from 'react';
import { Zap, TrendingUp, Lightbulb, MessageCircle, Users, Code, BarChart3 } from 'lucide-react';
import { Channel } from '../types';

// 新产品发布相关渠道数据
export const productLaunchChannels: Channel[] = [
  {
    id: 'product-hunt',
    name: 'Product Hunt',
    icon: <Zap size={20} />,
    updateTime: '2小时前',
    color: '#FF6154',
    bgGradient: 'from-orange-500/20 to-red-500/20',
    articles: [
      {
        id: 1,
        title: "Notion AI 2.0 正式发布：重新定义知识管理",
        summary: "全新的AI助手功能，支持多语言内容生成和智能摘要...",
        link: "#",
        date: "2小时前",
        views: 1280,
        likes: 89
      },
      {
        id: 2,
        title: "Figma Dev Mode：设计到开发的无缝衔接",
        summary: "为开发者量身定制的新功能，提供代码生成和组件检查...",
        link: "#",
        date: "4小时前",
        views: 950,
        likes: 67
      },
      {
        id: 3,
        title: "Linear 新版本：项目管理的极简美学",
        summary: "重新设计的界面和工作流，让团队协作更加高效...",
        link: "#",
        date: "6小时前",
        views: 720,
        likes: 45
      },
      {
        id: 4,
        title: "Stripe Terminal：线下支付的数字化革命",
        summary: "全新的硬件解决方案，让实体店铺轻松接入数字支付...",
        link: "#",
        date: "8小时前",
        views: 680,
        likes: 52
      },
      {
        id: 5,
        title: "Vercel v1.0：前端部署的新标准",
        summary: "更快的构建速度，更智能的边缘计算优化...",
        link: "#",
        date: "10小时前",
        views: 890,
        likes: 73
      },
      {
        id: 6,
        title: "Supabase Auth：开源身份验证的完整解决方案",
        summary: "支持多种登录方式，企业级安全保障...",
        link: "#",
        date: "12小时前",
        views: 560,
        likes: 38
      },
      {
        id: 7,
        title: "Tailwind UI Pro：组件库的设计系统升级",
        summary: "全新的组件集合，支持React、Vue和Angular...",
        link: "#",
        date: "14小时前",
        views: 1120,
        likes: 94
      },
      {
        id: 8,
        title: "GitHub Copilot X：AI编程助手的进化",
        summary: "集成ChatGPT-4，提供更智能的代码建议和文档生成...",
        link: "#",
        date: "16小时前",
        views: 1450,
        likes: 128
      },
      {
        id: 9,
        title: "Framer Motion 3.0：动画库的性能革命",
        summary: "更流畅的动画效果，更小的包体积...",
        link: "#",
        date: "18小时前",
        views: 780,
        likes: 61
      },
      {
        id: 10,
        title: "Next.js 14：全栈框架的新里程碑",
        summary: "App Router稳定版，服务器组件的完整支持...",
        link: "#",
        date: "20小时前",
        views: 2100,
        likes: 187
      }
    ]
  },
  {
    id: 'tech-crunch',
    name: 'TechCrunch',
    icon: <TrendingUp size={20} />,
    updateTime: '1小时前',
    color: '#00D084',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    articles: [
      {
        id: 11,
        title: "OpenAI发布GPT-4 Turbo：更快更便宜的AI模型",
        summary: "新模型在保持性能的同时，大幅降低了使用成本...",
        link: "#",
        date: "1小时前",
        views: 3200,
        likes: 245
      },
      {
        id: 12,
        title: "苹果Vision Pro开发者预览版体验报告",
        summary: "首批开发者分享的真实使用感受和开发心得...",
        link: "#",
        date: "3小时前",
        views: 2800,
        likes: 198
      },
      {
        id: 13,
        title: "Meta推出Code Llama：专为编程优化的AI模型",
        summary: "基于Llama 2的代码生成模型，支持多种编程语言...",
        link: "#",
        date: "5小时前",
        views: 1900,
        likes: 156
      },
      {
        id: 14,
        title: "特斯拉FSD Beta v12：神经网络的完全自动驾驶",
        summary: "告别规则引擎，完全基于神经网络的驾驶决策...",
        link: "#",
        date: "7小时前",
        views: 2400,
        likes: 203
      },
      {
        id: 15,
        title: "Google Bard集成Gmail和Drive：AI助手的生产力革命",
        summary: "无缝集成工作流，让AI成为真正的生产力工具...",
        link: "#",
        date: "9小时前",
        views: 1600,
        likes: 134
      },
      {
        id: 16,
        title: "微软Copilot Studio：无代码AI应用构建平台",
        summary: "让非技术人员也能创建自定义AI助手...",
        link: "#",
        date: "11小时前",
        views: 1200,
        likes: 89
      },
      {
        id: 17,
        title: "Amazon Q：企业级AI助手的全面解决方案",
        summary: "专为企业环境设计的AI助手，支持私有数据训练...",
        link: "#",
        date: "13小时前",
        views: 980,
        likes: 76
      },
      {
        id: 18,
        title: "Anthropic Claude 2.1：更长上下文的AI对话",
        summary: "支持200K token的超长对话，理解能力大幅提升...",
        link: "#",
        date: "15小时前",
        views: 1400,
        likes: 112
      },
      {
        id: 19,
        title: "Stability AI推出SDXL Turbo：实时图像生成",
        summary: "单步生成高质量图像，实时创作成为可能...",
        link: "#",
        date: "17小时前",
        views: 1800,
        likes: 145
      },
      {
        id: 20,
        title: "Midjourney V6：AI艺术创作的新标杆",
        summary: "更精确的提示理解，更真实的图像生成效果...",
        link: "#",
        date: "19小时前",
        views: 2200,
        likes: 189
      }
    ]
  },
  {
    id: 'indie-hackers',
    name: 'Indie Hackers',
    icon: <Lightbulb size={20} />,
    updateTime: '3小时前',
    color: '#4792E6',
    bgGradient: 'from-blue-500/20 to-indigo-500/20',
    articles: [
      {
        id: 21,
        title: "从0到$10K MRR：SaaS产品的增长复盘",
        summary: "一个独立开发者的12个月创业历程和经验总结...",
        link: "#",
        date: "3小时前",
        views: 1500,
        likes: 123
      },
      {
        id: 22,
        title: "AI工具的商业化路径：5个成功案例分析",
        summary: "从技术demo到盈利产品的转化策略...",
        link: "#",
        date: "5小时前",
        views: 1200,
        likes: 98
      },
      {
        id: 23,
        title: "无代码创业：用Bubble构建$50K ARR产品",
        summary: "非技术背景创始人的产品开发和运营心得...",
        link: "#",
        date: "7小时前",
        views: 890,
        likes: 67
      },
      {
        id: 24,
        title: "Newsletter变现指南：从1000订阅者到$5K月收入",
        summary: "内容创作者的商业化实践和增长策略...",
        link: "#",
        date: "9小时前",
        views: 1100,
        likes: 89
      },
      {
        id: 25,
        title: "Chrome扩展开发：6个月达到10万用户",
        summary: "从想法到产品的完整开发和推广流程...",
        link: "#",
        date: "11小时前",
        views: 950,
        likes: 78
      },
      {
        id: 26,
        title: "微SaaS成功秘诀：专注细分市场的力量",
        summary: "小而美的产品如何在竞争激烈的市场中脱颖而出...",
        link: "#",
        date: "13小时前",
        views: 1300,
        likes: 105
      },
      {
        id: 27,
        title: "API产品的定价策略：从免费到企业级",
        summary: "技术产品的商业模式设计和价格体系构建...",
        link: "#",
        date: "15小时前",
        views: 780,
        likes: 62
      },
      {
        id: 28,
        title: "社区驱动增长：Discord服务器的商业价值",
        summary: "如何通过社区建设实现产品的有机增长...",
        link: "#",
        date: "17小时前",
        views: 1050,
        likes: 84
      },
      {
        id: 29,
        title: "AI辅助开发：提升10倍生产力的工具链",
        summary: "独立开发者必备的AI工具和使用技巧...",
        link: "#",
        date: "19小时前",
        views: 1400,
        likes: 118
      },
      {
        id: 30,
        title: "从Side Project到全职创业的转换时机",
        summary: "何时离开舒适圈，全身心投入创业项目...",
        link: "#",
        date: "21小时前",
        views: 1600,
        likes: 134
      }
    ]
  }
];

// 市场洞察渠道数据
export const marketInsights: Channel[] = [
  {
    id: 'market-insights',
    name: 'Market Insights',
    icon: <TrendingUp size={20} />,
    updateTime: '2.5小时前',
    color: '#8B5CF6',
    bgGradient: 'from-violet-500/20 to-purple-500/20',
    articles: [
      {
        id: 81,
        title: "2024年SaaS市场规模预测和增长机会",
        summary: "软件即服务市场的发展趋势和投资热点...",
        link: "#",
        date: "2.5小时前",
        views: 1500,
        likes: 125
      },
      {
        id: 82,
        title: "消费者行为变化对产品策略的影响",
        summary: "后疫情时代用户需求的结构性变化...",
        link: "#",
        date: "4小时前",
        views: 1200,
        likes: 98
      },
      {
        id: 83,
        title: "新兴市场的数字化转型机遇",
        summary: "发展中国家的技术跨越和商业机会...",
        link: "#",
        date: "6小时前",
        views: 890,
        likes: 72
      },
      {
        id: 84,
        title: "B2B采购决策流程的数字化演进",
        summary: "企业采购行为的变化和销售策略调整...",
        link: "#",
        date: "8小时前",
        views: 1050,
        likes: 84
      },
      {
        id: 85,
        title: "垂直SaaS的市场机会和竞争格局",
        summary: "行业特定软件解决方案的发展前景...",
        link: "#",
        date: "10小时前",
        views: 980,
        likes: 79
      },
      {
        id: 86,
        title: "创作者经济的商业模式创新",
        summary: "内容创作者的变现方式和平台策略...",
        link: "#",
        date: "12小时前",
        views: 1100,
        likes: 89
      },
      {
        id: 87,
        title: "企业数字化转型的投资优先级",
        summary: "企业IT预算分配和技术选型趋势...",
        link: "#",
        date: "14小时前",
        views: 750,
        likes: 61
      },
      {
        id: 88,
        title: "远程工作工具市场的竞争态势",
        summary: "协作软件和生产力工具的市场分析...",
        link: "#",
        date: "16小时前",
        views: 1200,
        likes: 96
      },
      {
        id: 89,
        title: "金融科技创新的监管环境变化",
        summary: "Fintech行业的合规要求和发展机遇...",
        link: "#",
        date: "18小时前",
        views: 820,
        likes: 66
      },
      {
        id: 90,
        title: "健康科技市场的投资热点分析",
        summary: "数字健康领域的创新方向和商业机会...",
        link: "#",
        date: "20小时前",
        views: 1400,
        likes: 115
      }
    ]
  }
];

// Reddit和SaaS相关渠道数据
export const redditSaasChannels: Channel[] = [
  {
    id: 'reddit-saas',
    name: 'Reddit SaaS',
    icon: <MessageCircle size={20} />,
    updateTime: '30分钟前',
    color: '#FF4500',
    bgGradient: 'from-orange-500/20 to-red-600/20',
    articles: [
      {
        id: 31,
        title: "SaaS定价心理学：为什么$99比$100更有效",
        summary: "深度分析定价策略对用户决策的心理影响...",
        link: "#",
        date: "30分钟前",
        views: 890,
        likes: 67
      },
      {
        id: 32,
        title: "客户流失分析：如何预测和防止用户离开",
        summary: "数据驱动的客户保留策略和实施方法...",
        link: "#",
        date: "2小时前",
        views: 1200,
        likes: 94
      },
      {
        id: 33,
        title: "B2B销售漏斗优化：从线索到成交的完整流程",
        summary: "销售团队必备的转化率提升技巧...",
        link: "#",
        date: "4小时前",
        views: 750,
        likes: 58
      },
      {
        id: 34,
        title: "SaaS产品的用户引导设计：降低流失率的关键",
        summary: "新用户onboarding流程的最佳实践...",
        link: "#",
        date: "6小时前",
        views: 980,
        likes: 76
      },
      {
        id: 35,
        title: "订阅模式的财务建模：MRR、LTV和CAC计算",
        summary: "SaaS业务的核心指标和财务分析方法...",
        link: "#",
        date: "8小时前",
        views: 1100,
        likes: 89
      },
      {
        id: 36,
        title: "竞品分析框架：如何系统性研究竞争对手",
        summary: "产品经理必备的市场调研和分析技能...",
        link: "#",
        date: "10小时前",
        views: 850,
        likes: 65
      },
      {
        id: 37,
        title: "SaaS客户成功团队建设：从0到1的完整指南",
        summary: "如何构建高效的客户成功体系...",
        link: "#",
        date: "12小时前",
        views: 920,
        likes: 71
      },
      {
        id: 38,
        title: "API优先的产品策略：构建可扩展的SaaS架构",
        summary: "技术架构决策对产品发展的长远影响...",
        link: "#",
        date: "14小时前",
        views: 780,
        likes: 62
      },
      {
        id: 39,
        title: "SaaS安全合规：GDPR和SOC2认证实践指南",
        summary: "企业级SaaS产品的安全和合规要求...",
        link: "#",
        date: "16小时前",
        views: 650,
        likes: 48
      },
      {
        id: 40,
        title: "多租户架构设计：SaaS平台的技术基础",
        summary: "如何设计支持大规模用户的SaaS系统...",
        link: "#",
        date: "18小时前",
        views: 1050,
        likes: 84
      }
    ]
  },
  {
    id: 'reddit-entrepreneur',
    name: 'Reddit Entrepreneur',
    icon: <Users size={20} />,
    updateTime: '1小时前',
    color: '#FF4500',
    bgGradient: 'from-red-500/20 to-pink-500/20',
    articles: [
      {
        id: 41,
        title: "创业公司的股权分配：避免常见陷阱",
        summary: "联合创始人之间的股权设计和法律考量...",
        link: "#",
        date: "1小时前",
        views: 1300,
        likes: 108
      },
      {
        id: 42,
        title: "种子轮融资准备：投资人最关心的10个问题",
        summary: "早期创业公司的融资策略和准备工作...",
        link: "#",
        date: "3小时前",
        views: 1500,
        likes: 125
      },
      {
        id: 43,
        title: "远程团队管理：分布式工作的最佳实践",
        summary: "如何建设高效的远程工作文化和流程...",
        link: "#",
        date: "5小时前",
        views: 890,
        likes: 72
      },
      {
        id: 44,
        title: "产品市场匹配度验证：PMF的量化指标",
        summary: "如何科学地评估产品与市场的匹配程度...",
        link: "#",
        date: "7小时前",
        views: 1100,
        likes: 91
      },
      {
        id: 45,
        title: "创业公司的品牌建设：从命名到视觉识别",
        summary: "早期品牌策略和视觉设计的实用指南...",
        link: "#",
        date: "9小时前",
        views: 750,
        likes: 59
      },
      {
        id: 46,
        title: "技术债务管理：快速迭代与代码质量的平衡",
        summary: "创业公司技术团队的开发策略选择...",
        link: "#",
        date: "11小时前",
        views: 980,
        likes: 78
      },
      {
        id: 47,
        title: "用户研究方法：低成本获取有效用户反馈",
        summary: "资源有限情况下的用户调研技巧...",
        link: "#",
        date: "13小时前",
        views: 820,
        likes: 66
      },
      {
        id: 48,
        title: "创业公司的法律风险防范：必备的法律知识",
        summary: "创始人需要了解的基础法律和合规要求...",
        link: "#",
        date: "15小时前",
        views: 1200,
        likes: 95
      },
      {
        id: 49,
        title: "增长黑客实战：低成本获客的创新方法",
        summary: "创业公司的营销增长策略和案例分析...",
        link: "#",
        date: "17小时前",
        views: 1400,
        likes: 116
      },
      {
        id: 50,
        title: "创业失败复盘：从失败中学到的宝贵经验",
        summary: "真实的创业失败案例和经验教训分享...",
        link: "#",
        date: "19小时前",
        views: 1600,
        likes: 134
      }
    ]
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    icon: <Zap size={20} />,
    updateTime: '2小时前',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500/20 to-indigo-500/20',
    articles: [
      {
        id: 51,
        title: "产品发布策略：如何制造话题和关注度",
        summary: "成功产品发布的营销策略和执行要点...",
        link: "#",
        date: "2小时前",
        views: 1100,
        likes: 89
      },
      {
        id: 52,
        title: "Beta测试管理：收集有效反馈的方法论",
        summary: "产品发布前的测试策略和用户反馈收集...",
        link: "#",
        date: "4小时前",
        views: 850,
        likes: 68
      },
      {
        id: 53,
        title: "发布时机选择：市场窗口期的判断标准",
        summary: "如何选择最佳的产品发布时间点...",
        link: "#",
        date: "6小时前",
        views: 920,
        likes: 74
      },
      {
        id: 54,
        title: "媒体关系建设：获得科技媒体报道的技巧",
        summary: "如何与科技记者和博主建立有效关系...",
        link: "#",
        date: "8小时前",
        views: 780,
        likes: 62
      },
      {
        id: 55,
        title: "社交媒体营销：产品发布的数字化推广",
        summary: "利用社交平台扩大产品发布影响力...",
        link: "#",
        date: "10小时前",
        views: 1050,
        likes: 84
      },
      {
        id: 56,
        title: "影响者合作：KOL营销的策略和执行",
        summary: "如何选择和合作适合的行业影响者...",
        link: "#",
        date: "12小时前",
        views: 890,
        likes: 71
      },
      {
        id: 57,
        title: "发布后运营：维持产品热度的长期策略",
        summary: "产品发布后的持续营销和用户维护...",
        link: "#",
        date: "14小时前",
        views: 750,
        likes: 58
      },
      {
        id: 58,
        title: "竞品发布应对：如何在竞争中保持优势",
        summary: "面对竞品发布的应对策略和差异化定位...",
        link: "#",
        date: "16小时前",
        views: 980,
        likes: 79
      },
      {
        id: 59,
        title: "全球化发布：跨地区产品推广的挑战",
        summary: "国际市场产品发布的本地化策略...",
        link: "#",
        date: "18小时前",
        views: 680,
        likes: 54
      },
      {
        id: 60,
        title: "发布效果评估：衡量产品发布成功的指标",
        summary: "如何科学评估产品发布的效果和ROI...",
        link: "#",
        date: "20小时前",
        views: 1200,
        likes: 96
      }
    ]
  }
];

// 技术趋势和产品需求趋势渠道数据
export const trendChannels: Channel[] = [
  {
    id: 'tech-trends',
    name: 'Tech Trends',
    icon: <Code size={20} />,
    updateTime: '45分钟前',
    color: '#10B981',
    bgGradient: 'from-emerald-500/20 to-green-500/20',
    articles: [
      {
        id: 61,
        title: "WebAssembly在前端开发中的应用前景",
        summary: "WASM技术如何改变Web应用的性能边界...",
        link: "#",
        date: "45分钟前",
        views: 1200,
        likes: 98
      },
      {
        id: 62,
        title: "边缘计算的发展趋势：CDN到Edge Functions",
        summary: "边缘计算技术的演进和商业应用场景...",
        link: "#",
        date: "2小时前",
        views: 890,
        likes: 72
      },
      {
        id: 63,
        title: "Rust语言在系统编程中的崛起",
        summary: "内存安全和性能并重的系统级编程语言...",
        link: "#",
        date: "4小时前",
        views: 1050,
        likes: 84
      },
      {
        id: 64,
        title: "量子计算的商业化进展：从实验室到产业",
        summary: "量子计算技术的最新突破和应用前景...",
        link: "#",
        date: "6小时前",
        views: 750,
        likes: 61
      },
      {
        id: 65,
        title: "5G网络对移动应用开发的影响",
        summary: "高速网络如何改变移动应用的设计思路...",
        link: "#",
        date: "8小时前",
        views: 980,
        likes: 78
      },
      {
        id: 66,
        title: "区块链技术在供应链管理中的应用",
        summary: "去中心化技术解决传统供应链痛点...",
        link: "#",
        date: "10小时前",
        views: 680,
        likes: 55
      },
      {
        id: 67,
        title: "机器学习模型的边缘部署趋势",
        summary: "AI推理从云端到设备端的技术演进...",
        link: "#",
        date: "12小时前",
        views: 1100,
        likes: 89
      },
      {
        id: 68,
        title: "低代码平台的技术架构演进",
        summary: "可视化开发工具的底层技术实现...",
        link: "#",
        date: "14小时前",
        views: 820,
        likes: 66
      },
      {
        id: 69,
        title: "云原生架构的最佳实践",
        summary: "容器化和微服务架构的设计原则...",
        link: "#",
        date: "16小时前",
        views: 1300,
        likes: 105
      },
      {
        id: 70,
        title: "Web3技术栈的发展现状",
        summary: "去中心化Web的技术基础和发展方向...",
        link: "#",
        date: "18小时前",
        views: 950,
        likes: 76
      }
    ]
  },
  {
    id: 'product-trends',
    name: 'Product Trends',
    icon: <BarChart3 size={20} />,
    updateTime: '1.5小时前',
    color: '#F59E0B',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    articles: [
      {
        id: 71,
        title: "AI驱动的个性化推荐系统设计趋势",
        summary: "机器学习如何重塑用户体验和产品策略...",
        link: "#",
        date: "1.5小时前",
        views: 1400,
        likes: 115
      },
      {
        id: 72,
        title: "订阅经济模式的产品设计原则",
        summary: "如何设计让用户持续付费的产品体验...",
        link: "#",
        date: "3小时前",
        views: 1100,
        likes: 89
      },
      {
        id: 73,
        title: "无障碍设计：包容性产品的商业价值",
        summary: "可访问性设计如何扩大用户群体和市场...",
        link: "#",
        date: "5小时前",
        views: 780,
        likes: 63
      },
      {
        id: 74,
        title: "语音交互界面的设计挑战和机遇",
        summary: "VUI设计的最佳实践和未来发展方向...",
        link: "#",
        date: "7小时前",
        views: 890,
        likes: 71
      },
      {
        id: 75,
        title: "数据隐私法规对产品设计的影响",
        summary: "GDPR和CCPA如何改变产品的数据收集策略...",
        link: "#",
        date: "9小时前",
        views: 950,
        likes: 76
      },
      {
        id: 76,
        title: "跨平台产品体验的一致性设计",
        summary: "多设备时代的产品体验统一化策略...",
        link: "#",
        date: "11小时前",
        views: 1050,
        likes: 84
      },
      {
        id: 77,
        title: "游戏化设计在非游戏产品中的应用",
        summary: "如何用游戏机制提升产品参与度...",
        link: "#",
        date: "13小时前",
        views: 1200,
        likes: 96
      },
      {
        id: 78,
        title: "实时协作功能的产品设计模式",
        summary: "多人协作产品的交互设计和技术实现...",
        link: "#",
        date: "15小时前",
        views: 820,
        likes: 66
      },
      {
        id: 79,
        title: "可持续发展理念在产品设计中的体现",
        summary: "绿色产品设计的原则和实践方法...",
        link: "#",
        date: "17小时前",
        views: 680,
        likes: 54
      },
      {
        id: 80,
        title: "元宇宙产品的用户体验设计挑战",
        summary: "虚拟世界中的交互设计和用户行为研究...",
        link: "#",
        date: "19小时前",
        views: 1300,
        likes: 108
      }
    ]
  },
  {
    id: 'market-insights',
    name: 'Market Insights',
    icon: <TrendingUp size={20} />,
    updateTime: '2.5小时前',
    color: '#8B5CF6',
    bgGradient: 'from-violet-500/20 to-purple-500/20',
    articles: [
      {
        id: 81,
        title: "2024年SaaS市场规模预测和增长机会",
        summary: "软件即服务市场的发展趋势和投资热点...",
        link: "#",
        date: "2.5小时前",
        views: 1500,
        likes: 125
      },
      {
        id: 82,
        title: "消费者行为变化对产品策略的影响",
        summary: "后疫情时代用户需求的结构性变化...",
        link: "#",
        date: "4小时前",
        views: 1200,
        likes: 98
      },
      {
        id: 83,
        title: "新兴市场的数字化转型机遇",
        summary: "发展中国家的技术跨越和商业机会...",
        link: "#",
        date: "6小时前",
        views: 890,
        likes: 72
      },
      {
        id: 84,
        title: "B2B采购决策流程的数字化演进",
        summary: "企业采购行为的变化和销售策略调整...",
        link: "#",
        date: "8小时前",
        views: 1050,
        likes: 84
      },
      {
        id: 85,
        title: "垂直SaaS的市场机会和竞争格局",
        summary: "行业特定软件解决方案的发展前景...",
        link: "#",
        date: "10小时前",
        views: 980,
        likes: 79
      },
      {
        id: 86,
        title: "创作者经济的商业模式创新",
        summary: "内容创作者的变现方式和平台策略...",
        link: "#",
        date: "12小时前",
        views: 1100,
        likes: 89
      },
      {
        id: 87,
        title: "企业数字化转型的投资优先级",
        summary: "企业IT预算分配和技术选型趋势...",
        link: "#",
        date: "14小时前",
        views: 750,
        likes: 61
      },
      {
        id: 88,
        title: "远程工作工具市场的竞争态势",
        summary: "协作软件和生产力工具的市场分析...",
        link: "#",
        date: "16小时前",
        views: 1200,
        likes: 96
      },
      {
        id: 89,
        title: "金融科技创新的监管环境变化",
        summary: "Fintech行业的合规要求和发展机遇...",
        link: "#",
        date: "18小时前",
        views: 820,
        likes: 66
      },
      {
        id: 90,
        title: "健康科技市场的投资热点分析",
        summary: "数字健康领域的创新方向和商业机会...",
        link: "#",
        date: "20小时前",
        views: 1400,
        likes: 115
      }
    ]
  }
];