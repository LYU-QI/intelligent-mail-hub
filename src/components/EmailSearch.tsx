
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, History, Star, Calendar as CalendarIcon, User, Mail, FileText, Clock, Bookmark, Filter, Download } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  subject: string;
  sender: string;
  recipient: string;
  date: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  hasAttachment: boolean;
  folder: string;
  relevance: number;
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  conditions: any;
  lastUsed: string;
  frequency: number;
}

export const EmailSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: '1',
      subject: '项目进度汇报 - Q4季度总结',
      sender: '张经理 <zhang@company.com>',
      recipient: '项目团队',
      date: '2024-03-15',
      content: '本季度项目进展顺利，完成了既定目标的85%...',
      priority: 'high',
      hasAttachment: true,
      folder: '项目相关',
      relevance: 0.95
    },
    {
      id: '2',
      subject: '会议纪要 - 月度总结会议',
      sender: '李秘书 <li@company.com>',
      recipient: '全体员工',
      date: '2024-03-14',
      content: '会议主要讨论了本月工作总结和下月计划...',
      priority: 'medium',
      hasAttachment: false,
      folder: '会议资料',
      relevance: 0.88
    }
  ]);

  const [searchHistory, setSearchHistory] = useState<string[]>([
    '项目进度',
    '会议纪要',
    '发件人：张经理',
    '2024年3月',
    '带附件的邮件'
  ]);

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: '1',
      name: '高优先级未读邮件',
      query: 'priority:high unread:true',
      conditions: { priority: 'high', unread: true },
      lastUsed: '2024-03-15',
      frequency: 15
    },
    {
      id: '2', 
      name: '本周会议相关邮件',
      query: '会议 date:thisweek',
      conditions: { keywords: ['会议'], date: 'thisweek' },
      lastUsed: '2024-03-14',
      frequency: 8
    }
  ]);

  const [advancedFilters, setAdvancedFilters] = useState({
    sender: '',
    recipient: '',
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
    hasAttachment: false,
    priority: '',
    folder: ''
  });

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700', 
    low: 'bg-green-100 text-green-700'
  };

  const handleSearch = () => {
    if (searchQuery) {
      setSearchHistory(prev => [searchQuery, ...prev.filter(q => q !== searchQuery)].slice(0, 10));
    }
  };

  const saveCurrentSearch = () => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name: searchQuery || '自定义搜索',
      query: searchQuery,
      conditions: advancedFilters,
      lastUsed: new Date().toISOString().split('T')[0],
      frequency: 1
    };
    setSavedSearches(prev => [newSearch, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            智能邮件检索
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="输入关键词、发件人、主题等进行搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              搜索
            </Button>
            <Button variant="outline" onClick={saveCurrentSearch}>
              <Star className="h-4 w-4 mr-2" />
              收藏
            </Button>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-xs">发件人</Label>
              <Input
                placeholder="发件人邮箱"
                value={advancedFilters.sender}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, sender: e.target.value }))}
                className="h-8"
              />
            </div>

            <div>
              <Label className="text-xs">收件人</Label>
              <Input
                placeholder="收件人邮箱"
                value={advancedFilters.recipient}
                onChange={(e) => setAdvancedFilters(prev => ({ ...prev, recipient: e.target.value }))}
                className="h-8"
              />
            </div>

            <div>
              <Label className="text-xs">开始日期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-8 w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {advancedFilters.dateFrom ? format(advancedFilters.dateFrom, "MM/dd") : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={advancedFilters.dateFrom}
                    onSelect={(date) => setAdvancedFilters(prev => ({ ...prev, dateFrom: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-xs">结束日期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-8 w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {advancedFilters.dateTo ? format(advancedFilters.dateTo, "MM/dd") : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={advancedFilters.dateTo}
                    onSelect={(date) => setAdvancedFilters(prev => ({ ...prev, dateTo: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-xs">优先级</Label>
              <Select onValueChange={(value) => setAdvancedFilters(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">高优先级</SelectItem>
                  <SelectItem value="medium">中优先级</SelectItem>
                  <SelectItem value="low">低优先级</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">文件夹</Label>
              <Select onValueChange={(value) => setAdvancedFilters(prev => ({ ...prev, folder: value }))}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="选择文件夹" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbox">收件箱</SelectItem>
                  <SelectItem value="project">项目相关</SelectItem>
                  <SelectItem value="meeting">会议资料</SelectItem>
                  <SelectItem value="urgent">紧急邮件</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Results */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  搜索结果 ({searchResults.length})
                </CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">相关性</SelectItem>
                      <SelectItem value="date">日期</SelectItem>
                      <SelectItem value="priority">优先级</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    导出
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{result.subject}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {result.sender}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {result.recipient}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {result.date}
                          </div>
                        </div>
                        <p className="text-gray-700 line-clamp-2">{result.content}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Badge className={priorityColors[result.priority]}>
                            {result.priority === 'high' ? '高' : result.priority === 'medium' ? '中' : '低'}
                          </Badge>
                          {result.hasAttachment && (
                            <Badge variant="outline">
                              <FileText className="h-3 w-3 mr-1" />
                              附件
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          相关性: {(result.relevance * 100).toFixed(0)}%
                        </div>
                        <Badge variant="secondary">{result.folder}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Search History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <History className="h-4 w-4 text-purple-600" />
                搜索历史
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {searchHistory.slice(0, 5).map((query, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(query)}
                  className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {query}
                </button>
              ))}
              {searchHistory.length > 5 && (
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  查看全部历史
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Saved Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Bookmark className="h-4 w-4 text-orange-600" />
                收藏搜索
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {savedSearches.map((saved) => (
                <div key={saved.id} className="p-2 border rounded-lg">
                  <button
                    onClick={() => setSearchQuery(saved.query)}
                    className="w-full text-left"
                  >
                    <div className="font-medium text-sm">{saved.name}</div>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>使用 {saved.frequency} 次</span>
                      <span>{saved.lastUsed}</span>
                    </div>
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Filter className="h-4 w-4 text-blue-600" />
                快速筛选
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                未读邮件
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                已标星
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                有附件
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                今日邮件
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
