import { useState, useEffect } from 'react';
import { Plus, Filter, Search, Play, Pause, X, MoreHorizontal, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/lib/store';
import { ContentGeneration } from '@/types';

interface VideoGenerationProps {}

const VideoGeneration: React.FC<VideoGenerationProps> = () => {
  const { contentGenerations, addContentGeneration, updateContentGeneration, removeContentGeneration } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedGenerations, setSelectedGenerations] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewGeneration, setPreviewGeneration] = useState<ContentGeneration | null>(null);

  // Mock real-time updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      contentGenerations.forEach(gen => {
        if (gen.status === 'generating' && gen.progress < 100) {
          updateContentGeneration(gen.id, {
            progress: Math.min(100, gen.progress + Math.random() * 5)
          });
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [contentGenerations, updateContentGeneration]);

  const filteredGenerations = contentGenerations
    .filter(gen => {
      const matchesSearch = gen.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gen.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || gen.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof ContentGeneration];
      const bValue = b[sortField as keyof ContentGeneration];
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : 1;
      }
      return aValue > bValue ? -1 : 1;
    });

  const getStatusBadge = (status: ContentGeneration['status']) => {
    const variants = {
      queued: 'secondary',
      generating: 'default',
      processing: 'outline',
      completed: 'default',
      failed: 'destructive',
      paused: 'secondary'
    } as const;

    const colors = {
      queued: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      generating: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      paused: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };

    return (
      <Badge className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleBulkAction = (action: string) => {
    selectedGenerations.forEach(id => {
      switch (action) {
        case 'pause':
          updateContentGeneration(id, { status: 'paused' });
          break;
        case 'resume':
          updateContentGeneration(id, { status: 'generating' });
          break;
        case 'cancel':
          removeContentGeneration(id);
          break;
      }
    });
    setSelectedGenerations([]);
  };

  const handleCreateGeneration = (formData: any) => {
    const newGeneration: ContentGeneration = {
      id: `gen_${Date.now()}`,
      topic: formData.topic,
      duration: parseInt(formData.duration),
      contentType: formData.contentType,
      targetAudience: formData.targetAudience,
      status: 'queued',
      progress: 0,
      channelId: formData.channelId,
      platform: formData.platform,
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    };
    
    addContentGeneration(newGeneration);
    setShowCreateModal(false);
  };

  const openPreview = (generation: ContentGeneration) => {
    setPreviewGeneration(generation);
    setShowPreviewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Generation</h1>
          <p className="text-muted-foreground">
            Manage your AI video generation queue and monitor progress
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Generation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Generations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentGenerations.filter(g => g.status === 'generating').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentGenerations.filter(g => g.status === 'queued').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentGenerations.filter(g => g.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {contentGenerations.filter(g => g.status === 'failed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search generations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="generating">Generating</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedGenerations.length > 0 && (
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedGenerations.length} selected
              </span>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('pause')}>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('resume')}>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleBulkAction('cancel')}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generation Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Generation Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedGenerations.length === filteredGenerations.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedGenerations(filteredGenerations.map(g => g.id));
                        } else {
                          setSelectedGenerations([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGenerations.map((generation) => (
                  <TableRow key={generation.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedGenerations.includes(generation.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedGenerations([...selectedGenerations, generation.id]);
                          } else {
                            setSelectedGenerations(selectedGenerations.filter(id => id !== generation.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{generation.topic}</div>
                      <div className="text-sm text-muted-foreground">{generation.targetAudience}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(generation.status)}</TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress value={generation.progress} className="w-16" />
                        <span className="text-xs text-muted-foreground">{generation.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{generation.platform}</Badge>
                    </TableCell>
                    <TableCell>{Math.floor(generation.duration / 60)}:{(generation.duration % 60).toString().padStart(2, '0')}</TableCell>
                    <TableCell>{new Date(generation.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {generation.status === 'completed' && (
                            <>
                              <DropdownMenuItem onClick={() => openPreview(generation)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                            </>
                          )}
                          {generation.status === 'generating' && (
                            <DropdownMenuItem onClick={() => updateContentGeneration(generation.id, { status: 'paused' })}>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </DropdownMenuItem>
                          )}
                          {generation.status === 'paused' && (
                            <DropdownMenuItem onClick={() => updateContentGeneration(generation.id, { status: 'generating' })}>
                              <Play className="h-4 w-4 mr-2" />
                              Resume
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => removeContentGeneration(generation.id)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4">
            {filteredGenerations.map((generation) => (
              <Card key={generation.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{generation.topic}</h3>
                      <p className="text-xs text-muted-foreground">{generation.targetAudience}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {generation.status === 'completed' && (
                          <>
                            <DropdownMenuItem onClick={() => openPreview(generation)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => removeContentGeneration(generation.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    {getStatusBadge(generation.status)}
                    <Badge variant="outline">{generation.platform}</Badge>
                  </div>
                  
                  <div className="mt-2">
                    <Progress value={generation.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{generation.progress}%</span>
                      <span>{Math.floor(generation.duration / 60)}:{(generation.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Generation Modal */}
      <CreateGenerationModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateGeneration}
      />

      {/* Preview Modal */}
      <PreviewModal
        open={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        generation={previewGeneration}
      />
    </div>
  );
};

// Create Generation Modal Component
const CreateGenerationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    topic: '',
    duration: '300',
    contentType: 'educational',
    targetAudience: '',
    channelId: 'ch1',
    platform: 'youtube'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      topic: '',
      duration: '300',
      contentType: 'educational',
      targetAudience: '',
      channelId: 'ch1',
      platform: 'youtube'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Video Generation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Topic</label>
            <Input
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="Enter video topic..."
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Duration (seconds)</label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                  <SelectItem value="600">10 minutes</SelectItem>
                  <SelectItem value="900">15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Content Type</label>
              <Select value={formData.contentType} onValueChange={(value) => setFormData({ ...formData, contentType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Target Audience</label>
            <Input
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="e.g., content creators, entrepreneurs, students"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Platform</label>
              <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Channel</label>
              <Select value={formData.channelId} onValueChange={(value) => setFormData({ ...formData, channelId: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ch1">Tech Tips Channel</SelectItem>
                  <SelectItem value="ch2">Creative Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Start Generation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Preview Modal Component
const PreviewModal: React.FC<{
  open: boolean;
  onClose: () => void;
  generation: ContentGeneration | null;
}> = ({ open, onClose, generation }) => {
  if (!generation || !generation.generatedContent) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{generation.generatedContent.title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Video Preview</p>
                <p className="text-sm text-muted-foreground">Duration: {Math.floor(generation.duration / 60)}:{(generation.duration % 60).toString().padStart(2, '0')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {generation.generatedContent.thumbnails.map((thumb, index) => (
                <div key={index} className="aspect-video bg-muted rounded border cursor-pointer hover:border-primary">
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    Thumbnail {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Title</h3>
              <p className="text-sm">{generation.generatedContent.title}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{generation.generatedContent.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {generation.generatedContent.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metadata" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Video Specifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span>{generation.generatedContent.metadata.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{generation.generatedContent.metadata.duration}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>File Size:</span>
                    <span>{(generation.generatedContent.metadata.fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Generation Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{new Date(generation.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span className="capitalize">{generation.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Content Type:</span>
                    <span className="capitalize">{generation.contentType}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoGeneration;