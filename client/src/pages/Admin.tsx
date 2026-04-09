import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { usePageTitle } from "@/hooks/use-page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import RichTextEditor from "@/components/RichTextEditor";
import { 
  Lock, LogOut, Video, Music, Trophy, History, Image as ImageIcon, 
  Plus, Trash2, Edit, Save, X, Mail, LayoutDashboard, Eye, EyeOff, ChevronDown
} from "lucide-react";
import type { Video as VideoType, Project, Award, HistoryItem, Image, ContactMessage } from "@shared/schema";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        onLogin();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-neon-cyan/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-neon-cyan" />
          </div>
          <CardTitle className="font-serif text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter password to manage site content</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                data-testid="input-admin-password"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-admin-login">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function VideosManager() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: "", description: "", youtubeId: "", category: "performance", featured: false, order: 0
  });

  const { data: videos, isLoading } = useQuery<VideoType[]>({ queryKey: ["/api/videos"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/admin/videos", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({ title: "Video added" });
      setShowAdd(false);
      resetForm();
    },
    onError: () => toast({ title: "Failed to add video", variant: "destructive" })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) => 
      apiRequest("PUT", `/api/admin/videos/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({ title: "Video updated" });
      setEditingId(null);
    },
    onError: () => toast({ title: "Failed to update video", variant: "destructive" })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/videos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({ title: "Video deleted" });
    },
    onError: () => toast({ title: "Failed to delete video", variant: "destructive" })
  });

  const resetForm = () => {
    setFormData({ title: "", description: "", youtubeId: "", category: "performance", featured: false, order: 0 });
  };

  const startEdit = (video: VideoType) => {
    setEditingId(video.id);
    setFormData({
      title: video.title,
      description: video.description || "",
      youtubeId: video.youtubeId,
      category: video.category,
      featured: video.featured || false,
      order: video.order || 0
    });
  };

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Videos ({videos?.length || 0})</h3>
        <Button onClick={() => setShowAdd(true)} data-testid="button-add-video">
          <Plus className="w-4 h-4 mr-2" /> Add Video
        </Button>
      </div>

      {(showAdd || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Video" : "Add New Video"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} data-testid="input-video-title" />
              </div>
              <div className="space-y-2">
                <Label>YouTube ID</Label>
                <Input value={formData.youtubeId} onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })} placeholder="e.g., dQw4w9WgXcQ" data-testid="input-video-youtube" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <RichTextEditor
                content={formData.description}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="Enter video description..."
                minHeight="120px"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                {formData.category === '__custom__' || !['performance','theatre','instrumental','electronic','documentary','ai-video','music-video','interview','giant-steps','hip-hop','johnny-cash','blues-roots','sci-fi'].includes(formData.category) && formData.category !== 'performance' ? (
                  <div className="flex gap-2">
                    <Input 
                      value={formData.category === '__custom__' ? '' : formData.category} 
                      onChange={(e) => setFormData({ ...formData, category: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      placeholder="e.g., funk, reggae"
                      data-testid="input-video-custom-category"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => setFormData({ ...formData, category: 'performance' })} data-testid="button-preset-category">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger data-testid="select-video-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">Performance</SelectItem>
                        <SelectItem value="theatre">Theatre</SelectItem>
                        <SelectItem value="instrumental">Instrumental</SelectItem>
                        <SelectItem value="electronic">Electronic</SelectItem>
                        <SelectItem value="documentary">Documentary</SelectItem>
                        <SelectItem value="ai-video">AI Video</SelectItem>
                        <SelectItem value="music-video">Music Video</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="giant-steps">Giant Steps</SelectItem>
                        <SelectItem value="hip-hop">Hip Hop</SelectItem>
                        <SelectItem value="johnny-cash">Johnny Cash</SelectItem>
                        <SelectItem value="blues-roots">Blues & Roots</SelectItem>
                        <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                        {videos?.map(v => v.category).filter((c, i, arr) => arr.indexOf(c) === i && !['performance','theatre','instrumental','electronic','documentary','ai-video','music-video','interview','giant-steps','hip-hop','johnny-cash','blues-roots','sci-fi'].includes(c)).map(c => (
                          <SelectItem key={c} value={c}>{c.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" size="icon" onClick={() => setFormData({ ...formData, category: '__custom__' })} title="Add custom category" data-testid="button-custom-category">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} data-testid="input-video-order" />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch checked={formData.featured} onCheckedChange={(c) => setFormData({ ...formData, featured: c })} data-testid="switch-video-featured" />
                <Label>Featured</Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => editingId ? updateMutation.mutate({ id: editingId, data: formData }) : createMutation.mutate(formData)} disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-video">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => { setShowAdd(false); setEditingId(null); resetForm(); }}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {videos?.map((video) => (
          <Card key={video.id} data-testid={`video-item-${video.id}`}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{video.title}</p>
                <p className="text-sm text-muted-foreground">{video.category} {video.featured && "• Featured"}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => startEdit(video)} data-testid={`button-edit-video-${video.id}`}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(video.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-video-${video.id}`}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProjectsManager() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: "", slug: "", description: "", fullDescription: "", imageUrl: "", category: "solo", featured: false, order: 0
  });

  const { data: projects, isLoading } = useQuery<Project[]>({ queryKey: ["/api/projects"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/admin/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project added" });
      setShowAdd(false);
      resetForm();
    },
    onError: () => toast({ title: "Failed to add project", variant: "destructive" })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) => 
      apiRequest("PUT", `/api/admin/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project updated" });
      setEditingId(null);
    },
    onError: () => toast({ title: "Failed to update project", variant: "destructive" })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Project deleted" });
    },
    onError: () => toast({ title: "Failed to delete project", variant: "destructive" })
  });

  const resetForm = () => {
    setFormData({ title: "", slug: "", description: "", fullDescription: "", imageUrl: "", category: "solo", featured: false, order: 0 });
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      fullDescription: project.fullDescription || "",
      imageUrl: project.imageUrl || "",
      category: project.category,
      featured: project.featured || false,
      order: project.order || 0
    });
  };

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects ({projects?.length || 0})</h3>
        <Button onClick={() => setShowAdd(true)} data-testid="button-add-project">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {(showAdd || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} data-testid="input-project-title" />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="e.g., my-project" data-testid="input-project-slug" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <RichTextEditor
                content={formData.description}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="Brief project summary..."
                minHeight="100px"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Description</Label>
              <RichTextEditor
                content={formData.fullDescription}
                onChange={(html) => setFormData({ ...formData, fullDescription: html })}
                placeholder="Detailed project description with formatting, links, and images..."
                minHeight="200px"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} data-testid="input-project-image" />
                {formData.imageUrl && (
                  <div className="border rounded-md p-2 bg-muted/30">
                    <img src={formData.imageUrl} alt="Preview" className="max-h-24 mx-auto rounded" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger data-testid="select-project-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="duo">Duo</SelectItem>
                    <SelectItem value="band">Band</SelectItem>
                    <SelectItem value="tribute">Tribute</SelectItem>
                    <SelectItem value="film">Film</SelectItem>
                    <SelectItem value="ai">AI Project</SelectItem>
                    <SelectItem value="theatre">Theatre</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Order</Label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} data-testid="input-project-order" />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch checked={formData.featured} onCheckedChange={(c) => setFormData({ ...formData, featured: c })} data-testid="switch-project-featured" />
                <Label>Featured</Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => editingId ? updateMutation.mutate({ id: editingId, data: formData }) : createMutation.mutate(formData)} disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-project">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => { setShowAdd(false); setEditingId(null); resetForm(); }}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {projects?.map((project) => (
          <Card key={project.id} data-testid={`project-item-${project.id}`}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{project.title}</p>
                <p className="text-sm text-muted-foreground">{project.category}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => startEdit(project)} data-testid={`button-edit-project-${project.id}`}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(project.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-project-${project.id}`}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AwardsManager() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: "", description: "", year: "", category: "music", order: 0
  });

  const { data: awards, isLoading } = useQuery<Award[]>({ queryKey: ["/api/awards"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/admin/awards", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/awards"] });
      toast({ title: "Award added" });
      setShowAdd(false);
      resetForm();
    },
    onError: () => toast({ title: "Failed to add award", variant: "destructive" })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) => 
      apiRequest("PUT", `/api/admin/awards/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/awards"] });
      toast({ title: "Award updated" });
      setEditingId(null);
    },
    onError: () => toast({ title: "Failed to update award", variant: "destructive" })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/awards/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/awards"] });
      toast({ title: "Award deleted" });
    },
    onError: () => toast({ title: "Failed to delete award", variant: "destructive" })
  });

  const resetForm = () => {
    setFormData({ title: "", description: "", year: "", category: "music", order: 0 });
  };

  const startEdit = (award: Award) => {
    setEditingId(award.id);
    setFormData({
      title: award.title,
      description: award.description,
      year: award.year || "",
      category: award.category,
      order: award.order || 0
    });
  };

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Awards ({awards?.length || 0})</h3>
        <Button onClick={() => setShowAdd(true)} data-testid="button-add-award">
          <Plus className="w-4 h-4 mr-2" /> Add Award
        </Button>
      </div>

      {(showAdd || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Award" : "Add New Award"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} data-testid="input-award-title" />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g., 2024" data-testid="input-award-year" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <RichTextEditor
                content={formData.description}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="Award description..."
                minHeight="120px"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger data-testid="select-award-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="film">Film</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} data-testid="input-award-order" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => editingId ? updateMutation.mutate({ id: editingId, data: formData }) : createMutation.mutate(formData)} disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-award">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => { setShowAdd(false); setEditingId(null); resetForm(); }}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {awards?.map((award) => (
          <Card key={award.id} data-testid={`award-item-${award.id}`}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{award.title}</p>
                <p className="text-sm text-muted-foreground">{award.year} • {award.category}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => startEdit(award)} data-testid={`button-edit-award-${award.id}`}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(award.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-award-${award.id}`}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HistoryManager() {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: "", slug: "", year: "", description: "", fullDescription: "", imageUrl: "", category: "music", order: 0,
    galleryImages: "" as string, youtubeVideos: "" as string
  });

  const { data: items, isLoading } = useQuery<HistoryItem[]>({ queryKey: ["/api/history"] });

  const prepareSubmitData = (data: typeof formData) => {
    const { galleryImages, youtubeVideos, ...rest } = data;
    let galleryStr: string | null = null;
    let videosStr: string | null = null;
    try {
      if (galleryImages.trim()) {
        JSON.parse(galleryImages);
        galleryStr = galleryImages.trim();
      }
    } catch {}
    try {
      if (youtubeVideos.trim()) {
        JSON.parse(youtubeVideos);
        videosStr = youtubeVideos.trim();
      }
    } catch {}
    return { ...rest, galleryImages: galleryStr, youtubeVideos: videosStr };
  };

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/admin/history", prepareSubmitData(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
      toast({ title: "History item added" });
      setShowAdd(false);
      resetForm();
    },
    onError: () => toast({ title: "Failed to add history item", variant: "destructive" })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: typeof formData }) => 
      apiRequest("PUT", `/api/admin/history/${id}`, prepareSubmitData(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
      toast({ title: "History item updated" });
      setEditingId(null);
    },
    onError: () => toast({ title: "Failed to update history item", variant: "destructive" })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/history/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
      toast({ title: "History item deleted" });
    },
    onError: () => toast({ title: "Failed to delete history item", variant: "destructive" })
  });

  const resetForm = () => {
    setFormData({ title: "", slug: "", year: "", description: "", fullDescription: "", imageUrl: "", category: "music", order: 0, galleryImages: "", youtubeVideos: "" });
  };

  const startEdit = (item: HistoryItem) => {
    setEditingId(item.id);
    let galleryStr = "";
    let videosStr = "";
    if (item.galleryImages) {
      try {
        const parsed = JSON.parse(item.galleryImages);
        galleryStr = JSON.stringify(parsed, null, 2);
      } catch {
        galleryStr = item.galleryImages;
      }
    }
    if (item.youtubeVideos) {
      try {
        const parsed = JSON.parse(item.youtubeVideos);
        videosStr = JSON.stringify(parsed, null, 2);
      } catch {
        videosStr = item.youtubeVideos;
      }
    }
    setFormData({
      title: item.title,
      slug: item.slug,
      year: item.year,
      description: item.description,
      fullDescription: item.fullDescription || "",
      imageUrl: item.imageUrl || "",
      category: item.category,
      order: item.order || 0,
      galleryImages: galleryStr,
      youtubeVideos: videosStr
    });
  };

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">History Archive ({items?.length || 0})</h3>
        <Button onClick={() => setShowAdd(true)} data-testid="button-add-history">
          <Plus className="w-4 h-4 mr-2" /> Add Entry
        </Button>
      </div>

      {(showAdd || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit History Entry" : "Add New History Entry"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} data-testid="input-history-title" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} data-testid="input-history-slug" />
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Input value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} data-testid="input-history-year" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <RichTextEditor
                content={formData.description}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="Brief history summary..."
                minHeight="100px"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Description</Label>
              <RichTextEditor
                content={formData.fullDescription}
                onChange={(html) => setFormData({ ...formData, fullDescription: html })}
                placeholder="Detailed history description with formatting, links, and images..."
                minHeight="250px"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger data-testid="select-history-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="theatre">Theatre</SelectItem>
                    <SelectItem value="film">Film</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="multimedia">Multimedia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} data-testid="input-history-image" />
                {formData.imageUrl && (
                  <div className="border rounded-md p-2 bg-muted/30">
                    <img src={formData.imageUrl} alt="Preview" className="max-h-24 mx-auto rounded" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                  </div>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Order</Label>
                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} data-testid="input-history-order" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gallery Images (JSON array of URLs)</Label>
              <Textarea
                value={formData.galleryImages}
                onChange={(e) => setFormData({ ...formData, galleryImages: e.target.value })}
                placeholder='["https://example.com/img1.jpg", "https://example.com/img2.jpg"]'
                className="font-mono text-xs min-h-20"
                data-testid="input-history-gallery"
              />
            </div>
            <div className="space-y-2">
              <Label>YouTube Videos (JSON array)</Label>
              <Textarea
                value={formData.youtubeVideos}
                onChange={(e) => setFormData({ ...formData, youtubeVideos: e.target.value })}
                placeholder='[{"id": "dQw4w9WgXcQ", "title": "Video Title"}]'
                className="font-mono text-xs min-h-20"
                data-testid="input-history-youtube"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => editingId ? updateMutation.mutate({ id: editingId, data: formData }) : createMutation.mutate(formData)} disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-history">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => { setShowAdd(false); setEditingId(null); resetForm(); }}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {items?.map((item) => (
          <Card key={item.id} data-testid={`history-item-${item.id}`}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.year} • {item.category}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => startEdit(item)} data-testid={`button-edit-history-${item.id}`}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(item.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-history-${item.id}`}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ImagesManager() {
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: "", category: "headshots", objectPath: "", altText: "", order: 0
  });

  const { data: images, isLoading } = useQuery<Image[]>({ queryKey: ["/api/images"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/images", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      toast({ title: "Image added" });
      setShowAdd(false);
      setFormData({ name: "", category: "headshots", objectPath: "", altText: "", order: 0 });
    },
    onError: () => toast({ title: "Failed to add image", variant: "destructive" })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/images/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      toast({ title: "Image deleted" });
    },
    onError: () => toast({ title: "Failed to delete image", variant: "destructive" })
  });

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Images ({images?.length || 0})</h3>
        <Button onClick={() => setShowAdd(true)} data-testid="button-add-image">
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </Button>
      </div>

      {showAdd && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} data-testid="input-image-name" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger data-testid="select-image-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="headshots">Headshots</SelectItem>
                    <SelectItem value="logo">Logo</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="documentary">Documentary</SelectItem>
                    <SelectItem value="albums">Albums</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input value={formData.objectPath} onChange={(e) => setFormData({ ...formData, objectPath: e.target.value })} placeholder="https://..." data-testid="input-image-url" />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input value={formData.altText} onChange={(e) => setFormData({ ...formData, altText: e.target.value })} data-testid="input-image-alt" />
            </div>
            {formData.objectPath && (
              <div className="border rounded-lg p-2 bg-muted/30">
                <img src={formData.objectPath} alt="Preview" className="max-h-32 mx-auto rounded" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={() => createMutation.mutate(formData)} disabled={createMutation.isPending} data-testid="button-save-image">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => setShowAdd(false)}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images?.map((image) => (
          <Card key={image.id} className="overflow-hidden" data-testid={`image-item-${image.id}`}>
            <div className="aspect-square bg-muted">
              <img src={image.objectPath} alt={image.altText || image.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm truncate">{image.name}</p>
              <p className="text-xs text-muted-foreground">{image.category}</p>
              <Button variant="destructive" size="sm" className="mt-2 w-full" onClick={() => deleteMutation.mutate(image.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-image-${image.id}`}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MessagesViewer() {
  const { data: messages, isLoading } = useQuery<ContactMessage[]>({ queryKey: ["/api/admin/messages"] });

  if (isLoading) return <Skeleton className="h-64" />;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Messages ({messages?.length || 0})</h3>
      {messages?.length === 0 && (
        <p className="text-muted-foreground text-center py-8">No messages yet</p>
      )}
      <div className="space-y-2">
        {messages?.map((msg) => (
          <Card key={msg.id} data-testid={`message-item-${msg.id}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium">{msg.name}</p>
                  <p className="text-sm text-muted-foreground">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
                </div>
                <p className="text-xs text-muted-foreground">{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}</p>
              </div>
              <p className="font-medium mt-2">{msg.subject}</p>
              <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  usePageTitle("Admin Dashboard", "Manage Doctor Baz website content");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((data) => {
        setIsAuthenticated(data.isAdmin);
        setIsChecking(false);
      })
      .catch(() => setIsChecking(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-background">
      <section className="relative py-8 bg-gradient-to-br from-background via-card to-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neon-cyan/20 rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold" data-testid="text-admin-title">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your website content</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="videos" className="space-y-6">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
              <TabsTrigger value="videos" className="flex items-center gap-2" data-testid="tab-videos">
                <Video className="w-4 h-4" /> Videos
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2" data-testid="tab-projects">
                <Music className="w-4 h-4" /> Projects
              </TabsTrigger>
              <TabsTrigger value="awards" className="flex items-center gap-2" data-testid="tab-awards">
                <Trophy className="w-4 h-4" /> Awards
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2" data-testid="tab-history">
                <History className="w-4 h-4" /> History
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2" data-testid="tab-images">
                <ImageIcon className="w-4 h-4" /> Images
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2" data-testid="tab-messages">
                <Mail className="w-4 h-4" /> Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="videos"><VideosManager /></TabsContent>
            <TabsContent value="projects"><ProjectsManager /></TabsContent>
            <TabsContent value="awards"><AwardsManager /></TabsContent>
            <TabsContent value="history"><HistoryManager /></TabsContent>
            <TabsContent value="images"><ImagesManager /></TabsContent>
            <TabsContent value="messages"><MessagesViewer /></TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
