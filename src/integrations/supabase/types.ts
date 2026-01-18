export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      dhikr_progress: {
        Row: {
          count: number | null
          created_at: string | null
          date: string | null
          dhikr_name: string
          id: string
          target_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          count?: number | null
          created_at?: string | null
          date?: string | null
          dhikr_name: string
          id?: string
          target_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          count?: number | null
          created_at?: string | null
          date?: string | null
          dhikr_name?: string
          id?: string
          target_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      dua_bookmarks: {
        Row: {
          arabic: string
          category: string
          created_at: string
          id: string
          meaning: string
          transliteration: string
          user_id: string
        }
        Insert: {
          arabic: string
          category: string
          created_at?: string
          id?: string
          meaning: string
          transliteration: string
          user_id: string
        }
        Update: {
          arabic?: string
          category?: string
          created_at?: string
          id?: string
          meaning?: string
          transliteration?: string
          user_id?: string
        }
        Relationships: []
      }
      guide_progress: {
        Row: {
          completed: boolean | null
          completed_steps: number[] | null
          created_at: string | null
          guide_id: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_steps?: number[] | null
          created_at?: string | null
          guide_id: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_steps?: number[] | null
          created_at?: string | null
          guide_id?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      hadith_bookmarks: {
        Row: {
          collection_id: string
          created_at: string
          hadith_arabic_text: string | null
          hadith_number: number
          hadith_text: string
          id: string
          user_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          hadith_arabic_text?: string | null
          hadith_number: number
          hadith_text: string
          id?: string
          user_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          hadith_arabic_text?: string | null
          hadith_number?: number
          hadith_text?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      juz_completion: {
        Row: {
          completed_at: string
          id: string
          juz_number: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          juz_number: number
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          juz_number?: number
          user_id?: string
        }
        Relationships: []
      }
      learning_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          lesson_id: string
          quiz_score: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id: string
          quiz_score?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      memorization_progress: {
        Row: {
          ayah_from: number
          ayah_to: number
          created_at: string
          id: string
          last_reviewed_at: string | null
          memorization_level: string
          review_count: number
          surah_number: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ayah_from?: number
          ayah_to: number
          created_at?: string
          id?: string
          last_reviewed_at?: string | null
          memorization_level?: string
          review_count?: number
          surah_number: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ayah_from?: number
          ayah_to?: number
          created_at?: string
          id?: string
          last_reviewed_at?: string | null
          memorization_level?: string
          review_count?: number
          surah_number?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prayer_tracker: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          prayer_date: string
          prayer_name: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          prayer_date: string
          prayer_name: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          prayer_date?: string
          prayer_name?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          location: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quran_bookmarks: {
        Row: {
          ayah_number: number
          created_at: string | null
          id: string
          note: string | null
          surah_number: number
          user_id: string
        }
        Insert: {
          ayah_number: number
          created_at?: string | null
          id?: string
          note?: string | null
          surah_number: number
          user_id: string
        }
        Update: {
          ayah_number?: number
          created_at?: string | null
          id?: string
          note?: string | null
          surah_number?: number
          user_id?: string
        }
        Relationships: []
      }
      quran_notes: {
        Row: {
          ayah_number: number
          created_at: string | null
          id: string
          note: string
          surah_number: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ayah_number: number
          created_at?: string | null
          id?: string
          note: string
          surah_number: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ayah_number?: number
          created_at?: string | null
          id?: string
          note?: string
          surah_number?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          ayah_number: number
          created_at: string
          id: string
          last_read_at: string
          surah_number: number
          user_id: string
        }
        Insert: {
          ayah_number: number
          created_at?: string
          id?: string
          last_read_at?: string
          surah_number: number
          user_id: string
        }
        Update: {
          ayah_number?: number
          created_at?: string
          id?: string
          last_read_at?: string
          surah_number?: number
          user_id?: string
        }
        Relationships: []
      }
      reading_streaks: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_read_date: string | null
          longest_streak: number
          streak_start_date: string | null
          total_days_read: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_read_date?: string | null
          longest_streak?: number
          streak_start_date?: string | null
          total_days_read?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_read_date?: string | null
          longest_streak?: number
          streak_start_date?: string | null
          total_days_read?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reflection_likes: {
        Row: {
          created_at: string
          id: string
          reflection_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reflection_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reflection_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reflection_likes_reflection_id_fkey"
            columns: ["reflection_id"]
            isOneToOne: false
            referencedRelation: "reflections"
            referencedColumns: ["id"]
          },
        ]
      }
      reflections: {
        Row: {
          ayah_number: number | null
          content: string
          created_at: string | null
          id: string
          is_public: boolean | null
          surah_number: number | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ayah_number?: number | null
          content: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          surah_number?: number | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ayah_number?: number | null
          content?: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          surah_number?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_description: string | null
          badge_icon: string | null
          badge_id: string
          badge_name: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_description?: string | null
          badge_icon?: string | null
          badge_id: string
          badge_name: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_description?: string | null
          badge_icon?: string | null
          badge_id?: string
          badge_name?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
