
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, User, Users, Building, Mail, FileText, Paperclip, Database } from 'lucide-react';

interface ClassificationRule {
  id: string;
  name: string;
  conditions: {
    senderType?: string;
    recipient?: string;
    recipientCount?: number;
    subjectKeywords?: string[];
    contentKeywords?: string[];
    attachmentCount?: number;
    emailSize?: number;
  };
  folder: string;
  enabled: boolean;
}

export const EmailClassification = () => {
  const [rules, setRules] = useState<ClassificationRule[]>([
    {
      id: '1',
      name: '部门领导重要邮件',
      conditions: {
        senderType: '本部门领导',
        subjectKeywords: ['紧急', '重要']
      },
      folder: '重要邮件',
      enabled: true
    },
    {
      id: '2', 
      name: '会议相关邮件',
      conditions: {
        subjectKeywords: ['会议', '会议纪要'],
        contentKeywords: ['会议通知', '参会']
      },
      folder: '会议资料',
      enabled: true
    }
  ]);

  const [newRule, setNewRule] = useState<Partial<ClassificationRule>>({
    name: '',
    conditions: {},
    folder: '',
    enabled: true
  });

  const senderTypes = [
    '本部门人员',
    '本部门领导', 
    '本机构其他部门人员',
    '本机构其他部门领导',
    '本机构领导及其秘书',
    '其他机构领导及其秘书',
    '其他机构部门领导',
    '其他机构人员',
    '外来邮件',
    '特定邮箱地址'
  ];

  const addRule = () => {
    if (newRule.name && newRule.folder) {
      const rule: ClassificationRule = {
        id: Date.now().toString(),
        name: newRule.name,
        conditions: newRule.conditions || {},
        folder: newRule.folder,
        enabled: newRule.enabled || true
      };
      setRules([...rules, rule]);
      setNewRule({ name: '', conditions: {}, folder: '', enabled: true });
    }
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Rule */}
        <Card className="border-dashed border-2 border-blue-200 hover:border-blue-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              添加分类规则
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ruleName">规则名称</Label>
              <Input
                id="ruleName"
                placeholder="输入规则名称"
                value={newRule.name || ''}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="senderType">发件人类别</Label>
              <Select onValueChange={(value) => setNewRule({
                ...newRule,
                conditions: { ...newRule.conditions, senderType: value }
              })}>
                <SelectTrigger>
                  <SelectValue placeholder="选择发件人类别" />
                </SelectTrigger>
                <SelectContent>
                  {senderTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subjectKeywords">主题关键词</Label>
              <Input
                id="subjectKeywords"
                placeholder="用逗号分隔多个关键词"
                onChange={(e) => setNewRule({
                  ...newRule,
                  conditions: { 
                    ...newRule.conditions, 
                    subjectKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  }
                })}
              />
            </div>

            <div>
              <Label htmlFor="contentKeywords">内容关键词</Label>
              <Input
                id="contentKeywords"
                placeholder="用逗号分隔多个关键词"
                onChange={(e) => setNewRule({
                  ...newRule,
                  conditions: { 
                    ...newRule.conditions, 
                    contentKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  }
                })}
              />
            </div>

            <div>
              <Label htmlFor="folder">目标文件夹</Label>
              <Input
                id="folder"
                placeholder="输入文件夹名称"
                value={newRule.folder || ''}
                onChange={(e) => setNewRule({ ...newRule, folder: e.target.value })}
              />
            </div>

            <Button onClick={addRule} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              添加规则
            </Button>
          </CardContent>
        </Card>

        {/* Special Categories */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-600" />
              部总室特殊分类
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">抄送阅知</div>
                    <div className="text-sm text-gray-500">仅需阅读了解的邮件</div>
                  </div>
                </div>
                <Badge variant="secondary">自动识别</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">主送参会</div>
                    <div className="text-sm text-gray-500">需要参加会议的邮件</div>
                  </div>
                </div>
                <Badge variant="secondary">自动登记</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="font-medium">限时反馈</div>
                    <div className="text-sm text-gray-500">需要限时回复的材料</div>
                  </div>
                </div>
                <Badge variant="destructive">优先处理</Badge>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-sm text-yellow-800">
                <strong>智能识别：</strong>系统将自动分析邮件内容，识别关键词如"请阅知"、"会议通知"、"请于X日前反馈"等，进行自动分类。
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            当前分类规则 ({rules.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <h3 className="font-semibold">{rule.name}</h3>
                    <Badge variant={rule.enabled ? "default" : "secondary"}>
                      {rule.enabled ? '启用' : '禁用'}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRule(rule.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">条件：</span>
                    <div className="mt-1 space-y-1">
                      {rule.conditions.senderType && (
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span>发件人：{rule.conditions.senderType}</span>
                        </div>
                      )}
                      {rule.conditions.subjectKeywords && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span>主题：{rule.conditions.subjectKeywords.join(', ')}</span>
                        </div>
                      )}
                      {rule.conditions.contentKeywords && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3" />
                          <span>内容：{rule.conditions.contentKeywords.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">操作：</span>
                    <div className="mt-1">
                      <Badge variant="outline">归档到 "{rule.folder}"</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {rules.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>暂无分类规则，请添加新规则开始使用</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
