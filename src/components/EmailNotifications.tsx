
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Settings, Clock, Volume2, Monitor, Smartphone } from 'lucide-react';

const EmailNotifications = () => {
  const [notifications] = useState([
    { id: 1, type: '邮件到达', condition: '高优先级邮件', method: '桌面通知', enabled: true },
    { id: 2, type: '处理提醒', condition: '超过2小时未处理', method: '声音提醒', enabled: true },
    { id: 3, type: '日报生成', condition: '每日18:00', method: '弹窗通知', enabled: false },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">提醒通知</h2>
        <Button>
          <Bell className="h-4 w-4 mr-2" />
          添加提醒
        </Button>
      </div>

      {/* Notification Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            通知规则管理
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <Switch checked={notification.enabled} />
                <div>
                  <h3 className="font-semibold">{notification.type}</h3>
                  <p className="text-sm text-gray-600">{notification.condition}</p>
                </div>
                <Badge variant="outline">{notification.method}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">编辑</Button>
                <Button variant="outline" size="sm">删除</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              提醒时间设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">高优先级邮件提醒间隔</label>
              <Select defaultValue="30min">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">立即</SelectItem>
                  <SelectItem value="15min">15分钟</SelectItem>
                  <SelectItem value="30min">30分钟</SelectItem>
                  <SelectItem value="1hour">1小时</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">普通邮件提醒间隔</label>
              <Select defaultValue="1day">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">1小时</SelectItem>
                  <SelectItem value="4hour">4小时</SelectItem>
                  <SelectItem value="1day">1天</SelectItem>
                  <SelectItem value="1week">1周</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">日报生成时间</label>
              <Select defaultValue="18:00">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="17:00">17:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                  <SelectItem value="19:00">19:00</SelectItem>
                  <SelectItem value="20:00">20:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              提醒方式设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>桌面通知</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span>声音提醒</span>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>移动端推送</span>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">提醒声音</label>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">默认</SelectItem>
                  <SelectItem value="chime">铃声</SelectItem>
                  <SelectItem value="bell">钟声</SelectItem>
                  <SelectItem value="none">无声</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle>今日邮件日报预览</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">需要参会 (3封)</h3>
              <div className="mt-2 space-y-1">
                <div className="text-sm">• 产品规划会议 - 明日14:00 <Button variant="link" size="sm">查看详情</Button></div>
                <div className="text-sm">• 季度总结会 - 周五10:00 <Button variant="link" size="sm">查看详情</Button></div>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-800">限时反馈 (2封)</h3>
              <div className="mt-2 space-y-1">
                <div className="text-sm text-red-600">• 合同审批意见 - 明日截止 <Button variant="link" size="sm">立即处理</Button></div>
                <div className="text-sm">• 预算申请确认 - 本周五截止 <Button variant="link" size="sm">查看详情</Button></div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800">抄送阅知 (8封)</h3>
              <div className="mt-2">
                <div className="text-sm text-gray-600">包含部门通知、会议纪要等信息，已自动标记为已读</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { EmailNotifications };
