import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy, 
  Settings, 
  Activity, 
  Key, 
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

export default function ApiManagement() {
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({});
  
  const apiKeys = [
    { 
      id: 1, 
      name: 'Primary Gemini Key', 
      key: 'AIzaSyBx7B8mKpQwXyZ123...', 
      fullKey: 'AIzaSyBx7B8mKpQwXyZ123abcdefghijklmnopqrstuvwxyz',
      status: 'active', 
      usage: 75, 
      limit: 10000,
      used: 7500,
      lastUsed: '2 hours ago',
      createdAt: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Backup Gemini Key', 
      key: 'AIzaSyBx7B8mKpQwAbc456...', 
      fullKey: 'AIzaSyBx7B8mKpQwAbc456defghijklmnopqrstuvwxyzabc',
      status: 'active', 
      usage: 32, 
      limit: 5000,
      used: 1600,
      lastUsed: '1 day ago',
      createdAt: '2024-02-01'
    },
    { 
      id: 3, 
      name: 'TTS Model Key', 
      key: 'AIzaSyBx7B8mKpQwDef789...', 
      fullKey: 'AIzaSyBx7B8mKpQwDef789ghijklmnopqrstuvwxyzdefghi',
      status: 'inactive', 
      usage: 0, 
      limit: 3000,
      used: 0,
      lastUsed: 'Never',
      createdAt: '2024-03-10'
    }
  ];

  const modelConfig = [
    { name: 'Gemini Pro', category: 'text', enabled: true, description: 'Advanced text generation' },
    { name: 'Gemini Flash', category: 'text', enabled: true, description: 'Fast text generation' },
    { name: 'Gemini Ultra', category: 'text', enabled: false, description: 'Premium text generation' },
    { name: 'Gemini TTS Standard', category: 'tts', enabled: true, description: 'Text-to-speech conversion' },
    { name: 'Gemini TTS Premium', category: 'tts', enabled: false, description: 'High-quality voice synthesis' },
    { name: 'Gemini TTS Neural', category: 'tts', enabled: false, description: 'Neural voice generation' }
  ];

  const toggleKeyVisibility = (id: number) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusIcon = (status: string) => {
    return status === 'active' ? (
      <CheckCircle className="w-4 h-4 text-success" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-warning" />
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">API Management</h1>
          <p className="text-muted-foreground">Manage API keys, models, and usage limits</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add API Key
        </Button>
      </div>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-medium">API Calls Today</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">1,247</p>
          <p className="text-sm text-muted-foreground">+15% from yesterday</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-success" />
              <span className="font-medium">Success Rate</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">99.2%</p>
          <p className="text-sm text-muted-foreground">Excellent performance</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-center font-bold text-success">$</span>
              <span className="font-medium">Monthly Cost</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">$24.50</p>
          <p className="text-sm text-muted-foreground">Within budget</p>
        </Card>
      </div>

      {/* API Keys Management */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            {apiKeys.map(apiKey => (
              <div key={apiKey.id} className="border border-border rounded-lg p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{apiKey.name}</h3>
                      {getStatusIcon(apiKey.status)}
                      <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                        {apiKey.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                        {showKeys[apiKey.id] ? apiKey.fullKey : apiKey.key}
                      </code>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(apiKey.fullKey)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Usage</span>
                        <span className="font-medium">{apiKey.used.toLocaleString()} / {apiKey.limit.toLocaleString()}</span>
                      </div>
                      <Progress value={apiKey.usage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Last used: {apiKey.lastUsed} • Created: {apiKey.createdAt}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Model Configuration */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Model Configuration</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Text Generation Models */}
            <div>
              <h3 className="font-medium mb-4 text-foreground">Text Generation Models</h3>
              <div className="space-y-3">
                {modelConfig.filter(model => model.category === 'text').map(model => (
                  <div key={model.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Switch checked={model.enabled} />
                        <div>
                          <p className="font-medium text-sm">{model.name}</p>
                          <p className="text-xs text-muted-foreground">{model.description}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant={model.enabled ? 'default' : 'secondary'} className="text-xs">
                      {model.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* TTS Models */}
            <div>
              <h3 className="font-medium mb-4 text-foreground">Text-to-Speech Models</h3>
              <div className="space-y-3">
                {modelConfig.filter(model => model.category === 'tts').map(model => (
                  <div key={model.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Switch checked={model.enabled} />
                        <div>
                          <p className="font-medium text-sm">{model.name}</p>
                          <p className="text-xs text-muted-foreground">{model.description}</p>
                        </div>
                      </div>
                    </div>
                    <Badge variant={model.enabled ? 'default' : 'secondary'} className="text-xs">
                      {model.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New API Key Form */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle>Add New API Key</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">Key Name</Label>
              <Input 
                id="keyName" 
                placeholder="e.g., Production Gemini Key" 
                className="focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyValue">API Key</Label>
              <Input 
                id="keyValue" 
                type="password" 
                placeholder="Enter your API key" 
                className="focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button>Add API Key</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}