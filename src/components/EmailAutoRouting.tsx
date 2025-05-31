
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Plus, Trash2, Settings, Mail, Archive, Forward, Flag, Eye, Bell } from 'lucide-react';

type ActionType = 'priority' | 'filter' | 'read' | 'forward' | 'classify' | 'archive' | 'meeting' | 'remind';

const EmailAutoRouting = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const [rules, setRules] = useState([
    {
      id: 1,
      name: '高优先级邮件',
      conditions: ['发件人: 领导', '主题包含: 紧急'],
      actions: ['priority' as ActionType],
      enabled: true
    },
    {
      id: 2,
      name: '会议邮件',
      conditions: ['主题包含: 会议', '内容包含: 会议纪要'],
      actions: ['classify' as ActionType, 'meeting' as ActionType],
      enabled: true
    }
  ]);

  const actionLabels: Record<ActionType, string> = {
    priority: '标记优先级',
    filter: '自动过滤',
    read: '自动已读',
    forward: '自动转发',
    classify: '自动分类',
    archive: '自动归档',
    meeting: '会议登记',
    remind: '弹窗提醒'
  };

  const actionIcons: Record<ActionType, React.ReactNode> = {
    priority: <Flag className="h-4 w-4" />,
    filter: <Filter className="h-4 w-4" />,
    read: <Eye className="h-4 w-4" />,
    forward: <Forward className="h-4 w-4" />,
    classify: <Archive className="h-4 w-4" />,
    archive: <Archive className="h-4 w-4" />,
    meeting: <Settings className="h-4 w-4" />,
    remind: <Bell className="h-4 w-4" />
  };

  const getActionColor = (action: ActionType): string => {
    const colors: Record<ActionType, string> = {
      priority: 'bg-red-100 text-red-700',
      filter: 'bg-gray-100 text-gray-700',
      read: 'bg-blue-100 text-blue-700',
      forward: 'bg-green-100 text-green-700',
      classify: 'bg-purple-100 text-purple-700',
      archive: 'bg-orange-100 text-orange-700',
      meeting: 'bg-indigo-100 text-indigo-700',
      remind: 'bg-yellow-100 text-yellow-700'
    };
    return colors[action];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">邮件自动分流</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          添加规则
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rules">分流规则</TabsTrigger>
          <TabsTrigger value="actions">处理动作</TabsTrigger>
          <TabsTrigger value="logs">处理日志</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <div className="grid gap-4">
            {rules.map((rule) => (
              <Card key={rule.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{rule.name}</h3>
                      <Switch checked={rule.enabled} />
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? '启用' : '禁用'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">触发条件：</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rule.conditions.map((condition, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-600">执行动作：</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rule.actions.map((action, index) => (
                            <Badge key={index} className={`text-xs ${getActionColor(action)}`}>
                              {actionIcons[action]}
                              <span className="ml-1">{actionLabels[action]}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">编辑</Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(actionLabels).map(([action, label]) => (
              <Card key={action} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  {actionIcons[action as ActionType]}
                  <h3 className="font-semibold">{label}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {action === 'priority' && '将邮件标记为高优先级，优先显示'}
                  {action === 'filter' && '将邮件移动到垃圾箱，可恢复'}
                  {action === 'read' && '自动标记邮件为已读状态'}
                  {action === 'forward' && '自动转发邮件给指定收件人'}
                  {action === 'classify' && '根据规则自动分类到文件夹'}
                  {action === 'archive' && '自动归档到指定文件夹'}
                  {action === 'meeting' && '提取会议信息并登记日程'}
                  {action === 'remind' && '桌面弹窗提醒重要邮件'}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  配置参数
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>处理日志</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '2024-03-16 14:30', email: '项目进度汇报', action: '自动分类', result: '成功' },
                  { time: '2024-03-16 13:45', email: '紧急：合同审批', action: '标记优先级', result: '成功' },
                  { time: '2024-03-16 12:20', email: '周例会纪要', action: '会议登记', result: '成功' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{log.email}</div>
                      <div className="text-sm text-gray-500">{log.time}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{log.action}</Badge>
                      <Badge variant={log.result === '成功' ? 'default' : 'destructive'}>
                        {log.result}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { EmailAutoRouting };
