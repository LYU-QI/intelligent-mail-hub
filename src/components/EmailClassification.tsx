
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Settings, User, Mail, FileText, Paperclip, HardDrive } from 'lucide-react';

const EmailClassification = () => {
  const [rules, setRules] = useState([
    { id: 1, name: '项目相关', conditions: '主题包含: 项目', enabled: true, count: 156 },
    { id: 2, name: '会议资料', conditions: '内容包含: 会议纪要', enabled: true, count: 89 },
    { id: 3, name: '重要邮件', conditions: '发件人: 领导', enabled: true, count: 45 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">邮件智能分类</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          添加分类规则
        </Button>
      </div>

      {/* Classification Rules */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              分类规则管理
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Switch checked={rule.enabled} />
                  <div>
                    <h3 className="font-semibold">{rule.name}</h3>
                    <p className="text-sm text-gray-600">{rule.conditions}</p>
                  </div>
                  <Badge variant="secondary">{rule.count} 封邮件</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">编辑</Button>
                  <Button variant="outline" size="sm">删除</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Classification Setup */}
        <Card>
          <CardHeader>
            <CardTitle>快速分类设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sender">发件人类别</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择发件人类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dept">本部门人员</SelectItem>
                    <SelectItem value="leader">本部门领导</SelectItem>
                    <SelectItem value="other">其他部门</SelectItem>
                    <SelectItem value="external">外部机构</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">主题关键词</Label>
                <Input placeholder="例如：项目进度、会议纪要" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">内容关键词</Label>
                <Input placeholder="例如：紧急、审批、反馈" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="folder">目标文件夹</Label>
                <Input placeholder="例如：项目相关、会议资料" />
              </div>
            </div>

            <Button className="w-full">创建分类规则</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { EmailClassification };
