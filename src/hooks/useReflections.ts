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
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', userIds);

          const profileMap = new Map(profiles?.map((p) => [p.id, p.full_name]) || []);

          setPublicReflections(
            publicData.map((r) => ({
              ...r,
              user_name: profileMap.get(r.user_id) || 'Anonymous',
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
        const updateData: { content: string; title?: string; is_public?: boolean } = { content };
        if (title !== undefined) updateData.title = title;
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

  return {
    reflections,
    publicReflections,
    loading,
    addReflection,
    updateReflection,
    deleteReflection,
    refresh: fetchReflections,
  };
}
