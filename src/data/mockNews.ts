// 模拟新闻数据，符合 Apifox NewsResponse 接口定义
export const mockNewsData = {
  "new_products": [
    {
      "title": "Product Hunt",
      "logo": "https://ph-static.imgix.net/ph-favicon-brand-500.ico?auto=format",
      "update_time": "2025-07-19T23:38:13.777192Z",
      "posts": [
        {
          "title": "Barrier",
          "url": "https://www.producthunt.com/posts/barrier",
          "description": "通过阻止上瘾的应用程序，请停止驱动器！\n          \n          \n            讨论\n            |\n            关联",
          "upvotes": 347
        },
        {
          "title": "LLM SEO EEAT",
          "url": "https://www.producthunt.com/posts/llm-seo-eeat",
          "description": "免费的SEO检查Google的E-E-A-T内容指南\n          \n          \n            讨论\n            |\n            关联",
          "upvotes": 68
        }
      ]
    },
    {
      "title": "Hacker News",
      "logo": "https://news.ycombinator.com/y18.svg",
      "update_time": "2025-07-20T00:16:39.303057Z",
      "posts": [
        {
          "title": "Show HN：Dataramen，一个快速的SQL Explorer，具有自动加入和数据导航",
          "url": "https://dataramen.xyz/",
          "description": null,
          "upvotes": 47
        },
        {
          "title": "Show HN：A以Emacs org模式编写的“选择自己的冒险”",
          "url": "https://tendollaradventure.com/sample/",
          "description": null,
          "upvotes": 153
        },
        {
          "title": "Show HN：Klartraum，一种神经渲染推理引擎",
          "url": "https://github.com/fortmeier/klartraum",
          "description": null,
          "upvotes": 4
        },
        {
          "title": "Show HN：每天跑步十年，可视化",
          "url": "https://nodaysoff.run",
          "description": null,
          "upvotes": 953
        },
        {
          "title": "Show HN：HTML迷宫 - 逃脱带有HTML页面的令人毛骨悚然的迷宫",
          "url": "https://htmlmaze.com/",
          "description": null,
          "upvotes": 63
        },
        {
          "title": "Show HN：ArchGW  - 代理商的智能边缘和服务代理",
          "url": "https://github.com/katanemo/archgw/",
          "description": null,
          "upvotes": 117
        },
        {
          "title": "显示HN：超过Z²+C，绘制任何分形",
          "url": "https://www.juliascope.com/",
          "description": null,
          "upvotes": 101
        },
        {
          "title": "Show HN：我以iOS 6.0的Skeuomormormormormormormormormormormormormormormormormormormormormormormormormormormormormormormormormormormorphic的方式6.0制作了",
          "url": "https://apps.apple.com/us/app/scan-convert-to-pdf/id6727013863",
          "description": null,
          "upvotes": 5
        },
        {
          "title": "Show HN：在浏览器中运行的Interactive Bash教程",
          "url": "https://sandbox.bio/tutorials/bash-script",
          "description": null,
          "upvotes": 8
        },
        {
          "title": "Show HN：BloomSearch  - 带有层次Bloom过滤器的关键字搜索",
          "url": "https://github.com/danthegoodman1/bloomsearch",
          "description": null,
          "upvotes": 65
        }
      ]
    },
    {
      "title": "阮一峰的网络日志",
      "logo": "https://www.ruanyifeng.com/favicon.ico",
      "update_time": "2025-07-19T23:38:30.882995Z",
      "posts": [
        {
          "title": "科技爱好者周刊（第 357 期）：稳定币的博弈",
          "url": "http://www.ruanyifeng.com/blog/2025/07/weekly-issue-357.html",
          "description": "这里记录每周值得分享的科技内容，周五发布。...",
          "upvotes": 0
        }
      ]
    }
  ],
  "reddits": [
    {
      "title": "r/SaaS",
      "logo": "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.reddit.com/&size=32",
      "update_time": "2025-07-19T23:33:34.725317Z",
      "posts": [
        {
          "title": "🚀用自主代理建造我的AI驱动的虚拟办公室 - 仍然是WIP，但是核心架构融合在一起！",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4ishs/building_my_aipowered_virtual_office_with/",
          "description": "由 /u /u /aparna_pradhan [link] [注释]提交",
          "upvotes": 0
        },
        {
          "title": "为Next构建完全动态的RBAC和UBAC样板。",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4in5u/building_a_fully_dynamic_rbac_ubac_boilerplate/",
          "description": "大家好，我正在研究一种新开发人员工具，旨在解决构建可扩展应用程序中常见的疼痛点：基于动态角色和基于用户的访问控制（RBAC和UBAC）。 Here’s what I’m planning: A Next.js / MERN boilerplate that lets you create and manage roles and permissions dynamically at runtime (no hardcoded roles in code) An admin UI to create roles, assign granular permissions, and link users to multiple roles without redeploying Built-in permission guards to protect routes and UI components based on live role and user permissions Support for multi-tenancy and scoped permissions for SaaS企业应用程序专注于开发人员的体验和可扩展性，因此它可以适应其他堆栈以及大多数现有的解决方案的硬码角色，或者无法提供完整的运行时灵活性，因此我想构建一些实用且易于集成的东西。我仍处于早期阶段，很想听听任何人：在他们的应用程序中与RBAC/UBAC挣扎的人想要一个灵活的，充满活力的权限系统，开箱即用的想法或功能，他们希望在这样的工具中看到，如果听起来很有趣，我会喜欢任何反馈！感谢您的阅读！    由 /u /u /vivid-argument8609 [link] [注释]提交",
          "upvotes": 0
        },
        {
          "title": "我14岁，建立了一个带有AI提示的个人理财应用程序。会喜欢您的反馈！",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4ig84/im_14_and_built_a_personal_finance_app_with_ai/",
          "description": "嘿，开发人员👋我在过去的一年中一直在学习全栈网络开发，并刚刚启动了一个名为Spenlys的网络应用程序。这是一个由以下原因构建的个人理财应用程序： -  next.js- prisma/postgresql- tailwind- AI生成的财务提示功能： - 添加和跟踪费用 - 分类和分析支出 - 获得AI（预算，投资等）的智能货币技巧 - 清洁，最少的UI使用Dark Theme（您可以在此处尝试使用它）（您可以在此处尝试使用它）（您都无法学习）（您都需要学习）。现在，我想获得真正的用户并根据反馈改进。想知道： - 您如何看待该应用程序＆UI？ - 有技术反馈吗？ - 您会使用类似的东西吗？提前致谢！    由 /u /adadvanced4007 [link] [注释]提交",
          "upvotes": 0
        },
        {
          "title": "是的！第一个客户的感觉！",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4ig3j/its_true_the_first_customer_feeling/",
          "description": "我在这里看到了许多有关您看到第一次订阅时感觉如何的帖子。圣洁的牛，感觉很好。 desiresynth.com现在已经过了一个月的时间，但是今天是有人购买了超帐户信用额的第一天，我没想到会对它感到如此激动！人们正在享受我创造的东西，而不仅仅是愿意为此付出代价。这证明了我的想法，现在只会让我想更加努力地推动！继续前进，第一个客户会来的！ （就我的网站而言，希望从字面上看！） /u /u /u /googlyamnesiac [link] [评论]提交",
          "upvotes": 0
        },
        {
          "title": "寻找合作伙伴或联合创始人 - 建立了一个自托管的发票工具（26个用户，准备扩展）",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4idjf/looking_for_partner_or_cofounder_built_a/",
          "description": "嘿，我是InvoiceFlexi背后的独奏开发人员，这是为自由职业者和小型企业建造的自托发票生成器。它具有：发票和客户管理PDF导出清洁，响应式UI一次性许可证或白色标签潜力🌐现场演示：https：//www.invoiceflexi.com到目前为止，到目前为止，我有26个用户有机，但我无法按照我希望的方式扩展。我不想让它坐下来，而是想与可以通过以下方式之一提供帮助的人合作：✅共同创始人或成长伙伴 - 在销售，营销或分销方面经验丰富的人。 ✅白色标签交易 - 想要根据自己的品牌定制和转售的代理商或经销商。 ✅Bizdev帮助 - 愿意对创意进行进一步发展。我是首先是开发人员 - 不是营销人员 - 我很想与在这里看到机会的人合作。 DM我，如果您有兴趣或想谈论可能性。提供您的反馈。 （不是一个垃圾广告 - 仅分享我构建的可能对他人有用的东西。）由 /u /wittyrun9570 [link] [评论]提交",
          "upvotes": 0
        },
        {
          "title": "在Play Store和App Store中发布应用程序有多困难？",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4i7sv/how_hard_is_to_publish_apps_in_play_store_and_app/",
          "description": "大家好，您能指导我如何发布应用程序，诸如Lookout之类的内容。  谢谢。     由 /u /sameer_559 [link] [注释]提交",
          "upvotes": 0
        },
        {
          "title": "🚀建造$ 1B独角兽机器人平台的第16天🦄",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4i5ce/day_16_of_building_a_1b_unicorn_bot_platform/",
          "description": "今天花费了约10小时的编码👨‍💻 bot自动空间交易和自动固定，如果用户编辑/取消pnl计算完成了下一步完成的DEVOPS更新：将PNL图表添加到UI + Auto Post Daily Pnl每日pnl向社交pof to/u/u/u/u/u/u/theAhsanusman cormection📊🤖",
          "upvotes": 0
        },
        {
          "title": "厌倦了等待“天才”的想法？这就是我最近发现真正的Saas机会的方式。",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4hyff/tired_of_waiting_for_a_genius_idea_heres_how_ive/",
          "description": "在最长的时间里，我认为我需要一个辉煌的，从未见过的想法来开始一个严肃的项目。所以我一直在等待。和过度思考。看着其他建筑商运送东西，成长并增加其MRR。但是最近，我开始以不同的方式接近事情：x Reddit上的每一个咆哮，每个“为什么这仍然在2025年仍然很烂？”，YouTube教程下的每个评论，都是Goldmines。每个都是信号。 Micro-pain ===最近，我一直看到许多独立黑客在发射之后就抱怨他们的产品只是扁平线...我认为这不是一个浮华的主意...但是，如果您深入思考，如果您深入思考，您会注意到，这实际上是值得的。  在思考您的想法之前，请记住Google不是第一个搜索引擎，但现在它的最高点...只需听人们抱怨的内容并开始为小组建立问题：其他人开采社区以引发项目创意吗？您将最怪异或最奇特的投诉是什么？    由 /u /ochienge [link] [评论]提交",
          "upvotes": 0
        },
        {
          "title": "处理现实世界中的问题 - 帮助建立解决方案！",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4hgrq/take_on_realworld_problems_help_build_solutions/",
          "description": "您是否注意到许多人和技术人员一直在寻找要解决的问题，无论是下一个创业，黑客马拉松还是投资组合项目？我最近找到了一个名为“问题”的平台，该平台在一个地方收集了来自世界各地的实际问题，为那些想要产生影响的人准备好了。值得一提的是：它列出了全球人群中众包的实际问题。许多技术人员参观，特别是在寻找可以通过技能解决的问题。该平台是任何想要SaaS产品，物联网小工具，应用程序或创新项目的人的金矿。您也可以提交自己的问题或挑战，以便其他人考虑接受。  如果您是那种通过解决真正的挑战而充满活力的人，那么您将在这里找到无数的机会。您如何参与：浏览问题列表，看看是否有兴趣。发布您自己的问题。没有什么太大或太小。邀请您知道的其他问题索具。  很想听听您的想法，尤其是如果您最终通过网站解决或发布任何有趣的问题！：https://problemos.web.app///u/u/u/u/harshitweb [link] [link] [评论]",
          "upvotes": 0
        },
        {
          "title": "我会烤你的英雄横幅，并建议英雄内容 - 仅SaaS",
          "url": "https://www.reddit.com/r/SaaS/comments/1m4hdy8/ill_roast_your_hero_banner_and_suggest_hero/",
          "description": "提交您的网站。我将烤您的网站的英雄横幅内容，这是人们决定是否进一步滚动的地方。也是展示定位的地方。决定那里发生什么是一个困难的呼吁，所以我不是在这里判断。我只是给出另一种视角并帮助。如果我觉得该网站还没有准备好反馈，我会这么说，请不要误会。现在您可以继续PS：去年我在同一Subreddit中做了一个，并回答了90个网站https://www.reddit.com/r/saas/comments/comments/1cq5xz6/ill_roast_roast_your_your_hero_hero_hero_hero_hero_hero_hero_hero_herner_andner_andner_suggest_hero/ u/snr-snr-sathish [link link sathish [links sathish [links] [links [link]",
          "upvotes": 0
        }
      ]
    },
    {
      "title": "r/ProductHunters",
      "logo": "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.reddit.com/&size=32",
      "update_time": "2025-07-19T23:33:57.656540Z",
      "posts": [
        {
          "title": "无聊的商业想法实际上赚钱（以及如何找到它们）",
          "url": "https://www.reddit.com/r/ProductHunters/comments/1m460iq/boring_business_ideas_that_actually_make_money/",
          "description": "大家好，觉得每个商业想法都需要超级酷，技术或令人兴奋？像应用程序，AI或精美的小工具？是的，我也是。但是猜怎么着？真正的赚钱魔法通常会掩盖超级无聊或完全未知的小角落（壁ni）。严重地！没有人谈论的东西可以是您开始某件事的门票。但是，是的，很难专注于一个无聊的项目，我认为这就是为什么没有人打扰他们的原因。为什么无聊/未知的壁nire秘密地很棒：不那么拥挤：几乎没有其他人在这样做！您不会与其他1000家业务作斗争。更容易开始：通常需要更少的疯狂技术或巨额资金。人们需要解决方案：即使出于无聊的问题，人们也会感到沮丧，并会付费。您可以快速成为专家：成为那一件奇怪的事情的人。忠实的客户：如果您解决了他们的特定烦人问题，他们会爱您。好的，但是您如何找到这些隐藏的宝石？不要过度思考。简单开始：看看您的烦恼：什么小而无聊的东西会让您发疯？清洁特定的东西？在您的爱好中解决一个奇怪的事情？也许其他人也讨厌它！收听投诉：人们对在线（论坛，Facebook组，Reddit）抱怨什么？ “ U，我希望有一种更简单的方法来清洁我的[特定事物]”或“为我的[旧机器]找到[非常具体的部分]是不可能的！”想想超级特定：而不是“宠物产品”，而是考虑“糖尿病刺猬的自然零食”。而不是“健身”，而是为膝盖不好的高个子锻炼。检查爱好和激情：尤其是不寻常的爱好。该小组的人们遇到什么问题？他们需要哪些特殊工具或信息？ Google东西：输入您的“无聊的想法” +诸如“问题”，“解决方案”，“如何to”，“ forum”，“ Buy”之类的单词。看看人们是在谈论它还是想买东西。已经有东西要出售了吗？ （这实际上很好 - 这意味着人们付款！）。 “谁需要这个？”：想象一个非常具体的人。谁到底有这个无聊的问题？ （例如，“ 1980年代老式的浓缩咖啡机的所有者”，“为谋生组织手工艺室的人）。 “无聊”黄金的示例（认真！）：用于船/RVS上难以触及的特殊清洁工具。旧电器的替换零件。舒适的衣服适合某些医疗状况的人。有关照顾稀有植物/宠物的信息指南。组织系统，用于非常具体的收藏（例如乐高迷你人物或种子）。用于利基行业的超级特定软件插件。希望我的帖子对您有帮助。请考虑给它一个投票。现在是时候自我促进了，如果您是制造商，独立黑客或只是推出很酷的东西，请随时将您的项目提交到https://justgotfound.com。它是免费的 - 有时候，您的产品只有5只新眼睛可以使一切与众不同。    由 /u /u /panicintelligent1204 [link] [注释]提交",
          "upvotes": 0
        }
      ]
    },
    {
      "title": "r/SideProject",
      "logo": "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.reddit.com/&size=32",
      "update_time": "2025-07-19T23:37:35.175367Z",
      "posts": [
        {
          "title": "我的第一个项目 - 尝试做某事 - 氛围编码",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4il0j/my_1st_project_tried_to_do_something_vibe_coding/",
          "description": "使用Vibe编码设计了整个网站。试图遵循 /u /u /remoy-pride-4886 [link] [link] [注释]提交的趋势bzbytes",
          "upvotes": 0
        },
        {
          "title": "介绍R/Indiehackerscrew",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4iit9/introducing_rindiehackerscrew/",
          "description": "大家好！我注意到，诸如R/sideproject，r/buildInpublic和等的许多子列表大多是人们努力垃圾广告的地方，这就是为什么我决定介绍我的新subreddit，r/indiehackercrew的原因。它是所有独奏程序员，独立黑客，BuildInpublic创建者，分享他们的项目，分享技巧，分享他们的进步，获得批评和反馈等等的款项。  借助我的Subreddit，我希望创建一个可以建立惊人的副项目并共同创造更好的未来的地方，这是由像我们这样的人创造的，而不是只关心股东价值的大型技术。     由 /u /jestont [link] [评论]提交",
          "upvotes": 0
        },
        {
          "title": "您会觉得自己说什么：“嗯，不再这样”？",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4ihl4/what_do_you_catch_yourself_saying_ugh_not_this/",
          "description": "可能是任何事情 - 无聊的任务，情感斗争，不起作用的工具，决定等等。只需真正的答案。您可能会激发一些有用的东西。    由 /u /u /firner_hedgehog_444 [link] [link] [注释]提交",
          "upvotes": 0
        },
        {
          "title": "debateai.app-观看AI模型进行有关任何主题的结构性辩论",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4ihfo/debateaiapp_watch_ai_models_engage_in_structured/",
          "description": "嘿r/sideproject！ 👋只是想分享我最近从事的工作 - 叫做debateai.app。基本上，这是一个平台，不同的AI模型（例如GPT-4，Claude等）就您抛出的任何主题互相辩论。将其视为一场现场结构化的辩论，具有AI驱动的个性，每个人都带来了自己的观点。这是快速的勺子：🎭它的作用：上传PDF，粘贴URL或仅输入主题 - 然后坐下来观看这些AI模型进行周到，有时是有趣的辩论。非常适合探索不同的观点，学习或只是娱乐。 🚀 Key features:  Mix & match AI models in one debate Each AI has its own persona & style Watch debates unfold in real-time with cool animations Upload docs or links to inform the discussion Ask questions during or after the debate Customize rules like rounds or turn limits Get insights with AI-powered debate analysis  💡 Use cases:  Students diving into complex topics from different angles Researchers wanting quick perspectives Content creators making engaging debate videos Anyone curious about pros ＆在任何主题上都只是为了娱乐 -  AI就愚蠢的话题争论！  这是对AI和辩论的独特之处，我认为它具有许多学习，内容或娱乐的潜力。很想听听您的想法，或者如果您尝试一下！检查一下：Debateai.App感谢您的支持！ 🚀由 /u /rjozefowicz提交[link] [注释]",
          "upvotes": 0
        },
        {
          "title": "我如何找到真正销售的微型SAA的想法（而不是在回购中收集灰尘）",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4icly/how_i_find_microsaas_ideas_that_actually_sell/",
          "description": "在构建了一些没有人真正使用的“酷”工具之后，我改变了我的想法找到方法。现在，我只追逐疼痛点，而不是灵感。现在，我找到了实际上可以变成付费产品的微型SAA的想法：逐步：潜伏在人们抱怨的地方（Reddit，Twitter/X，Discord，Niche Forums）不寻找功能...寻找挫败感。示例：“为什么[工具]仍然不能让我导出清洁的CSV？” ←那是一个信号。搜索情绪，我从字面上搜索了：“我讨厌[工具/产品名称]”“其他人是否与……”  将确切的单词复制到我不过滤的文档中...只需保存原始的咆哮即可。以后编写着陆页时，这会有所帮助。当您在社区中看到相同的投诉3次以上时，现场模式可能不仅仅是噪音。需求。建立愚蠢的专注MVP，没有仪表板，没有额外的绒毛。只是一个解决一个烦人的事情的按钮。  这是因为：您不猜测人们可能想要什么。您从人们已经讨厌的东西开始。疼痛存在。您只需要成为阿司匹林即可。启动一个“问题滑动文件” ...一个概念/文档，您可以在其中复制发现的每一个挫败感。像对待您的启动想法保险库一样对待它。如果这里有人在做类似的事情，很想听听您最近发现的东西。让我们交换投诉😂 /u /ochienge [link] [评论]提交的投诉",
          "upvotes": 0
        },
        {
          "title": "在5天内制作了金融生存游戏，实际上推出了它（最后）",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4hy08/made_a_financial_survival_game_in_5_days_and/",
          "description": "发生了什么事，所以我只是在考虑项目，但从未真正发起任何东西。我几个月前推出了这件事，但从未真正做过任何事情。昨晚，我终于通过添加了这款财务挑战功能来改进并改进了它，我制作了这款网络游戏，您基本上可以看到在不同情况下可以在经济上生存多长时间。这就像一个现实检查，但变成了游戏，所以觉得旧版本看起来太正式和有点像我正在收集我不打算和不打算这样做的数据那样令人沮丧。现在，我希望它更像是一个简单的小游戏，整个事情花了我5天。我用AI帮助加快了速度，并使用了尾风反应。我一直在尝试自己学习编程，通常我的项目永远坐在那里，而没有看到一天的光芒，最奇怪的是，来自随机国家的人们已经找到了它并播放了它，即使我根本没有推广它。老实说，这感觉很酷，并给了我这种小的多巴胺增强，知道是的，实际上可以构建人们现在使用的东西，它是完全免费的，只是想让人们发现一些人可能会发现有用或有趣的东西，您可以在财务生存挑战赛中检查一下，如果您想从中学到的主要事物，那就是我从此中学到的东西实际上启动了在您的计算机上启动完美的代码。还一直在尝试学习SEO的东西，以吸引更多的人在这里发现它有机地与实际启动自己的项目而不是永远构建它们的人？而且，如果您确实启动了某些内容，它如何使您第一次觉得，如果有人尝试游戏，请让我知道您的想法，很想听听您对感觉的反馈，或者是什么可以使它更好地提交。",
          "upvotes": 0
        },
        {
          "title": "创建了一个松懈的机器人，通过自动建议将相关的独立消息互相螺纹来帮助保持松弛频道清洁",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4h1e6/created_a_slack_bot_that_help_keeps_slack/",
          "description": "刚刚完成创建线程巡逻。一个使用AI来帮助保持频道组织的新的Slack Bot，该机器人通过明智地暗示是否应该将独立消息组合在一起来组织。 It acts as an automated channel moderator and identifies whether messages belong to each other in 2 ways:  Quick Follow-up: If a user posts 2 messages in a row after a very brief period, it automatically assumes the second message is posted as a follow up to the first and will suggest threading it together AI context analysis: For other messages, it analyzes the conversation context to find the best thread match across the most recent posted messages  When a match is found, the bot posts a threaded suggestion, prompting the user要单击一个“移动”按钮，该按钮将创建其消息的副本，以作为对先前相关消息的螺纹回复。用户要做的一切就是删除刚刚移动的旧消息，以保持频道整理。在这里我需要您的帮助：机器人位于Beta中。如果您能尝试一下，我将非常感激。即使只是在工作空间中安装它也是一个巨大的帮助，因为该机器人只有被邀请到频道时才有效。  有关数据隐私的重要信息：我们的承诺是您的隐私和安全性。 AI线程巡逻从未存储您的松弛消息的内容。为了找到线程建议，该机器人暂时读取频道中的最新消息，并将其发送到Google的AI进行分析。这是安全完成的，Google不会使用您的数据来训练他们的模型。我保存的唯一数据是机器人运行所需的信息，例如安装令牌和消息时间戳。卸载应用程序时，将永久删除工作空间的所有关联的安装数据和操作元数据。阅读有关该机器人可以访问的数据以及我实施的设置类型的更多信息，以确保Gemini的培训模型在我正在链接的“隐私政策”页面中不使用您的数据，我正在寻找反馈！我非常有趣，我真的很想使它尽可能有用。一旦您有机会尝试一下，我很想听听您对一些事情的想法：建议它们准确吗？他们应该是私人的（短暂的）而不是公开吗？他们是侵入性的吗？  除了现有 /帮助斜线命令外，其他功能除了与线程巡逻队当前的功能还有用吗？  定价我的目标是最终获利。根据其提供的价值，什么是合理的价格点？   支持：只需回复此主题或给我写DM，谢谢大家都提前提交了 /u /draungules [link] [评论]",
          "upvotes": 0
        },
        {
          "title": "为我的网络开发机构制作了徽标！！ 🎉",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4gy47/made_the_logo_for_my_web_development_agency/",
          "description": "嘿，人们！因此，我将启动自己的网络开发机构，该机构将遵循构建着陆页，投资组合网站和多页网站的利基市场。我为我的网站制作了一个LIL印刷徽标。检查一下您的想法！！    由 /u /u /silverprologer [link] [评论]提交",
          "upvotes": 0
        },
        {
          "title": "附带项目的想法：像AI一样研究YouTube，带有1个搜索。这是使用趋势chatgpt代理更新的演示。",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4gt6r/side_project_idea_research_youtube_like_an_ai/",
          "description": "我正在建立下一个科学家，该工具通过立即研究YouTube视频来回答您的问题。为了测试它，我使用了最新的趋势主题chatgpt代理，并将其作为搜索查询。它没有观看10多个视频，而是在几秒钟内给我一个直接的答案。可以将其视为一名AI研究人员，为您观察内容。分享您的想法，您正在建立什么？    由 /u /u /pumpkinnarrow6339 [link] [注释]提交",
          "upvotes": 0
        },
        {
          "title": "小胜利：使用关键字警报尽早捕获LinkedIn对话",
          "url": "https://www.reddit.com/r/SideProject/comments/1m4fbsi/small_win_using_keyword_alerts_to_catch_linkedin/",
          "description": "大家好，想分享一个小事，可以帮助我们的团队找到更好的领导LinkedIn。当有人在帖子中提到与我们的服务相关的关键字时，我们也会使用一种工具，即使我们没有连接。这并不是一个巨大的变化，但这意味着我们不会错过参加真实对话的机会。绝对比无尽的LinkedIn滚动更好！好奇是否还有其他侧骗子使用警报或类似工具来尽早抓住潜在客户？很想交换想法！    由 /u /i_know_who_i_am_0 [link] [link] [注释]提交",
          "upvotes": 0
        }
      ]
    }
  ],
  "trendings": [
    {
      "title": "TechCrunch",
      "logo": "https://techcrunch.com/wp-content/themes/tc-24/dist/svg/tc-logo.svg",
      "update_time": "2025-07-19T23:39:23.243021Z",
      "posts": [
        {
          "title": "微软表示，它将不再将中国的工程师用于国防部工作",
          "url": "https://techcrunch.com/2025/07/19/microsoft-says-it-will-no-longer-use-engineers-in-china-for-department-of-defense-work/",
          "description": "在一份有关公共报告的报告称，微软正在使用中国的工程师来帮助维持美国国防部的云计算系统，该公司表示已进行了更改，以确保这将不再发生。",
          "upvotes": 0
        }
      ]
    },
    {
      "title": "Github Trending",
      "logo": "https://github.githubassets.com/favicons/favicon-dark.svg",
      "update_time": "2025-07-20T00:22:40.360127Z",
      "posts": [
        {
          "title": "ikawrakow/ik_llama.cpp",
          "url": "https://github.com/ikawrakow/ik_llama.cpp",
          "description": "Llama.cpp叉带有额外的sota量和提高性能",
          "upvotes": 8
        },
        {
          "title": "HotCakeX/Harden-Windows-Security",
          "url": "https://github.com/HotCakeX/Harden-Windows-Security",
          "description": "使用官方支持的Microsoft方法安全地安全地硬化Windows，并正确说明|始终是最新的，并与最新的Windows版本一起使用|为个人，企业，政府和军事安全水平提供工具和指南|阅读Rationalehttps：//github.com/hotcakex/harden-windows-security/blob/main/rationale.md",
          "upvotes": 12
        },
        {
          "title": "actions/runner-images",
          "url": "https://github.com/actions/runner-images",
          "description": "github动作跑步者图像",
          "upvotes": 11
        },
        {
          "title": "influxdata/telegraf",
          "url": "https://github.com/influxdata/telegraf",
          "description": "用于收集，处理，汇总和编写指标，日志和其他任意数据的代理。",
          "upvotes": 115
        },
        {
          "title": "strapi/strapi",
          "url": "https://github.com/strapi/strapi",
          "description": "🚀Strapi是领先的开源无头CM。它是100％JavaScript/Typescript，完全可自定义，开发人员首先。",
          "upvotes": 236
        },
        {
          "title": "Lightricks/LTX-Video",
          "url": "https://github.com/Lightricks/LTX-Video",
          "description": "LTX-VIDEO的官方存储库",
          "upvotes": 144
        },
        {
          "title": "Kyome22/RunCat365",
          "url": "https://github.com/Kyome22/RunCat365",
          "description": "Windows任务栏上的一个可爱的运行猫动画。",
          "upvotes": 132
        },
        {
          "title": "gitleaks/gitleaks",
          "url": "https://github.com/gitleaks/gitleaks",
          "description": "查找gitleaks的秘密🔑",
          "upvotes": 232
        },
        {
          "title": "n8n-io/n8n",
          "url": "https://github.com/n8n-io/n8n",
          "description": "具有本机AI功能的公平代码工作流程自动化平台。将视觉构建与自定义代码，自宿主或云相结合，400+集成。",
          "upvotes": 695
        },
        {
          "title": "mrdbourke/pytorch-deep-learning",
          "url": "https://github.com/mrdbourke/pytorch-deep-learning",
          "description": "学习Pytorch的材料进行深度学习：零至掌握课程。",
          "upvotes": 43
        }
      ]
    },
    {
      "title": "A16Z",
      "logo": null,
      "update_time": "2025-07-19T23:40:59.072571Z",
      "posts": [
        {
          "title": "马克·安德森（Marc Andreessen）和乔·隆斯代尔（Joe Lonsdale）",
          "url": "https://a16z.simplecast.com/episodes/marc-andreessen-and-joe-lonsdale-on-tariffs-and-trade-m_5q6nlD",
          "description": "今天，我们将分享与马克·安德森（Marc Andreessen）与乔·朗斯代尔（Joe Lonsdale）交谈的美国乐观主义者的一集，并在首届罗纳德·里根（Ronald Reagan）经济论坛上进行了现场录制。\n\n他们探索了我们这个时代最紧急，最复杂的问题之一：AI和机器人能否促进美国工业实力的新时代，以及我们如何确保整个国家（包括农村社区）的份额？\n\n马克（Marc）浏览了美国工业化的历史，麦金莱（McKinley）等领导人的关税和贸易教训以及美国向基于服务的经济转移的方式有助于推动我们当前的城乡鸿沟。对话涵盖了移民政策，住房，教育，能源以及真正由AI驱动的制造业复兴的途径，以触摸需要改变的方法以及如何进行。\n\n对于任何思考AI时代的美国生产力，增长和领导力的未来的人来说，这一集都是必不可少的。",
          "upvotes": 0
        }
      ]
    }
  ]
}

// 模拟API响应格式
export const mockApiResponse = {
  success: true,
  data: mockNewsData,
  message: "数据获取成功"
};