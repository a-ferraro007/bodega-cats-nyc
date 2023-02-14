export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Cat_Properties: {
        Row: {
          created_at: string | null
          id: number
          image: string | null
          locality: string | null
          name: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image?: string | null
          locality?: string | null
          name?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image?: string | null
          locality?: string | null
          name?: string | null
          rating?: number | null
        }
      }
      MapBox_Feature: {
        Row: {
          address: string | null
          cat_id: number | null
          created_at: string | null
          feature_id: string
          geo_json: Json
          id: number
          locality: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          cat_id?: number | null
          created_at?: string | null
          feature_id: string
          geo_json: Json
          id?: number
          locality?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          cat_id?: number | null
          created_at?: string | null
          feature_id?: string
          geo_json?: Json
          id?: number
          locality?: string | null
          user_id?: string
        }
      }
      profiles: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
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
