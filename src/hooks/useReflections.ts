import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Reflection {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  surah_number: number | null;
  ayah_number: number | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  user_name?: string;
  like_count?: number;
  liked_by_user?: boolean;
}

export function useReflections(surahNumber?: number, ayahNumber?: number) {
  const { user } = useAuth();
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [publicReflections, setPublicReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReflections = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch user's own reflections
      if (user) {
        let query = supabase
          .from('reflections')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (surahNumber) {
          query = query.eq('surah_number', surahNumber);
        }
        if (ayahNumber) {
          query = query.eq('ayah_number', ayahNumber);
        }

        const { data } = await query;
        if (data) {
          setReflections(data as Reflection[]);
        }
      }

      // Fetch public reflections for this verse
      if (surahNumber && ayahNumber) {
        const { data: publicData } = await supabase
          .from('reflections')
          .select('*')
          .eq('surah_number', surahNumber)
          .eq('ayah_number', ayahNumber)
          .eq('is_public', true)
          .order('created_at', { ascending: false })
          .limit(20);

        if (publicData) {
          // Fetch profile names for public reflections
          const userIds = [...new Set(publicData.map((r) => r.user_id))];
          const reflectionIds = publicData.map((r) => r.id);
          
          const [profilesRes, likesRes, userLikesRes] = await Promise.all([
            supabase.from('profiles').select('id, full_name').in('id', userIds),
            supabase.from('reflection_likes').select('reflection_id').in('reflection_id', reflectionIds),
            user 
              ? supabase.from('reflection_likes').select('reflection_id').eq('user_id', user.id).in('reflection_id', reflectionIds)
              : Promise.resolve({ data: [] })
          ]);

          const profileMap = new Map(profilesRes.data?.map((p) => [p.id, p.full_name]) || []);
          
          // Count likes per reflection
          const likeCountMap = new Map<string, number>();
          likesRes.data?.forEach((like) => {
            const count = likeCountMap.get(like.reflection_id) || 0;
            likeCountMap.set(like.reflection_id, count + 1);
          });
          
          // User's likes
          const userLikedSet = new Set(userLikesRes.data?.map((l) => l.reflection_id) || []);

          setPublicReflections(
            publicData.map((r) => ({
              ...r,
              user_name: profileMap.get(r.user_id) || 'Anonymous',
              like_count: likeCountMap.get(r.id) || 0,
              liked_by_user: userLikedSet.has(r.id),
            })) as Reflection[]
          );
        }
      }
    } catch (error) {
      console.error('Error fetching reflections:', error);
    } finally {
      setLoading(false);
    }
  }, [user, surahNumber, ayahNumber]);

  useEffect(() => {
    fetchReflections();
  }, [fetchReflections]);

  const addReflection = useCallback(
    async (content: string, title?: string, isPublic = false) => {
      if (!user) {
        toast.error('Please login to add a reflection');
        return null;
      }

      try {
        const { data, error } = await supabase
          .from('reflections')
          .insert({
            user_id: user.id,
            content,
            title: title || null,
            surah_number: surahNumber || null,
            ayah_number: ayahNumber || null,
            is_public: isPublic,
          })
          .select()
          .single();

        if (error) throw error;

        setReflections((prev) => [data as Reflection, ...prev]);
        toast.success('Reflection saved');
        return data;
      } catch (error) {
        console.error('Error adding reflection:', error);
        toast.error('Failed to save reflection');
        return null;
      }
    },
    [user, surahNumber, ayahNumber]
  );

  const updateReflection = useCallback(
    async (id: string, content: string, title?: string, isPublic?: boolean) => {
      if (!user) return false;

      try {
        const updateData: { content: string; title?: string | null; is_public?: boolean } = { content };
        if (title !== undefined) updateData.title = title || null;
        if (isPublic !== undefined) updateData.is_public = isPublic;

        const { error } = await supabase
          .from('reflections')
          .update(updateData)
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        setReflections((prev) =>
          prev.map((r) =>
            r.id === id
              ? { ...r, content, title: title ?? r.title, is_public: isPublic ?? r.is_public }
              : r
          )
        );

        toast.success('Reflection updated');
        return true;
      } catch (error) {
        console.error('Error updating reflection:', error);
        toast.error('Failed to update reflection');
        return false;
      }
    },
    [user]
  );

  const deleteReflection = useCallback(
    async (id: string) => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from('reflections')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        setReflections((prev) => prev.filter((r) => r.id !== id));
        toast.success('Reflection deleted');
        return true;
      } catch (error) {
        console.error('Error deleting reflection:', error);
        toast.error('Failed to delete reflection');
        return false;
      }
    },
    [user]
  );

  const likeReflection = useCallback(
    async (reflectionId: string) => {
      if (!user) {
        toast.error('Please login to like reflections');
        return false;
      }

      try {
        const { error } = await supabase
          .from('reflection_likes')
          .insert({ user_id: user.id, reflection_id: reflectionId });

        if (error) throw error;

        setPublicReflections((prev) =>
          prev.map((r) =>
            r.id === reflectionId
              ? { ...r, like_count: (r.like_count || 0) + 1, liked_by_user: true }
              : r
          )
        );
        return true;
      } catch (error) {
        console.error('Error liking reflection:', error);
        return false;
      }
    },
    [user]
  );

  const unlikeReflection = useCallback(
    async (reflectionId: string) => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from('reflection_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('reflection_id', reflectionId);

        if (error) throw error;

        setPublicReflections((prev) =>
          prev.map((r) =>
            r.id === reflectionId
              ? { ...r, like_count: Math.max((r.like_count || 1) - 1, 0), liked_by_user: false }
              : r
          )
        );
        return true;
      } catch (error) {
        console.error('Error unliking reflection:', error);
        return false;
      }
    },
    [user]
  );

  return {
    reflections,
    publicReflections,
    loading,
    addReflection,
    updateReflection,
    deleteReflection,
    likeReflection,
    unlikeReflection,
    refresh: fetchReflections,
  };
}
