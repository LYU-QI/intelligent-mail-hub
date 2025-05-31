
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Settings, Search, BarChart3, Bell, Filter, Archive, Forward, Flag, Eye, Trash2 } from 'lucide-react';
import { EmailClassification } from './EmailClassification';
import { EmailAutoRouting } from './EmailAutoRouting';
import { EmailSearch } from './EmailSearch';
import { EmailStatistics } from './EmailStatistics';
import { EmailNotifications } from './EmailNotifications';

const EmailManagement = () => {
  const [activeTab, setActiveTab] = useState('classification');
  const [unreadCount, setUnreadCount] = useState(12);
  const [priorityCount, setPriorityCount] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              智能邮件分类与处理系统
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            基于人工智能的邮件管理平台，提供智能分类、自动分流、检索统计和提醒通知功能
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <Mail className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">未读邮件</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">{unreadCount}</Badge>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
              <Flag className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">高优先级</span>
              <Badge variant="secondary" className="bg-red-100 text-red-700">{priorityCount}</Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b bg-white/50 backdrop-blur-sm">
                <TabsList className="grid w-full grid-cols-5 h-16 bg-transparent p-2">
                  <TabsTrigger 
                    value="classification" 
                    className="flex flex-col gap-1 py-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="text-xs">邮件分类</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="routing" 
                    className="flex flex-col gap-1 py-3 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                  >
                    <Filter className="h-5 w-5" />
                    <span className="text-xs">自动分流</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="search" 
                    className="flex flex-col gap-1 py-3 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                  >
                    <Search className="h-5 w-5" />
                    <span className="text-xs">检索统计</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="statistics" 
                    className="flex flex-col gap-1 py-3 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-xs">数据分析</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="flex flex-col gap-1 py-3 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="text-xs">提醒通知</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="classification" className="mt-0">
                  <EmailClassification />
                </TabsContent>
                
                <TabsContent value="routing" className="mt-0">
                  <EmailAutoRouting />
                </TabsContent>
                
                <TabsContent value="search" className="mt-0">
                  <EmailSearch />
                </TabsContent>
                
                <TabsContent value="statistics" className="mt-0">
                  <EmailStatistics />
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <EmailNotifications />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailManagement;
