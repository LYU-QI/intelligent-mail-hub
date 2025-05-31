
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Bell, Clock, Volume2, Monitor, Smartphone, Mail, AlertTriangle, Calendar, Settings, CheckCircle, Star } from 'lucide-react';

interface NotificationRule {
  id: string;
  name: string;
  type: 'arrival' | 'reminder' | 'deadline' | 'summary';
  conditions: string[];
  methods: ('desktop' | 'sound' | 'email')[];
  interval?: number;
  enabled: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const EmailNotifications = () => {
  const [notificationRules, setNotificationRules] = useState<NotificationRule[]>([
    {
      id: '1',
      name: '重要邮件即时提醒',
      type: 'arrival',
      conditions: ['发件人是领导', '标记为高优先级'],
      methods: ['desktop', 'sound'],
      enabled: true,
      priority: 'high'
    },
    {
      id: '2',
      name: '未处理邮件定时提醒',
      type: 'reminder',
      conditions: ['未读邮件', '高优先级'],
      methods: ['desktop'],
      interval: 30,
      enabled: true,
      priority: 'medium'
    },
    {
      id: '3',
      name: '每日邮件汇总',
      type: 'summary',
      conditions: ['当日所有邮件'],
      methods: ['desktop', 'email'],
      interval: 1440, // 24 hours
      enabled: true,
      priority: 'low'
    }
  ]);

  const [globalSettings, setGlobalSettings] = useState({
    enableNotifications: true,
    desktopNotifications: true,
    soundNotifications: true,
    soundVolume: 50,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    },
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  });

  const [dailyReport, setDailyReport] = useState({
    enabled: true,
    time: '18:00',
    includeUnread: true,
    includeToday: true,
    includeMeetings: true,
    includeDeadlines: true,
    colorCoding: true,
    directLinks: true
  });

  const toggleRule = (id: string) => {
    setNotificationRules(rules => 
      rules.map(rule => 
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const deleteRule = (id: string) => {
    setNotificationRules(rules => rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Global Settings */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-blue-600" />
            全局通知设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="font-medium">启用通知</span>
                </div>
                <Switch
                  checked={globalSettings.enableNotifications}
                  onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, enableNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span className="font-medium">桌面通知</span>
                </div>
                <Switch
                  checked={globalSettings.desktopNotifications}
                  onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, desktopNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <span className="font-medium">声音提醒</span>
                </div>
                <Switch
                  checked={globalSettings.soundNotifications}
                  onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, soundNotifications: checked }))}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  提醒音量: {globalSettings.soundVolume}%
                </Label>
                <Slider
                  value={[globalSettings.soundVolume]}
                  onValueChange={([value]) => setGlobalSettings(prev => ({ ...prev, soundVolume: value }))}
                  max={100}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">免打扰时间</span>
                </div>
                <Switch
                  checked={globalSettings.quietHours.enabled}
                  onCheckedChange={(checked) => setGlobalSettings(prev => ({ 
                    ...prev, 
                    quietHours: { ...prev.quietHours, enabled: checked }
                  }))}
                />
              </div>

              {globalSettings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">开始时间</Label>
                    <Input
                      type="time"
                      value={globalSettings.quietHours.start}
                      onChange={(e) => setGlobalSettings(prev => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, start: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">结束时间</Label>
                    <Input
                      type="time"
                      value={globalSettings.quietHours.end}
                      onChange={(e) => setGlobalSettings(prev => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, end: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm mb-2 block">工作日设置</Label>
                <div className="flex flex-wrap gap-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <Badge
                      key={day}
                      variant={globalSettings.workingDays.includes(day) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const isSelected = globalSettings.workingDays.includes(day);
                        setGlobalSettings(prev => ({
                          ...prev,
                          workingDays: isSelected 
                            ? prev.workingDays.filter(d => d !== day)
                            : [...prev.workingDays, day]
                        }));
                      }}
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Report Settings */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            每日邮件汇总设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">启用每日汇总</span>
                <Switch
                  checked={dailyReport.enabled}
                  onCheckedChange={(checked) => setDailyReport(prev => ({ ...prev, enabled: checked }))}
                />
              </div>

              <div>
                <Label>汇总时间</Label>
                <Input
                  type="time"
                  value={dailyReport.time}
                  onChange={(e) => setDailyReport(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">包含未读邮件</span>
                  <Switch
                    checked={dailyReport.includeUnread}
                    onCheckedChange={(checked) => setDailyReport(prev => ({ ...prev, includeUnread: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">包含当日邮件</span>
                  <Switch
                    checked={dailyReport.includeToday}
                    onCheckedChange={(checked) => setDailyReport(prev => ({ ...prev, includeToday: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">包含会议信息</span>
                  <Switch
                    checked={dailyReport.includeMeetings}
                    onCheckedChange={(checked) => setDailyReport(prev => ({ ...prev, includeMeetings: checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">包含截止日期</span>
                  <Switch
                    checked={dailyReport.includeDeadlines}
                    onCheckedChange={(checked) => setDailyReport(prev => ({ ...prev, includeDeadlines: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">颜色标识</span>
                  <Switch
                    checked={dailyReport.colorCoding}
                    onCheckedChange={(checked) => setDailyReport(prev => ({ ...prev, colorCoding: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">直接回复链接</span>
                  <Switch
                    checked={dailyReport.directLinks}
                    onCheckedChange={(checked) => setDailyReport(prev => ({ ...prev, directLinks: checked }))}
                  />
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border">
                <h4 className="font-medium text-sm mb-2">部总室特色功能</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 需要参会的邮件可直接关联日程</li>
                  <li>• 未处理邮件第二天继续提醒</li>
                  <li>• 即将到期邮件标红显示</li>
                  <li>• 已阅读邮件颜色标识</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-600" />
            通知规则管理 ({notificationRules.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationRules.map((rule) => (
              <div key={rule.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <div className="flex items-center gap-2">
                      {rule.type === 'arrival' && <Mail className="h-4 w-4 text-blue-500" />}
                      {rule.type === 'reminder' && <Clock className="h-4 w-4 text-orange-500" />}
                      {rule.type === 'deadline' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {rule.type === 'summary' && <Calendar className="h-4 w-4 text-purple-500" />}
                      <h3 className="font-semibold">{rule.name}</h3>
                    </div>
                    <Badge variant={rule.enabled ? "default" : "secondary"}>
                      {rule.enabled ? '启用' : '禁用'}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={
                        rule.priority === 'high' ? 'border-red-200 text-red-700' :
                        rule.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                        'border-green-200 text-green-700'
                      }
                    >
                      {rule.priority === 'high' ? '高' : rule.priority === 'medium' ? '中' : '低'}优先级
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRule(rule.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    删除
                  </Button>
                </div>

                <div className="ml-8 space-y-2">
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
                    <span className="text-sm font-medium text-gray-600">通知方式：</span>
                    <div className="flex gap-2 mt-1">
                      {rule.methods.map((method) => (
                        <Badge key={method} variant="secondary" className="text-xs">
                          {method === 'desktop' && <><Monitor className="h-3 w-3 mr-1" />桌面</>}
                          {method === 'sound' && <><Volume2 className="h-3 w-3 mr-1" />声音</>}
                          {method === 'email' && <><Mail className="h-3 w-3 mr-1" />邮件</>}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {rule.interval && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">提醒间隔：</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {rule.interval < 60 ? `${rule.interval}分钟` : 
                         rule.interval < 1440 ? `${Math.floor(rule.interval / 60)}小时` : 
                         `${Math.floor(rule.interval / 1440)}天`}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
            <Button variant="outline" className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              添加新的通知规则
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            通知预览与测试
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">测试通知</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  测试桌面通知
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Volume2 className="h-4 w-4 mr-2" />
                  测试声音提醒
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  测试邮件通知
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">近期通知记录</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <div className="text-xs p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>高优先级邮件提醒</span>
                    <span className="text-gray-500">2分钟前</span>
                  </div>
                </div>
                <div className="text-xs p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-blue-500" />
                    <span>会议提醒通知</span>
                    <span className="text-gray-500">15分钟前</span>
                  </div>
                </div>
                <div className="text-xs p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-orange-500" />
                    <span>未处理邮件提醒</span>
                    <span className="text-gray-500">1小时前</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailNotifications;
