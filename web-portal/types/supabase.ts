export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_courses: {
        Row: {
          cart_id: number
          course_id: number
        }
        Insert: {
          cart_id: number
          course_id: number
        }
        Update: {
          cart_id?: number
          course_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_courses_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          id: number
          type: Database["public"]["Enums"]["carts_status_enum"]
          user_id: string
        }
        Insert: {
          id?: number
          type: Database["public"]["Enums"]["carts_status_enum"]
          user_id: string
        }
        Update: {
          id?: number
          type?: Database["public"]["Enums"]["carts_status_enum"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      course_instructors: {
        Row: {
          course_id: number
          user_id: string
        }
        Insert: {
          course_id: number
          user_id: string
        }
        Update: {
          course_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_instructors_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructors_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructors_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructors_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          body: string
          course_id: number
          created_at: string | null
          id: number
          rating: number
          user_id: string
        }
        Insert: {
          body: string
          course_id: number
          created_at?: string | null
          id?: number
          rating: number
          user_id: string
        }
        Update: {
          body?: string
          course_id?: number
          created_at?: string | null
          id?: number
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_section_contents: {
        Row: {
          created_at: string | null
          id: number
          order_index: number
          resources: Json | null
          section_id: number
          title: string
          type: Database["public"]["Enums"]["course_section_contents_type_enum"]
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          order_index: number
          resources?: Json | null
          section_id: number
          title: string
          type: Database["public"]["Enums"]["course_section_contents_type_enum"]
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          order_index?: number
          resources?: Json | null
          section_id?: number
          title?: string
          type?: Database["public"]["Enums"]["course_section_contents_type_enum"]
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_section_contents_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sections: {
        Row: {
          course_id: number
          created_at: string | null
          id: number
          order_index: number
          title: string
        }
        Insert: {
          course_id: number
          created_at?: string | null
          id?: number
          order_index: number
          title: string
        }
        Update: {
          course_id?: number
          created_at?: string | null
          id?: number
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
        ]
      }
      course_tags: {
        Row: {
          course_id: number
          tag_id: number
        }
        Insert: {
          course_id: number
          tag_id: number
        }
        Update: {
          course_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      course_topics: {
        Row: {
          course_id: number
          topic_id: number
        }
        Insert: {
          course_id: number
          topic_id: number
        }
        Update: {
          course_id?: number
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          avg_rating: number
          category: number
          created_at: string | null
          enrollments_count: number
          id: number
          image: string | null
          instructor_progress: number
          language: Database["public"]["Enums"]["language_enum"] | null
          level: Database["public"]["Enums"]["course_level_enum"]
          meta_data: Json | null
          review_count: number
          short_description: string | null
          status: Database["public"]["Enums"]["course_status_enum"]
          sub_category: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          avg_rating?: number
          category: number
          created_at?: string | null
          enrollments_count?: number
          id?: number
          image?: string | null
          instructor_progress?: number
          language?: Database["public"]["Enums"]["language_enum"] | null
          level?: Database["public"]["Enums"]["course_level_enum"]
          meta_data?: Json | null
          review_count?: number
          short_description?: string | null
          status?: Database["public"]["Enums"]["course_status_enum"]
          sub_category?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          avg_rating?: number
          category?: number
          created_at?: string | null
          enrollments_count?: number
          id?: number
          image?: string | null
          instructor_progress?: number
          language?: Database["public"]["Enums"]["language_enum"] | null
          level?: Database["public"]["Enums"]["course_level_enum"]
          meta_data?: Json | null
          review_count?: number
          short_description?: string | null
          status?: Database["public"]["Enums"]["course_status_enum"]
          sub_category?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_categories_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_sub_categories_fkey"
            columns: ["sub_category"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          course_id: number
          created_at: string | null
          user_id: string
        }
        Insert: {
          course_id: number
          created_at?: string | null
          user_id: string
        }
        Update: {
          course_id?: number
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_sessions: {
        Row: {
          cart_id: number
          created_at: string | null
          id: number
          status: Database["public"]["Enums"]["payment_sessions_status_enum"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cart_id: number
          created_at?: string | null
          id?: number
          status: Database["public"]["Enums"]["payment_sessions_status_enum"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cart_id?: number
          created_at?: string | null
          id?: number
          status?: Database["public"]["Enums"]["payment_sessions_status_enum"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_sessions_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: number
          payment_sessions_id: number
          status: Database["public"]["Enums"]["payments_status_enum"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: number
          payment_sessions_id: number
          status: Database["public"]["Enums"]["payments_status_enum"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: number
          payment_sessions_id?: number
          status?: Database["public"]["Enums"]["payments_status_enum"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_payment_sessions_id_fkey"
            columns: ["payment_sessions_id"]
            isOneToOne: false
            referencedRelation: "payment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          amount: number | null
          course_id: number
          currency: string | null
          end_date: string | null
          id: number
          is_promotional: boolean | null
          start_date: string | null
        }
        Insert: {
          amount?: number | null
          course_id: number
          currency?: string | null
          end_date?: string | null
          id?: number
          is_promotional?: boolean | null
          start_date?: string | null
        }
        Update: {
          amount?: number | null
          course_id?: number
          currency?: string | null
          end_date?: string | null
          id?: number
          is_promotional?: boolean | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prices_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_lg"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prices_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_md"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prices_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses_sm"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_categories: {
        Row: {
          category_id: number
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          category_id: number
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          category_id?: number
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_categories_categories_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      topics: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          account_type: string
          avatar: string | null
          first_name: string | null
          last_name: string | null
          user_id: string
          username: string
        }
        Insert: {
          account_type?: string
          avatar?: string | null
          first_name?: string | null
          last_name?: string | null
          user_id: string
          username: string
        }
        Update: {
          account_type?: string
          avatar?: string | null
          first_name?: string | null
          last_name?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      courses_lg: {
        Row: {
          amount: number | null
          avg_rating: number | null
          category: string | null
          created_at: string | null
          enrollments_count: number | null
          id: number | null
          image: string | null
          instructor: Json | null
          language: Database["public"]["Enums"]["language_enum"] | null
          level: Database["public"]["Enums"]["course_level_enum"] | null
          meta_data: Json | null
          review_count: number | null
          short_description: string | null
          sub_category: string | null
          tag: Json | null
          title: string | null
          topic: Json | null
        }
        Relationships: []
      }
      courses_md: {
        Row: {
          amount: number | null
          avg_rating: number | null
          category: string | null
          created_at: string | null
          enrollments_count: number | null
          id: number | null
          image: string | null
          instructor: Json | null
          language: Database["public"]["Enums"]["language_enum"] | null
          level: Database["public"]["Enums"]["course_level_enum"] | null
          review_count: number | null
          short_description: string | null
          sub_category: string | null
          tag: Json | null
          title: string | null
          topic: Json | null
        }
        Relationships: []
      }
      courses_sm: {
        Row: {
          avg_rating: number | null
          category: string | null
          id: number | null
          language: Database["public"]["Enums"]["language_enum"] | null
          level: Database["public"]["Enums"]["course_level_enum"] | null
          short_description: string | null
          sub_category: string | null
          title: string | null
          topic: Json | null
        }
        Relationships: []
      }
      sub_categories_topics: {
        Row: {
          course_count: number | null
          name: string | null
          topic: string | null
        }
        Relationships: []
      }
      topic_main_and_sub_categories: {
        Row: {
          categories: Json | null
          name: string | null
          sub_categories: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_new_course: {
        Args: {
          user_id: string
          title: string
          category_id: number
        }
        Returns: undefined
      }
      create_user: {
        Args: {
          user_id: string
          username: string
          email: string
          password: string
          avatar: string
          first_name: string
          last_name: string
          account_type: string
        }
        Returns: undefined
      }
      get_categories_filters: {
        Args: {
          categories: string[]
          sub_categories: string[]
          topics: string[]
          levels: Database["public"]["Enums"]["course_level_enum"][]
          rating: number
          languages: Database["public"]["Enums"]["language_enum"][]
          price: Database["public"]["Enums"]["course_access_enum"][]
        }
        Returns: Json
      }
      get_courses_list: {
        Args: {
          q: string
          categories: string[]
          sub_categories: string[]
          topics: string[]
          levels: Database["public"]["Enums"]["course_level_enum"][]
          rating: number
          languages: Database["public"]["Enums"]["language_enum"][]
          price: Database["public"]["Enums"]["course_access_enum"][]
          sort: string
          page_size: number
          p: number
        }
        Returns: {
          id: number
          image: string
          title: string
          short_description: string
          enrollments_count: number
          instructors: Json
          tags: Json
          is_paid: Database["public"]["Enums"]["course_access_enum"]
          avg_rating: number
          review_count: number
          level: Database["public"]["Enums"]["course_level_enum"]
          amount: number
        }[]
      }
      get_text_search_filters: {
        Args: {
          q: string
          topics: string[]
          levels: Database["public"]["Enums"]["course_level_enum"][]
          rating: number
          languages: Database["public"]["Enums"]["language_enum"][]
          price: Database["public"]["Enums"]["course_access_enum"][]
        }
        Returns: Json
      }
      get_user_courses: {
        Args: {
          u_id: string
          query: string
          sort: string
          page_size: number
        }
        Returns: {
          id: number
          image: string
          status: Database["public"]["Enums"]["course_status_enum"]
          title: string
          instructor_progress: number
        }[]
      }
    }
    Enums: {
      carts_status_enum:
        | "ACTIVE"
        | "PENDING"
        | "CHECKED_OUT"
        | "CANCELED"
        | "FAILED"
        | "ABANDONED"
      course_access_enum: "PAID" | "FREE"
      course_level_enum: "ALL_LEVELS" | "BEGINNER" | "INTERMEDIATE" | "EXPERT"
      course_section_contents_type_enum: "VIDEO" | "DOCUMENT" | "QUIZ"
      course_status_enum: "DRAFT" | "PUBLISHED"
      language_enum:
        | "English"
        | "Hindi"
        | "Sanskrit"
        | "Spanish"
        | "French"
        | "German"
        | "Italian"
        | "Japanese"
        | "Chinese"
        | "Russian"
        | "Other"
      payment_sessions_status_enum:
        | "PENDING"
        | "COMPLETED"
        | "FAILED"
        | "CANCELED"
      payments_status_enum: "PENDING" | "COMPLETED" | "FAILED" | "CANCELED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
