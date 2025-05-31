
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Flag, Trash2, Eye, Forward, Archive, Calendar, Bell, Filter, AlertTriangle, CheckCircle } from 'lucide-react';

interface RoutingAction {
  id: string;
  name: string;
  type: 'priority' | 'filter' | 'read' | 'forward' | 'archive' | 'calendar' | 'reminder';
  conditions: string[];
  target?: string;
  enabled: boolean;
  icon: React.ReactNode;
  color: string;
}

export const EmailAutoRouting = () => {
  const [actions, setActions] = useState<RoutingAction[]>([
    {
      id: '1',
      name: '高优先级标记',
      type: 'priority',
      conditions: ['发件人是领导', '主题包含"紧急"'],
      enabled: true,
      icon: <Flag className="h-4 w-4" />,
      color: 'red'
    },
    {
      id: '2',
      name: '垃圾邮件过滤',
      type: 'filter',
      conditions: ['发件人是黑名单', '内容包含垃圾词汇'],
      enabled: true,
      icon: <Trash2 className="h-4 w-4" />,
      color: 'gray'
    },
    {
      id: '3',
      name: '会议邮件登记',
      type: 'calendar',
      conditions: ['主题包含"会议"', '内容包含时间'],
      enabled: true,
      icon: <Calendar className="h-4 w-4" />,
      color: 'blue'
    },
    {
      id: '4',
      name: '自动转发给助理',
      type: 'forward',
      conditions: ['发件人是外部客户'],
      target: 'assistant@company.com',
      enabled: false,
      icon: <Forward className="h-4 w-4" />,
      color: 'green'
    }
  ]);

  const [newAction, setNewAction] = useState({
    name: '',
    type: 'priority' as const,
    conditions: [''],
    target: '',
    enabled: true
  });

  const actionTypes = [
    { value: 'priority', label: '优先级标记', icon: <Flag className="h-4 w-4" />, color: 'red' },
    { value: 'filter', label: '自动过滤', icon: <Trash2 className="h-4 w-4" />, color: 'gray' },
    { value: 'read', label: '自动已读', icon: <Eye className="h-4 w-4" />, color: 'blue' },
    { value: 'forward', label: '自动转发', icon: <Forward className="h-4 w-4" />, color: 'green' },
    { value: 'archive', label: '自动归档', icon: <Archive className="h-4 w-4" />, color: 'purple' },
    { value: 'calendar', label: '会议登记', icon: <Calendar className="h-4 w-4" />, color: 'orange' },
    { value: 'reminder', label: '弹窗提醒', icon: <Bell className="h-4 w-4" />, color: 'yellow' }
  ];

  const toggleAction = (id: string) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, enabled: !action.enabled } : action
    ));
  };

  const deleteAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <Flag className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">15</div>
            <div className="text-sm text-red-600">高优先级邮件</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-4 text-center">
            <Trash2 className="h-8 w-8 text-gray-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-700">8</div>
            <div className="text-sm text-gray-600">已过滤邮件</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Forward className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">12</div>
            <div className="text-sm text-green-600">自动转发</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">5</div>
            <div className="text-sm text-blue-600">会议登记</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Action */}
        <Card className="border-dashed border-2 border-green-200 hover:border-green-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-green-600" />
              添加分流动作
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>动作名称</Label>
              <Input
                placeholder="输入动作名称"
                value={newAction.name}
                onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
              />
            </div>

            <div>
              <Label>动作类型</Label>
              <Select onValueChange={(value: any) => setNewAction({ ...newAction, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择动作类型" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {type.icon}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>触发条件</Label>
              <Input
                placeholder="用逗号分隔多个条件"
                onChange={(e) => setNewAction({
                  ...newAction,
                  conditions: e.target.value.split(',').map(c => c.trim()).filter(c => c)
                })}
              />
            </div>

            {(newAction.type === 'forward' || newAction.type === 'archive') && (
              <div>
                <Label>目标地址/文件夹</Label>
                <Input
                  placeholder="输入邮箱地址或文件夹名称"
                  value={newAction.target}
                  onChange={(e) => setNewAction({ ...newAction, target: e.target.value })}
                />
              </div>
            )}

            <Button 
              onClick={() => {
                if (newAction.name && newAction.conditions.length > 0) {
                  const actionType = actionTypes.find(t => t.value === newAction.type)!;
                  setActions([...actions, {
                    id: Date.now().toString(),
                    ...newAction,
                    icon: actionType.icon,
                    color: actionType.color
                  }]);
                  setNewAction({ name: '', type: 'priority', conditions: [''], target: '', enabled: true });
                }
              }}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              添加动作
            </Button>
          </CardContent>
        </Card>

        {/* Department Special Actions */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-purple-600" />
              部总室专用功能
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">每日邮件汇总</span>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-gray-600">自动生成日报，包含需参会、反馈信息的邮件链接</p>
              </div>

              <div className="p-3 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">到期提醒标红</span>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-gray-600">即将到期的回复邮件在日报中优先展示并标红</p>
              </div>

              <div className="p-3 bg-white rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">日程关联登记</span>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-gray-600">需要参会的邮件可直接关联日程信息模块</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                <strong>智能识别：</strong>已阅读邮件颜色标识，未处理邮件第二天继续提醒
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spam Filter Settings */}
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-orange-600" />
              垃圾邮件设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">贝叶斯分类器</span>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">黑名单过滤</span>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">内容关键词检测</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">垃圾邮件处理方式</Label>
              <Select defaultValue="trash">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trash">移至垃圾箱</SelectItem>
                  <SelectItem value="delete">直接删除</SelectItem>
                  <SelectItem value="quarantine">隔离审查</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              查看垃圾箱 (8)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            当前分流动作 ({actions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {actions.map((action) => (
              <div key={action.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={action.enabled}
                      onCheckedChange={() => toggleAction(action.id)}
                    />
                    <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.name}</h3>
                      <p className="text-sm text-gray-500">
                        {actionTypes.find(t => t.value === action.type)?.label}
                      </p>
                    </div>
                    <Badge variant={action.enabled ? "default" : "secondary"}>
                      {action.enabled ? '启用' : '禁用'}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAction(action.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="ml-12 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">触发条件：</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {action.conditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {action.target && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">目标：</span>
                      <Badge variant="secondary" className="ml-2">{action.target}</Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
