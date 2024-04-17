export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      collectivite: {
        Row: {
          id: number
          nom: string
        }
        Insert: {
          id?: number
          nom: string
        }
        Update: {
          id?: number
          nom?: string
        }
        Relationships: []
      }
      indicateur_personnalise: {
        Row: {
          collectivite_id: number
          description: string
          id: number
          nom: string
          unite: string | null
        }
        Insert: {
          collectivite_id: number
          description: string
          id?: number
          nom: string
          unite?: string | null
        }
        Update: {
          collectivite_id?: number
          description?: string
          id?: number
          nom?: string
          unite?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "indicateur_personnalise_collectivite_id_fkey"
            columns: ["collectivite_id"]
            isOneToOne: false
            referencedRelation: "collectivite"
            referencedColumns: ["id"]
          },
        ]
      }
      indicateur_personnalise_valeurs: {
        Row: {
          annee: number
          commentaire: string | null
          indicateur_id: number
          objectif: number | null
          resultat: number | null
        }
        Insert: {
          annee: number
          commentaire?: string | null
          indicateur_id: number
          objectif?: number | null
          resultat?: number | null
        }
        Update: {
          annee?: number
          commentaire?: string | null
          indicateur_id?: number
          objectif?: number | null
          resultat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "indicateur_personnalise_valeurs_indicateur_id_fkey"
            columns: ["indicateur_id"]
            isOneToOne: false
            referencedRelation: "indicateur_personnalise"
            referencedColumns: ["id"]
          },
        ]
      }
      indicateur_predefini: {
        Row: {
          description: string
          id: string
          nom: string
          unite: string
        }
        Insert: {
          description: string
          id: string
          nom: string
          unite: string
        }
        Update: {
          description?: string
          id?: string
          nom?: string
          unite?: string
        }
        Relationships: []
      }
      indicateur_predefini_valeurs: {
        Row: {
          annee: number
          collectivite_id: number
          commentaire: string | null
          indicateur_id: string
          objectif: number | null
          resultat: number | null
        }
        Insert: {
          annee: number
          collectivite_id: number
          commentaire?: string | null
          indicateur_id: string
          objectif?: number | null
          resultat?: number | null
        }
        Update: {
          annee?: number
          collectivite_id?: number
          commentaire?: string | null
          indicateur_id?: string
          objectif?: number | null
          resultat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "indicateur_predefini_valeurs_collectivite_id_fkey"
            columns: ["collectivite_id"]
            isOneToOne: false
            referencedRelation: "collectivite"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "indicateur_predefini_valeurs_indicateur_id_fkey"
            columns: ["indicateur_id"]
            isOneToOne: false
            referencedRelation: "indicateur_predefini"
            referencedColumns: ["id"]
          },
        ]
      }
      membre: {
        Row: {
          collectivite_id: number
          user_id: string
        }
        Insert: {
          collectivite_id: number
          user_id: string
        }
        Update: {
          collectivite_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membre_collectivite_id_fkey"
            columns: ["collectivite_id"]
            isOneToOne: false
            referencedRelation: "collectivite"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membre_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      indicateur_par_collectivite: {
        Row: {
          collectivite_id: number | null
          description: string | null
          id: string | null
          nom: string | null
          unite: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_indicateur_valeurs: {
        Args: {
          p_indicateur_id: string
          p_collectivite_id: number
        }
        Returns: {
          indicateur_id: string
          collectivite_id: number
          annee: number
          resultat: number
          objectif: number
          commentaire: string
        }[]
      }
      is_membre: {
        Args: {
          collectivite_id: number
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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

