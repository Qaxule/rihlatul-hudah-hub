import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Send, Globe, Lock, User, Sparkles } from 'lucide-react';
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
  const { reflections, publicReflections, addReflection, loading } = useReflections(
    surahNumber,
    ayahNumber
  );
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
                      <ReflectionCard key={reflection.id} reflection={reflection} isOwn />
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
                      <ReflectionCard key={reflection.id} reflection={reflection} />
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

function ReflectionCard({
  reflection,
  isOwn = false,
}: {
  reflection: Reflection;
  isOwn?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-lg transition-colors ${
        isOwn 
          ? 'bg-primary/5 border border-primary/15' 
          : 'bg-muted/40 border border-border/50'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
            isOwn ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
          }`}>
            <User className="h-3 w-3" />
          </div>
          <span className="text-xs font-medium">
            {isOwn ? 'You' : reflection.user_name || 'Anonymous'}
          </span>
          {reflection.is_public && (
            <Globe className="h-3 w-3 text-muted-foreground/60" />
          )}
        </div>
        <span className="text-[10px] text-muted-foreground">
          {formatDistanceToNow(new Date(reflection.created_at), { addSuffix: true })}
        </span>
      </div>
      {reflection.title && (
        <h4 className="font-medium text-sm mb-1 text-foreground">{reflection.title}</h4>
      )}
      <p className="text-sm text-foreground/75 whitespace-pre-wrap leading-relaxed">{reflection.content}</p>
    </div>
  );
}
