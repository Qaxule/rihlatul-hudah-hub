import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Globe, Lock, User } from 'lucide-react';
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

  const allReflections = [
    ...reflections.map((r) => ({ ...r, isOwn: true })),
    ...publicReflections
      .filter((pr) => !reflections.some((r) => r.id === pr.id))
      .map((r) => ({ ...r, isOwn: r.user_id === user?.id })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
      <DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Reflections on {surahName} {surahNumber}:{ayahNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          {/* Add new reflection */}
          {user ? (
            <div className="space-y-3 border-b pb-4">
              <Input
                placeholder="Title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-sm"
              />
              <Textarea
                placeholder="Share your thoughts on this verse..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="public-reflection"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <Label
                    htmlFor="public-reflection"
                    className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1"
                  >
                    {isPublic ? (
                      <>
                        <Globe className="h-3 w-3" /> Share publicly
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3" /> Private
                      </>
                    )}
                  </Label>
                </div>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!content.trim() || submitting}
                  className="gap-1"
                >
                  <Send className="h-3 w-3" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 border-b">
              Please login to add reflections
            </p>
          )}

          {/* Reflections list */}
          <ScrollArea className="flex-1">
            <div className="space-y-3 pr-3">
              {loading ? (
                <p className="text-sm text-muted-foreground text-center py-4">Loading...</p>
              ) : allReflections.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No reflections yet. Be the first to share your thoughts!
                </p>
              ) : (
                allReflections.map((reflection) => (
                  <ReflectionCard
                    key={reflection.id}
                    reflection={reflection}
                    isOwn={'isOwn' in reflection ? reflection.isOwn : false}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReflectionCard({
  reflection,
  isOwn,
}: {
  reflection: Reflection;
  isOwn: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-lg border ${
        isOwn ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium">
            {isOwn ? 'You' : reflection.user_name || 'Anonymous'}
          </span>
          {reflection.is_public ? (
            <Globe className="h-3 w-3 text-muted-foreground" />
          ) : (
            <Lock className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(reflection.created_at), { addSuffix: true })}
        </span>
      </div>
      {reflection.title && (
        <h4 className="font-medium text-sm mb-1">{reflection.title}</h4>
      )}
      <p className="text-sm text-foreground/80 whitespace-pre-wrap">{reflection.content}</p>
    </div>
  );
}
