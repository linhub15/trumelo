export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      room: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          hourly_rate: number | null
          id: string
          max_capacity: number | null
          name: string
          profile_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          max_capacity?: number | null
          name: string
          profile_id?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          hourly_rate?: number | null
          id?: string
          max_capacity?: number | null
          name?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      room_availability: {
        Row: {
          created_at: string
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end: string
          id: string
          room_id: string
          start: string
        }
        Insert: {
          created_at?: string
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          end: string
          id?: string
          room_id: string
          start: string
        }
        Update: {
          created_at?: string
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          end?: string
          id?: string
          room_id?: string
          start?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_availability_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          }
        ]
      }
      room_booking: {
        Row: {
          booked_by_email: string
          booked_by_name: string
          created_at: string
          description: string | null
          end: string
          id: string
          room_id: string
          start: string
          status: Database["public"]["Enums"]["room_booking_status"]
          total_cost: number | null
        }
        Insert: {
          booked_by_email: string
          booked_by_name: string
          created_at?: string
          description?: string | null
          end: string
          id?: string
          room_id: string
          start: string
          status?: Database["public"]["Enums"]["room_booking_status"]
          total_cost?: number | null
        }
        Update: {
          booked_by_email?: string
          booked_by_name?: string
          created_at?: string
          description?: string | null
          end?: string
          id?: string
          room_id?: string
          start?: string
          status?: Database["public"]["Enums"]["room_booking_status"]
          total_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "room_booking_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          }
        ]
      }
      room_photo: {
        Row: {
          created_at: string
          id: string
          path: string
          room_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          room_id: string
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_photo_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "room"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      day_of_week: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
      room_booking_status:
        | "needs_approval"
        | "cancelled"
        | "active"
        | "rejected"
        | "scheduled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

