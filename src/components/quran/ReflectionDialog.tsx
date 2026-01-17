import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Send, Globe, Lock, User, Sparkles, Heart, Pencil, Trash2, X, Check } from 'lucide-react';
import { useReflections, Reflection } from '@/hooks/useReflections';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface ReflectionDialogProps {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
}

export function ReflectionDialog({
  surahNumber,
  ayahNumber,
  surahName,
}: ReflectionDialogProps) {
  const { user } = useAuth();
  const { 
    reflections, 
    publicReflections, 
    addReflection, 
    updateReflection,
    deleteReflection,
    likeReflection,
    unlikeReflection,
    loading 
  } = useReflections(surahNumber, ayahNumber);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setSubmitting(true);
    await addReflection(content.trim(), title.trim() || undefined, isPublic);
    setContent('');
    setTitle('');
    setIsPublic(false);
    setSubmitting(false);
  };

  const myReflections = reflections.filter(r => r.user_id === user?.id);
  const communityReflections = publicReflections.filter(pr => pr.user_id !== user?.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs">Reflect</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b bg-muted/30">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            Reflections
          </DialogTitle>
          <DialogDescription className="text-xs">
            {surahName} {surahNumber}:{ayahNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Add new reflection */}
          {user ? (
            <div className="px-5 py-4 space-y-3 border-b bg-background">
              <Input
                placeholder="Title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-sm h-9 bg-muted/50 border-0 focus-visible:ring-1"
              />
              <Textarea
                placeholder="Share your thoughts on this verse..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[70px] resize-none text-sm bg-muted/50 border-0 focus-visible:ring-1"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Switch
                    id="public-reflection"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                    className="scale-90"
                  />
                  <Label
                    htmlFor="public-reflection"
                    className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1.5"
                  >
                    {isPublic ? (
                      <>
                        <Globe className="h-3.5 w-3.5 text-primary" /> 
                        <span>Visible to community</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" /> 
                        <span>Only you can see</span>
                      </>
                    )}
                  </Label>
                </div>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!content.trim() || submitting}
                  className="gap-1.5 h-8 px-3"
                >
                  <Send className="h-3.5 w-3.5" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-5 py-4 text-center border-b">
              <p className="text-sm text-muted-foreground">
                Please <span className="text-primary font-medium">login</span> to add reflections
              </p>
            </div>
          )}

          {/* Reflections tabs */}
          <Tabs defaultValue="mine" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="mx-5 mt-3 h-9 p-1 bg-muted/50">
              <TabsTrigger value="mine" className="text-xs flex-1 gap-1.5">
                <Lock className="h-3 w-3" />
                My Notes ({myReflections.length})
              </TabsTrigger>
              <TabsTrigger value="community" className="text-xs flex-1 gap-1.5">
                <Globe className="h-3 w-3" />
                Community ({communityReflections.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mine" className="flex-1 overflow-hidden m-0 mt-2">
              <ScrollArea className="h-full max-h-[300px]">
                <div className="px-5 pb-5 space-y-2">
                  {loading ? (
                    <LoadingState />
                  ) : myReflections.length === 0 ? (
                    <EmptyState message="Your private reflections will appear here" icon={Lock} />
                  ) : (
                    myReflections.map((reflection) => (
                      <EditableReflectionCard 
                        key={reflection.id} 
                        reflection={reflection}
                        onUpdate={updateReflection}
                        onDelete={deleteReflection}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="community" className="flex-1 overflow-hidden m-0 mt-2">
              <ScrollArea className="h-full max-h-[300px]">
                <div className="px-5 pb-5 space-y-2">
                  {loading ? (
                    <LoadingState />
                  ) : communityReflections.length === 0 ? (
                    <EmptyState message="No community reflections yet. Be the first to share!" icon={Globe} />
                  ) : (
                    communityReflections.map((reflection) => (
                      <CommunityReflectionCard 
                        key={reflection.id} 
                        reflection={reflection}
                        onLike={likeReflection}
                        onUnlike={unlikeReflection}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LoadingState() {
  return (
    <div className="py-6 text-center">
      <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
      <p className="text-xs text-muted-foreground mt-2">Loading...</p>
    </div>
  );
}

function EmptyState({ message, icon: Icon }: { message: string; icon: typeof Lock }) {
  return (
    <div className="py-8 text-center">
      <Icon className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
      <p className="text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

function EditableReflectionCard({
  reflection,
  onUpdate,
  onDelete,
}: {
  reflection: Reflection;
  onUpdate: (id: string, content: string, title?: string, isPublic?: boolean) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reflection.content);
  const [editTitle, setEditTitle] = useState(reflection.title || '');
  const [editIsPublic, setEditIsPublic] = useState(reflection.is_public);
  const [saving, setSaving] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    if (!editContent.trim()) return;
    setSaving(true);
    const success = await onUpdate(reflection.id, editContent.trim(), editTitle.trim(), editIsPublic);
    if (success) {
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setEditContent(reflection.content);
    setEditTitle(reflection.title || '');
    setEditIsPublic(reflection.is_public);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(reflection.id);
    setDeleting(false);
    setShowDeleteAlert(false);
  };

  if (isEditing) {
    return (
      <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 space-y-2">
        <Input
          placeholder="Title (optional)"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="text-sm h-8 bg-background"
        />
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="min-h-[60px] resize-none text-sm bg-background"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              checked={editIsPublic}
              onCheckedChange={setEditIsPublic}
              className="scale-75"
            />
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              {editIsPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {editIsPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={handleCancel} className="h-7 px-2">
              <X className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving || !editContent.trim()} className="h-7 px-2 gap-1">
              <Check className="h-3.5 w-3.5" />
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 transition-colors group">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full flex items-center justify-center bg-primary/15 text-primary">
              <User className="h-3 w-3" />
            </div>
            <span className="text-xs font-medium">You</span>
            {reflection.is_public && (
              <Globe className="h-3 w-3 text-muted-foreground/60" />
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground mr-1">
              {formatDistanceToNow(new Date(reflection.created_at), { addSuffix: true })}
            </span>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
              onClick={() => setShowDeleteAlert(true)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {reflection.title && (
          <h4 className="font-medium text-sm mb-1 text-foreground">{reflection.title}</h4>
        )}
        <p className="text-sm text-foreground/75 whitespace-pre-wrap leading-relaxed">{reflection.content}</p>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Reflection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this reflection? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function CommunityReflectionCard({
  reflection,
  onLike,
  onUnlike,
}: {
  reflection: Reflection;
  onLike: (id: string) => Promise<boolean>;
  onUnlike: (id: string) => Promise<boolean>;
}) {
  const [liking, setLiking] = useState(false);

  const handleLikeToggle = async () => {
    setLiking(true);
    if (reflection.liked_by_user) {
      await onUnlike(reflection.id);
    } else {
      await onLike(reflection.id);
    }
    setLiking(false);
  };

  return (
    <div className="p-3 rounded-lg bg-muted/40 border border-border/50 transition-colors">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
            <User className="h-3 w-3" />
          </div>
          <span className="text-xs font-medium">
            {reflection.user_name || 'Anonymous'}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">
          {formatDistanceToNow(new Date(reflection.created_at), { addSuffix: true })}
        </span>
      </div>
      {reflection.title && (
        <h4 className="font-medium text-sm mb-1 text-foreground">{reflection.title}</h4>
      )}
      <p className="text-sm text-foreground/75 whitespace-pre-wrap leading-relaxed">{reflection.content}</p>
      
      {/* Like button */}
      <div className="mt-2 pt-2 border-t border-border/30">
        <Button
          variant="ghost"
          size="sm"
          className={`h-7 px-2 gap-1.5 text-xs ${reflection.liked_by_user ? 'text-red-500' : 'text-muted-foreground'}`}
          onClick={handleLikeToggle}
          disabled={liking}
        >
          <Heart className={`h-3.5 w-3.5 ${reflection.liked_by_user ? 'fill-current' : ''}`} />
          <span>{reflection.like_count || 0}</span>
        </Button>
      </div>
    </div>
  );
}