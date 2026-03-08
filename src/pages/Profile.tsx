import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PageWrapper } from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User, MapPin, Edit3, Check, X, Flame, BookOpen, Book, Heart,
  Trash2, LogOut, ChevronRight, Award, Calendar, TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadingStreak {
  current_streak: number;
  longest_streak: number;
  total_days_read: number;
  last_read_date: string | null;
}

interface QuranBookmark {
  id: string;
  surah_number: number;
  ayah_number: number;
  note: string | null;
}

interface HadithBookmark {
  id: string;
  collection_id: string;
  hadith_number: number;
  hadith_text: string;
  hadith_arabic_text: string | null;
}

interface DuaBookmark {
  id: string;
  category: string;
  arabic: string;
  transliteration: string;
  meaning: string;
}

const collectionNames: Record<string, string> = {
  "eng-bukhari": "Sahih Bukhari",
  "eng-muslim": "Sahih Muslim",
  "eng-abudawud": "Abu Dawood",
  "eng-tirmidhi": "Tirmidhi",
  "eng-nasai": "Nasa'i",
  "eng-ibnmajah": "Ibn Majah",
  "eng-malik": "Muwatta Malik",
  "eng-nawawi": "Nawawi's 40",
  "eng-qudsi": "40 Qudsi",
  "eng-mishkat": "Mishkat",
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempLocation, setTempLocation] = useState('');

  const [streak, setStreak] = useState<ReadingStreak | null>(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [quranBookmarks, setQuranBookmarks] = useState<QuranBookmark[]>([]);
  const [hadithBookmarks, setHadithBookmarks] = useState<HadithBookmark[]>([]);
  const [duaBookmarks, setDuaBookmarks] = useState<DuaBookmark[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAllData();
  }, [user]);

  const fetchAllData = async () => {
    if (!user) return;
    setLoading(true);

    const [profileRes, streakRes, badgeRes, quranRes, hadithRes, duaRes] = await Promise.all([
      supabase.from('profiles').select('full_name, location').eq('id', user.id).single(),
      supabase.from('reading_streaks').select('current_streak, longest_streak, total_days_read, last_read_date').eq('user_id', user.id).single(),
      supabase.from('user_badges').select('id').eq('user_id', user.id),
      supabase.from('quran_bookmarks').select('id, surah_number, ayah_number, note').order('created_at', { ascending: false }),
      supabase.from('hadith_bookmarks').select('id, collection_id, hadith_number, hadith_text, hadith_arabic_text').order('created_at', { ascending: false }),
      supabase.from('dua_bookmarks').select('id, category, arabic, transliteration, meaning').order('created_at', { ascending: false }),
    ]);

    if (profileRes.data) {
      setFullName(profileRes.data.full_name || '');
      setLocation(profileRes.data.location || '');
    }
    if (streakRes.data) setStreak(streakRes.data);
    if (badgeRes.data) setBadgeCount(badgeRes.data.length);
    if (quranRes.data) setQuranBookmarks(quranRes.data);
    if (hadithRes.data) setHadithBookmarks(hadithRes.data);
    if (duaRes.data) setDuaBookmarks(duaRes.data);

    setLoading(false);
  };

  const updateProfile = async (field: 'full_name' | 'location', value: string) => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', user.id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to update profile', variant: 'destructive' });
    } else {
      if (field === 'full_name') { setFullName(value); setEditingName(false); }
      else { setLocation(value); setEditingLocation(false); }
      toast({ title: 'Updated', description: 'Profile updated successfully' });
    }
  };

  const deleteBookmark = async (table: 'quran_bookmarks' | 'hadith_bookmarks' | 'dua_bookmarks', id: string) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
      return;
    }
    toast({ title: 'Removed', description: 'Bookmark deleted' });
    if (table === 'quran_bookmarks') setQuranBookmarks(prev => prev.filter(b => b.id !== id));
    if (table === 'hadith_bookmarks') setHadithBookmarks(prev => prev.filter(b => b.id !== id));
    if (table === 'dua_bookmarks') setDuaBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <PageWrapper>
        <main className="flex-1 container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Loading...</p>
        </main>
      </PageWrapper>
    );
  }

  const totalBookmarks = quranBookmarks.length + hadithBookmarks.length + duaBookmarks.length;

  return (
    <PageWrapper>
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        {/* Profile Card */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/20">
            <User className="w-9 h-9 text-primary" />
          </div>

          {/* Name */}
          {editingName ? (
            <div className="flex items-center gap-2 justify-center mb-1">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="max-w-[200px] h-9 text-center"
                autoFocus
              />
              <button onClick={() => updateProfile('full_name', tempName)} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => setEditingName(false)} className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setTempName(fullName); setEditingName(true); }}
              className="flex items-center gap-1.5 justify-center mx-auto group"
            >
              <h1 className="text-xl font-semibold text-foreground">
                {fullName || 'Set your name'}
              </h1>
              <Edit3 className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          {/* Location */}
          {editingLocation ? (
            <div className="flex items-center gap-2 justify-center mt-1">
              <Input
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                className="max-w-[200px] h-8 text-center text-sm"
                placeholder="City, Country"
                autoFocus
              />
              <button onClick={() => updateProfile('location', tempLocation)} className="p-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setEditingLocation(false)} className="p-1 rounded-lg bg-muted text-muted-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setTempLocation(location); setEditingLocation(true); }}
              className="flex items-center gap-1 justify-center text-sm text-muted-foreground mt-1 group"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{location || 'Add location'}</span>
              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          <p className="text-xs text-muted-foreground mt-2">{user?.email}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-2xl border border-border/40 bg-card/50 p-4 text-center">
            <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{streak?.current_streak || 0}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Streak</p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-card/50 p-4 text-center">
            <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{streak?.total_days_read || 0}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Days Read</p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-card/50 p-4 text-center">
            <Award className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{badgeCount}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Badges</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="rounded-2xl border border-border/40 bg-card/50 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Longest Streak</span>
            </div>
            <span className="text-sm font-semibold text-primary">{streak?.longest_streak || 0} days</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Bookmarks</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{totalBookmarks}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Last Read</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {streak?.last_read_date
                ? new Date(streak.last_read_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '—'}
            </span>
          </div>
        </div>

        {/* Bookmarks */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-3">
            My Bookmarks
          </p>
          <Tabs defaultValue="quran">
            <TabsList className="grid w-full grid-cols-3 h-10">
              <TabsTrigger value="quran" className="text-xs gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Quran ({quranBookmarks.length})
              </TabsTrigger>
              <TabsTrigger value="hadith" className="text-xs gap-1.5">
                <Book className="w-3.5 h-3.5" />
                Hadith ({hadithBookmarks.length})
              </TabsTrigger>
              <TabsTrigger value="duas" className="text-xs gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                Duas ({duaBookmarks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quran" className="mt-3">
              {quranBookmarks.length === 0 ? (
                <EmptyBookmark icon={BookOpen} label="No Quran bookmarks" actionLabel="Read Quran" actionPath="/quran" />
              ) : (
                <div className="rounded-2xl border border-border/40 overflow-hidden bg-card/50">
                  {quranBookmarks.map((b, i) => (
                    <div key={b.id} className={cn("flex items-center justify-between px-4 py-3", i < quranBookmarks.length - 1 && "border-b border-border/30")}>
                      <button onClick={() => navigate(`/surah/${b.surah_number}`)} className="flex-1 text-left">
                        <p className="text-sm font-medium text-foreground">Surah {b.surah_number}, Ayah {b.ayah_number}</p>
                        {b.note && <p className="text-xs text-muted-foreground truncate mt-0.5">{b.note}</p>}
                      </button>
                      <button onClick={() => deleteBookmark('quran_bookmarks', b.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="hadith" className="mt-3">
              {hadithBookmarks.length === 0 ? (
                <EmptyBookmark icon={Book} label="No Hadith bookmarks" actionLabel="Browse Hadith" actionPath="/hadith" />
              ) : (
                <div className="rounded-2xl border border-border/40 overflow-hidden bg-card/50">
                  {hadithBookmarks.map((b, i) => (
                    <div key={b.id} className={cn("px-4 py-3", i < hadithBookmarks.length - 1 && "border-b border-border/30")}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-primary">
                            {collectionNames[b.collection_id] || b.collection_id} #{b.hadith_number}
                          </p>
                          <p className="text-sm text-foreground mt-1 line-clamp-2">{b.hadith_text}</p>
                        </div>
                        <button onClick={() => deleteBookmark('hadith_bookmarks', b.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="duas" className="mt-3">
              {duaBookmarks.length === 0 ? (
                <EmptyBookmark icon={Heart} label="No Dua bookmarks" actionLabel="Browse Duas" actionPath="/duas" />
              ) : (
                <div className="rounded-2xl border border-border/40 overflow-hidden bg-card/50">
                  {duaBookmarks.map((b, i) => (
                    <div key={b.id} className={cn("px-4 py-3", i < duaBookmarks.length - 1 && "border-b border-border/30")}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">{b.category}</p>
                          <p className="text-base text-right font-arabic mt-1" dir="rtl">{b.arabic}</p>
                          <p className="text-xs text-muted-foreground italic mt-1">{b.transliteration}</p>
                        </div>
                        <button onClick={() => deleteBookmark('dua_bookmarks', b.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-destructive/20 text-destructive hover:bg-destructive/5 transition-colors text-sm font-medium mb-8"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </main>
    </PageWrapper>
  );
};

const EmptyBookmark = ({ icon: Icon, label, actionLabel, actionPath }: { icon: React.ComponentType<{ className?: string }>; label: string; actionLabel: string; actionPath: string }) => (
  <div className="rounded-2xl border border-border/40 bg-card/50 p-8 text-center">
    <Icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
    <p className="text-sm text-muted-foreground mb-3">{label}</p>
    <Link to={actionPath}>
      <Button variant="outline" size="sm" className="text-xs">
        {actionLabel}
        <ChevronRight className="w-3 h-3 ml-1" />
      </Button>
    </Link>
  </div>
);

export default Profile;
