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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI驱动的线索分析工作台
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            线索拆解
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            通过AI智能分析，深度挖掘产品线索，为您的创新决策提供数据支撑
          </p>
        </div>

        {/* 功能特性 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="liquid-glass p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="p-4 rounded-2xl bg-purple-100 w-fit mb-6">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">智能分析引擎</h3>
            <p className="text-gray-600 leading-relaxed">
              基于大语言模型的深度分析，自动识别产品趋势、用户需求和市场机会
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="p-4 rounded-2xl bg-blue-100 w-fit mb-6">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">实时数据处理</h3>
            <p className="text-gray-600 leading-relaxed">
              毫秒级响应，实时处理海量数据源，确保分析结果的时效性和准确性
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-3xl bg-gradient-to-br from-teal-500/10 to-green-500/10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="p-4 rounded-2xl bg-teal-100 w-fit mb-6">
              <Target className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">精准洞察报告</h3>
            <p className="text-gray-600 leading-relaxed">
              生成详细的分析报告，包含可执行的建议和预测性洞察
            </p>
          </div>
        </div>

        {/* 使用场景 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">适用场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-purple-100 mt-1">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">产品经理</h4>
                  <p className="text-gray-600">分析用户反馈，发现产品改进机会</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-blue-100 mt-1">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">创业者</h4>
                  <p className="text-gray-600">识别市场空白，验证商业想法</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-teal-100 mt-1">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">投资人</h4>
                  <p className="text-gray-600">评估项目潜力，发现投资机会</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-green-100 mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">市场研究</h4>
                  <p className="text-gray-600">深度分析行业趋势和竞争格局</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-orange-100 mt-1">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">技术团队</h4>
                  <p className="text-gray-600">技术选型决策，架构优化建议</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-red-100 mt-1">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">运营团队</h4>
                  <p className="text-gray-600">用户行为分析，增长策略制定</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 等候名单 */}
        <div className="liquid-glass p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              抢先体验
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              产品即将上线，加入等候名单获得优先体验权
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="输入您的邮箱地址"
                  className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <span>加入等候</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <p className="text-green-700 font-semibold">
                  感谢您的关注！我们会在产品上线时第一时间通知您。
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="p-4 rounded-2xl bg-purple-100 w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">1,247</div>
            <div className="text-gray-600">等候名单用户</div>
          </div>
          
          <div className="text-center">
            <div className="p-4 rounded-2xl bg-blue-100 w-fit mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">2-3周</div>
            <div className="text-gray-600">预计上线时间</div>
          </div>
          
          <div className="text-center">
            <div className="p-4 rounded-2xl bg-teal-100 w-fit mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-teal-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">免费</div>
            <div className="text-gray-600">早期用户特权</div>
          </div>
        </div>

        {/* 技术架构预览 */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">技术架构预览</h2>
          <div className="liquid-glass p-8 rounded-3xl bg-gradient-to-br from-gray-500/5 to-blue-500/5">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">AI驱动的分析引擎</h3>
              <p className="text-gray-600">
                基于最新的大语言模型和机器学习算法，提供精准的数据分析和洞察
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">数据采集</h4>
                <p className="text-sm text-gray-600">多源数据实时采集</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">智能处理</h4>
                <p className="text-sm text-gray-600">AI模型深度分析</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-teal-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">洞察生成</h4>
                <p className="text-sm text-gray-600">生成可执行建议</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white/50 hover:bg-white/70 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">结果呈现</h4>
                <p className="text-sm text-gray-600">可视化报告输出</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};