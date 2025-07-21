import React, { useState } from 'react';
import { Brain, Zap, Target, Users, Clock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const ClueAnalysisPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="px-6 py-12 mx-auto max-w-6xl">
        {/* 页面标题 */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
            <Sparkles className="mr-2 w-4 h-4" />
            AI驱动的线索分析工作台
          </div>
          <h1 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            线索拆解工作台
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            通过AI智能分析，深度挖掘产品线索，为您的创新决策提供数据支撑
          </p>
        </div>

        {/* 功能特性 */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-8 bg-gradient-to-br rounded-3xl transition-all duration-500 transform liquid-glass from-purple-500/10 to-blue-500/10 hover:shadow-2xl hover:-translate-y-2">
            <div className="p-4 mb-6 bg-purple-100 rounded-2xl w-fit">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">智能分析引擎</h3>
            <p className="leading-relaxed text-gray-600">
              基于大语言模型的深度分析，自动识别产品趋势、用户需求和市场机会
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br rounded-3xl transition-all duration-500 transform liquid-glass from-blue-500/10 to-teal-500/10 hover:shadow-2xl hover:-translate-y-2">
            <div className="p-4 mb-6 bg-blue-100 rounded-2xl w-fit">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">实时数据处理</h3>
            <p className="leading-relaxed text-gray-600">
              毫秒级响应，实时处理海量数据源，确保分析结果的时效性和准确性
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br rounded-3xl transition-all duration-500 transform liquid-glass from-teal-500/10 to-green-500/10 hover:shadow-2xl hover:-translate-y-2">
            <div className="p-4 mb-6 bg-teal-100 rounded-2xl w-fit">
              <Target className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">精准洞察报告</h3>
            <p className="leading-relaxed text-gray-600">
              生成详细的分析报告，包含可执行的建议和预测性洞察
            </p>
          </div>
        </div>

        {/* 使用场景 */}
        <div className="mb-16">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">适用场景</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 mt-1 bg-purple-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-800">产品经理</h4>
                  <p className="text-gray-600">分析用户反馈，发现产品改进机会</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 mt-1 bg-blue-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-800">创业者</h4>
                  <p className="text-gray-600">识别市场空白，验证商业想法</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
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
              <div className="flex items-start space-x-4">
                <div className="p-2 mt-1 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-800">市场研究</h4>
                  <p className="text-gray-600">深度分析行业趋势和竞争格局</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 mt-1 bg-orange-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-800">技术团队</h4>
                  <p className="text-gray-600">技术选型决策，架构优化建议</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
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

        {/* 等候名单 */}
        <div className="p-12 text-center bg-gradient-to-br rounded-3xl liquid-glass from-purple-500/10 to-blue-500/10">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">
              抢先体验
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              产品即将上线，加入等候名单获得优先体验权
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4 mx-auto max-w-md sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入您的邮箱地址"
                  className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 transition-all duration-300 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  required
                />
                <button
                  type="submit"
                  className="flex justify-center items-center px-8 py-4 space-x-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1"
                >
                  <span>加入等候</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                <CheckCircle className="mx-auto mb-4 w-8 h-8 text-green-600" />
                <p className="font-semibold text-green-700">
                  感谢您的关注！我们会在产品上线时第一时间通知您。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
          <div className="text-center">
            <div className="p-4 mx-auto mb-4 bg-purple-100 rounded-2xl w-fit">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mb-2 text-3xl font-bold text-gray-800">1,247</div>
            <div className="text-gray-600">等候名单用户</div>
          </div>
          
          <div className="text-center">
            <div className="p-4 mx-auto mb-4 bg-blue-100 rounded-2xl w-fit">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mb-2 text-3xl font-bold text-gray-800">2-3周</div>
            <div className="text-gray-600">预计上线时间</div>
          </div>
          
          <div className="text-center">
            <div className="p-4 mx-auto mb-4 bg-teal-100 rounded-2xl w-fit">
              <Sparkles className="w-8 h-8 text-teal-600" />
            </div>
            <div className="mb-2 text-3xl font-bold text-gray-800">免费</div>
            <div className="text-gray-600">早期用户特权</div>
          </div>
        </div>

        {/* 技术架构预览 */}
        <div className="mt-16">
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