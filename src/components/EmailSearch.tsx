
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, History, Star, Calendar, User, FileText, Filter } from 'lucide-react';

const EmailSearch = () => {
  const [searchHistory] = useState([
    '发件人：张三 关键词：项目计划',
    '会议纪要 2024年3月',
    '重要邮件 未读',
  ]);

  const [favorites] = useState([
    '高优先级未读邮件',
    '本周会议相关',
    '待处理邮件',
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">智能检索</h2>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            邮件搜索
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="输入关键词搜索邮件..." className="flex-1" />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              搜索
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="发件人" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有人</SelectItem>
                <SelectItem value="internal">内部人员</SelectItem>
                <SelectItem value="external">外部人员</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="日期范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">今天</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="custom">自定义</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="邮件状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="unread">未读</SelectItem>
                <SelectItem value="important">重要</SelectItem>
                <SelectItem value="attachment">有附件</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              搜索历史
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {searchHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span className="text-sm">{item}</span>
                  <Button variant="ghost" size="sm">重新搜索</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Favorite Searches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              收藏搜索
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {favorites.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span className="text-sm">{item}</span>
                  <Button variant="ghost" size="sm">搜索</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>搜索结果</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { subject: '项目进度汇报 - 第一季度', sender: '张三', date: '2024-03-15', priority: 'high' },
              { subject: '会议纪要：产品规划讨论', sender: '李四', date: '2024-03-14', priority: 'medium' },
              { subject: '合同审批流程确认', sender: '王五', date: '2024-03-13', priority: 'high' },
            ].map((email, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{email.subject}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>发件人：{email.sender}</span>
                      <span>日期：{email.date}</span>
                    </div>
                  </div>
                  <Badge variant={email.priority === 'high' ? 'destructive' : 'secondary'}>
                    {email.priority === 'high' ? '高优先级' : '普通'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { EmailSearch };
