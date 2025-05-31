
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, PieChart, TrendingUp, TrendingDown, Mail, User, Clock, Archive, Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const EmailStatistics = () => {
  const [timeRange, setTimeRange] = useState('thisMonth');

  // Sample data for charts
  const dailyEmailData = [
    { date: '03-10', received: 45, sent: 12, processed: 38 },
    { date: '03-11', received: 52, sent: 18, processed: 42 },
    { date: '03-12', received: 38, sent: 15, processed: 35 },
    { date: '03-13', received: 65, sent: 22, processed: 58 },
    { date: '03-14', received: 48, sent: 14, processed: 44 },
    { date: '03-15', received: 71, sent: 25, processed: 63 },
    { date: '03-16', received: 42, sent: 16, processed: 38 }
  ];

  const categoryData = [
    { name: '项目相关', value: 156, color: '#3B82F6' },
    { name: '会议资料', value: 89, color: '#10B981' },
    { name: '重要邮件', value: 45, color: '#F59E0B' },
    { name: '抄送阅知', value: 234, color: '#8B5CF6' },
    { name: '限时反馈', value: 67, color: '#EF4444' },
    { name: '其他', value: 123, color: '#6B7280' }
  ];

  const senderTypeData = [
    { type: '本部门人员', count: 145, percentage: 35 },
    { type: '本部门领导', count: 67, percentage: 16 },
    { type: '其他部门', count: 89, percentage: 22 },
    { type: '外部机构', count: 78, percentage: 19 },
    { type: '其他', count: 32, percentage: 8 }
  ];

  const priorityTrendData = [
    { month: '1月', high: 45, medium: 123, low: 234 },
    { month: '2月', high: 52, medium: 145, low: 267 },
    { month: '3月', high: 38, medium: 134, low: 289 }
  ];

  const processingTimeData = [
    { category: '高优先级', avgTime: 2.5, target: 4 },
    { category: '中优先级', avgTime: 6.8, target: 8 },
    { category: '低优先级', avgTime: 24.5, target: 24 },
    { category: '抄送邮件', avgTime: 1.2, target: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">邮件数据分析</h2>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">今日</SelectItem>
              <SelectItem value="thisWeek">本周</SelectItem>
              <SelectItem value="thisMonth">本月</SelectItem>
              <SelectItem value="lastMonth">上月</SelectItem>
              <SelectItem value="thisQuarter">本季度</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新数据
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">总邮件数</p>
                <p className="text-3xl font-bold text-blue-700">1,247</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <Mail className="h-12 w-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">已处理</p>
                <p className="text-3xl font-bold text-green-700">1,089</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm text-green-600">87.3% 完成率</span>
                </div>
              </div>
              <Archive className="h-12 w-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">待处理</p>
                <p className="text-3xl font-bold text-orange-700">158</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-600">平均6.2小时</span>
                </div>
              </div>
              <Clock className="h-12 w-12 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">超期邮件</p>
                <p className="text-3xl font-bold text-red-700">23</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">需优先处理</span>
                </div>
              </div>
              <TrendingDown className="h-12 w-12 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Email Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              每日邮件趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyEmailData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="received" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="processed" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm">接收邮件</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">已处理</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              邮件分类分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sender Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              发件人类型分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {senderTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{item.type}</div>
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Processing Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              处理时间分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={processingTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis label={{ value: '小时', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="avgTime" fill="#F59E0B" name="平均处理时间" />
                <Bar dataKey="target" fill="#10B981" name="目标时间" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-sm">平均处理时间</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">目标时间</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            优先级趋势分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priorityTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="high" stroke="#EF4444" strokeWidth={3} name="高优先级" />
              <Line type="monotone" dataKey="medium" stroke="#F59E0B" strokeWidth={3} name="中优先级" />
              <Line type="monotone" dataKey="low" stroke="#10B981" strokeWidth={3} name="低优先级" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm">高优先级</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-sm">中优先级</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm">低优先级</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            数据洞察与建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-green-700 mb-2">处理效率良好</h4>
              <p className="text-sm text-gray-600">本月邮件处理效率为87.3%，超过目标85%</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-orange-700 mb-2">高优先级关注</h4>
              <p className="text-sm text-gray-600">高优先级邮件平均处理时间2.5小时，符合标准</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-red-700 mb-2">需要改进</h4>
              <p className="text-sm text-gray-600">23封邮件超期未处理，建议优先关注</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailStatistics;
