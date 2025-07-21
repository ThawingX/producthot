import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, Users, Clock, CheckCircle, ArrowRight, Sparkles, Shield, Database, LineChart, Award, Mail } from 'lucide-react';

export const ClueAnalysisPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const [animateStats, setAnimateStats] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      // 模拟API请求
      setTimeout(() => {
        setIsSubscribed(true);
        setEmail('');
        setIsLoading(false);
      }, 1500);
    }
  };

  // 监听滚动以触发统计数字动画
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && !animateStats) {
          setAnimateStats(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animateStats]);

  return (
    <div className="overflow-hidden pt-20 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="px-6 py-12 mx-auto max-w-6xl">
        {/* 页面标题 - 增强视觉效果 */}
        <div className="relative mb-20 text-center">
          <div className="absolute inset-0 opacity-10 -z-10">
            <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          </div>

          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-purple-700 bg-purple-100 rounded-full shadow-sm animate-pulse">
            <Sparkles className="mr-2 w-4 h-4" />
            AI驱动的线索分析工作台
          </div>

          <h1 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 md:text-6xl">
            线索拆解工作台
          </h1>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            通过AI智能分析，深度挖掘产品线索，为您的创新决策提供<span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">真实、专业、高效</span>的数据支撑
          </p>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'features' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              核心功能
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'scenarios' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              适用场景
            </button>
            {/* <button 
              onClick={() => setActiveTab('tech')} 
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${activeTab === 'tech' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/50 text-gray-600 hover:bg-white/80'}`}
            >
              技术架构
            </button> */}
          </div>
        </div>

        {/* 功能特性 - 增强真实性、专业性和高效性 */}
        <div className={`grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 h-[400px] overflow-y-auto ${activeTab === 'features' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
          <div className="p-8 bg-gradient-to-br rounded-3xl border transition-all duration-500 transform liquid-glass from-purple-500/10 to-blue-500/10 hover:shadow-2xl hover:-translate-y-2 border-purple-100/50">
            <div className="relative">
              <div className="absolute -top-4 -right-4 px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-md">
                真实可靠
              </div>
              <div className="p-4 mb-6 bg-purple-100 rounded-2xl w-fit">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">真实热门来源</h3>
            <p className="mb-4 leading-relaxed text-gray-600">
              基于Product Hunt，Hacker News，Reddit等产品、用户需求和市场机会，确保每一条线索都有据可循
            </p>
            <div className="flex items-center space-x-2 text-sm text-purple-600">
              <Shield className="w-4 h-4" />
              <span>严格基于实际产品数据和用户讨论</span>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br rounded-3xl border transition-all duration-500 transform liquid-glass from-blue-500/10 to-teal-500/10 hover:shadow-2xl hover:-translate-y-2 border-blue-100/50">
            <div className="relative">
              <div className="absolute -top-4 -right-4 px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-teal-600 rounded-full shadow-md">
                高效一体
              </div>
              <div className="p-4 mb-6 bg-blue-100 rounded-2xl w-fit">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">实时数据处理</h3>
            <p className="mb-4 leading-relaxed text-gray-600">
              实时处理海量数据源，确保分析结果的时效性和准确性，一站式完成从信息获取到线索拆解的全流程
            </p>
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <Database className="w-4 h-4" />
              <span>数据来源与分析工作台无缝集成</span>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br rounded-3xl border transition-all duration-500 transform liquid-glass from-teal-500/10 to-green-500/10 hover:shadow-2xl hover:-translate-y-2 border-teal-100/50">
            <div className="relative">
              <div className="absolute -top-4 -right-4 px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-teal-600 to-green-600 rounded-full shadow-md">
                专业赋能
              </div>
              <div className="p-4 mb-6 bg-teal-100 rounded-2xl w-fit">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">专业线索识别</h3>
            <p className="mb-4 leading-relaxed text-gray-600">
              权威的B2B线索识别SOP，可视化的线索关系图展示，帮助你发掘横向需求，竞品需求，潜在用户需求
            </p>
            <div className="flex items-center space-x-2 text-sm text-teal-600">
              <LineChart className="w-4 h-4" />
              <span>专业的横向赋能，提供决策依据</span>
            </div>
          </div>
        </div>

        {/* 使用场景 */}
        <div className={`mb-16 transition-all duration-500 h-[400px] overflow-y-auto ${activeTab === 'scenarios' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
          {/* <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">适用场景</h2> */}
          <div className="p-8 bg-gradient-to-br rounded-3xl border transition-all duration-500 transform liquid-glass from-purple-500/10 to-blue-500/10 hover:shadow-xl border-purple-100/50">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-start p-4 space-x-4 rounded-xl transition-all duration-300 bg-white/50 hover:bg-white/70 hover:shadow-md">
                  <div className="p-2 mt-1 bg-purple-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">产品经理</h4>
                    <p className="text-gray-600">分析用户反馈，发现产品改进机会</p>
                  </div>
                </div>

                <div className="flex items-start p-4 space-x-4 rounded-xl transition-all duration-300 bg-white/50 hover:bg-white/70 hover:shadow-md">
                  <div className="p-2 mt-1 bg-blue-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">创业者</h4>
                    <p className="text-gray-600">识别市场空白，验证商业想法</p>
                  </div>
                </div>

                <div className="flex items-start p-4 space-x-4 rounded-xl transition-all duration-300 bg-white/50 hover:bg-white/70 hover:shadow-md">
                  <div className="p-2 mt-1 bg-teal-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">投资人</h4>
                    <p className="text-gray-600">评估项目潜力，发现投资机会</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start p-4 space-x-4 rounded-xl transition-all duration-300 bg-white/50 hover:bg-white/70 hover:shadow-md">
                  <div className="p-2 mt-1 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">市场研究</h4>
                    <p className="text-gray-600">深度分析行业趋势和竞争格局</p>
                  </div>
                </div>

                <div className="flex items-start p-4 space-x-4 rounded-xl transition-all duration-300 bg-white/50 hover:bg-white/70 hover:shadow-md">
                  <div className="p-2 mt-1 bg-orange-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">技术团队</h4>
                    <p className="text-gray-600">技术选型决策，架构优化建议</p>
                  </div>
                </div>

                <div className="flex items-start p-4 space-x-4 rounded-xl transition-all duration-300 bg-white/50 hover:bg-white/70 hover:shadow-md">
                  <div className="p-2 mt-1 bg-red-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">运营团队</h4>
                    <p className="text-gray-600">用户行为分析，增长策略制定</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 等候名单 - 增强视觉吸引力和交互体验 */}
        <div className="overflow-hidden relative p-12 text-center bg-gradient-to-br rounded-3xl border shadow-xl liquid-glass from-purple-500/20 to-blue-500/20 border-white/30">
          {/* 装饰元素 */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl bg-purple-300/20"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl bg-blue-300/20"></div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-purple-700 rounded-full shadow-sm backdrop-blur-sm bg-purple-100/80">
              <Award className="mr-2 w-4 h-4" />
              <span>限时优先体验权</span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700">
              抢先体验线索拆解工作台
            </h2>

            <div className="p-4 mb-8 rounded-xl border shadow-inner backdrop-blur-sm bg-white/30 border-white/50">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-3 rounded-lg bg-white/50">
                  <Shield className="mx-auto mb-2 w-6 h-6 text-purple-600" />
                  <p className="text-sm font-medium text-gray-700">真实可靠的数据支持</p>
                </div>
                <div className="p-3 rounded-lg bg-white/50">
                  <Award className="mx-auto mb-2 w-6 h-6 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">专业的线索识别方法论</p>
                </div>
                <div className="p-3 rounded-lg bg-white/50">
                  <Zap className="mx-auto mb-2 w-6 h-6 text-teal-600" />
                  <p className="text-sm font-medium text-gray-700">高效的一体化工作流</p>
                </div>
              </div>
            </div>

            <p className="mb-8 text-lg text-gray-700">
              <span className="font-semibold">产品即将上线</span>，现在加入等候名单，获得：
              <span className="block mt-2 font-medium text-purple-700">✓ 优先体验权 ✓ 1对1专属培训 ✓ 免费使用特权</span>
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex relative flex-col gap-4 mx-auto max-w-md sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-6 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="输入您的邮箱地址"
                    className="py-4 pr-6 pl-14 w-full rounded-2xl border shadow-inner backdrop-blur-sm transition-all duration-300 outline-none border-white/50 bg-white/70 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center items-center px-8 py-4 space-x-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span>处理中</span>
                      <div className="w-4 h-4 rounded-full border-2 border-white animate-spin border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      <span>加入等候</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 shadow-md">
                <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-green-700">申请成功！</h3>
                <p className="text-green-700">
                  感谢您的关注！我们会在产品上线时<span className="font-semibold">第一时间</span>通知您。
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  您已成功加入等候名单，排在前 <span className="font-semibold text-purple-700">1,248</span> 位
                </p>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              我们重视您的隐私，您的邮箱信息将被严格保密，仅用于产品相关通知
            </div>
          </div>
        </div>

        {/* 统计信息 - 添加动画效果 */}
        <div id="stats-section" className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
          <div className="p-6 text-center rounded-xl border shadow-md backdrop-blur-sm transition-all duration-500 bg-white/40 border-white/30 hover:shadow-lg hover:bg-white/60">
            <div className="p-4 mx-auto mb-4 bg-purple-100 rounded-2xl shadow-inner w-fit">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-700">
              {animateStats ? (
                <span className="inline-block" key="animated-count-1">
                  <span className="animate-[count_2s_ease-out_forwards]">1,247</span>
                </span>
              ) : '0'}
            </div>
            <div className="font-medium text-gray-600">等候名单用户</div>
            <div className="mt-2 text-xs text-gray-500">每天新增约50+位用户</div>
          </div>

          <div className="p-6 text-center rounded-xl border shadow-md backdrop-blur-sm transition-all duration-500 bg-white/40 border-white/30 hover:shadow-lg hover:bg-white/60">
            <div className="p-4 mx-auto mb-4 bg-blue-100 rounded-2xl shadow-inner w-fit">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
              <span className="inline-block">2-3</span>
              <span className="ml-1 text-xl">周</span>
            </div>
            <div className="font-medium text-gray-600">预计上线时间</div>
            <div className="mt-2 text-xs text-gray-500">开发进度已完成85%</div>
          </div>

          <div className="p-6 text-center rounded-xl border shadow-md backdrop-blur-sm transition-all duration-500 bg-white/40 border-white/30 hover:shadow-lg hover:bg-white/60">
            <div className="p-4 mx-auto mb-4 bg-teal-100 rounded-2xl shadow-inner w-fit">
              <Sparkles className="w-8 h-8 text-teal-600" />
            </div>
            <div className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-green-700">
              <span className="inline-block">长期</span>
              <span className="ml-1 text-xl">免费</span>
            </div>
            <div className="font-medium text-gray-600">早期用户特权</div>
            <div className="mt-2 text-xs text-gray-500">仅限前100名用户</div>
          </div>
        </div>

        {/* 技术架构预览 */}
        <div className={`mt-16 transition-all duration-500 ${activeTab === 'tech' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">技术架构预览</h2>
          <div className="p-8 bg-gradient-to-br rounded-3xl liquid-glass from-gray-500/5 to-blue-500/5">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-xl font-bold text-gray-800">AI驱动的分析引擎</h3>
              <p className="text-gray-600">
                基于最新的大语言模型和机器学习算法，提供精准的数据分析和洞察
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="p-6 text-center rounded-2xl transition-all duration-300 bg-white/50 hover:bg-white/70">
                <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-purple-100 rounded-xl">
                  <span className="font-bold text-purple-600">1</span>
                </div>
                <h4 className="mb-2 font-semibold text-gray-800">数据采集</h4>
                <p className="text-sm text-gray-600">多源数据实时采集</p>
              </div>

              <div className="p-6 text-center rounded-2xl transition-all duration-300 bg-white/50 hover:bg-white/70">
                <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-xl">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <h4 className="mb-2 font-semibold text-gray-800">智能处理</h4>
                <p className="text-sm text-gray-600">AI模型深度分析</p>
              </div>

              <div className="p-6 text-center rounded-2xl transition-all duration-300 bg-white/50 hover:bg-white/70">
                <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-teal-100 rounded-xl">
                  <span className="font-bold text-teal-600">3</span>
                </div>
                <h4 className="mb-2 font-semibold text-gray-800">洞察生成</h4>
                <p className="text-sm text-gray-600">生成可执行建议</p>
              </div>

              <div className="p-6 text-center rounded-2xl transition-all duration-300 bg-white/50 hover:bg-white/70">
                <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-green-100 rounded-xl">
                  <span className="font-bold text-green-600">4</span>
                </div>
                <h4 className="mb-2 font-semibold text-gray-800">结果呈现</h4>
                <p className="text-sm text-gray-600">可视化报告输出</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};