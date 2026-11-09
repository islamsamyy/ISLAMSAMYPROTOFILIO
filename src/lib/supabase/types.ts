export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          username: string;
          email: string;
          full_name: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          email: string;
          full_name?: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          full_name?: string;
          role?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          client: string;
          company_logo: string;
          category: 'Distributed Systems' | 'Lakehouse & BI' | 'AI & Machine Learning' | 'Cloud Native';
          role: string;
          impact_metric: string;
          metrics: { label: string; value: string }[];
          tech_stack: string[];
          summary: string;
          architecture_highlights: string[];
          live_demo_url: string | null;
          featured: boolean;
          challenge: string | null;
          solution: string | null;
          key_decisions: { title: string; rationale: string; tradeOff: string }[];
          system_flow: string[];
          outcome_metrics: { label: string; value: string; description: string }[];
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          client: string;
          company_logo?: string;
          category: 'Distributed Systems' | 'Lakehouse & BI' | 'AI & Machine Learning' | 'Cloud Native';
          role: string;
          impact_metric: string;
          metrics?: { label: string; value: string }[];
          tech_stack?: string[];
          summary: string;
          architecture_highlights?: string[];
          live_demo_url?: string | null;
          featured?: boolean;
          challenge?: string | null;
          solution?: string | null;
          key_decisions?: { title: string; rationale: string; tradeOff: string }[];
          system_flow?: string[];
          outcome_metrics?: { label: string; value: string; description: string }[];
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      packages: {
        Row: {
          id: string;
          name: string;
          badge: string;
          headline: string;
          price: string;
          frequency: string;
          duration: string;
          deliverables: string[];
          is_popular: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          badge: string;
          headline: string;
          price: string;
          frequency: string;
          duration: string;
          deliverables?: string[];
          is_popular?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['packages']['Insert']>;
      };
      consultation_rates: {
        Row: {
          id: string;
          hourly_rate: string;
          session_30_min: string;
          session_60_min: string;
          available_days: string[];
          available_slots: string[];
          available_timezones: string[];
          updated_at: string;
        };
        Insert: {
          id?: string;
          hourly_rate?: string;
          session_30_min?: string;
          session_60_min?: string;
          available_days?: string[];
          available_slots?: string[];
          available_timezones?: string[];
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['consultation_rates']['Insert']>;
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: 'Architecture' | 'Data Engineering' | 'Machine Learning' | 'Performance';
          read_time: string;
          date: string;
          author: string;
          excerpt: string;
          content: string;
          tags: string[];
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          slug: string;
          title: string;
          category: 'Architecture' | 'Data Engineering' | 'Machine Learning' | 'Performance';
          read_time: string;
          date: string;
          author?: string;
          excerpt: string;
          content: string;
          tags?: string[];
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      reviews: {
        Row: {
          id: string;
          client_name: string;
          client_title: string;
          company_name: string;
          company_logo: string;
          rating: number;
          project_tag: string;
          quote: string;
          date: string;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_title: string;
          company_name: string;
          company_logo?: string;
          rating: number;
          project_tag: string;
          quote: string;
          date?: string;
          featured?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
      reservations: {
        Row: {
          id: string;
          type: 'package' | 'consultation';
          package_id: string | null;
          client_name: string;
          client_email: string;
          company: string;
          item_name: string;
          scheduled_date: string;
          scheduled_time: string;
          timezone: string;
          amount: string;
          status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          notes: string;
          meet_link: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: 'package' | 'consultation';
          package_id?: string | null;
          client_name: string;
          client_email: string;
          company?: string;
          item_name: string;
          scheduled_date: string;
          scheduled_time: string;
          timezone: string;
          amount: string;
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled';
          notes?: string;
          meet_link?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['reservations']['Insert']>;
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issuer_logo: string;
          issue_date: string;
          credential_id: string;
          verification_url: string;
          category: string;
          status: string;
          skills: string[];
          description: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          issuer_logo?: string;
          issue_date: string;
          credential_id?: string;
          verification_url?: string;
          category: string;
          status?: string;
          skills?: string[];
          description?: string;
          display_order?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>;
      };
      experiences: {
        Row: {
          id: string;
          role: string;
          company: string;
          location: string;
          period: string;
          current: boolean;
          type: string;
          summary: string;
          highlights: string[];
          metrics: { label: string; value: string }[];
          technologies: string[];
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          role: string;
          company: string;
          location: string;
          period: string;
          current?: boolean;
          type: string;
          summary: string;
          highlights?: string[];
          metrics?: { label: string; value: string }[];
          technologies?: string[];
          display_order?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['experiences']['Insert']>;
      };
      crm_leads: {
        Row: {
          id: string;
          client_name: string;
          contact_name: string;
          company: string;
          email: string;
          phone: string;
          stage: 'new' | 'discovery' | 'proposal' | 'active' | 'retained' | 'closed';
          engagement_type: string;
          deal_value: number;
          priority: 'high' | 'medium' | 'low';
          source: string;
          requirements: string;
          notes: string;
          tech_interests: string[];
          next_follow_up: string;
          last_contacted: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          contact_name?: string;
          company: string;
          email: string;
          phone?: string;
          stage?: 'new' | 'discovery' | 'proposal' | 'active' | 'retained' | 'closed';
          engagement_type: string;
          deal_value?: number;
          priority?: 'high' | 'medium' | 'low';
          source?: string;
          requirements?: string;
          notes?: string;
          tech_interests?: string[];
          next_follow_up?: string;
          last_contacted?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['crm_leads']['Insert']>;
      };
      crm_activities: {
        Row: {
          id: string;
          lead_id: string;
          date: string;
          type: string;
          summary: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          date: string;
          type: string;
          summary: string;
          content?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['crm_activities']['Insert']>;
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string;
          focus: string;
          message: string;
          status: string;
          crm_lead_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string;
          focus: string;
          message: string;
          status?: string;
          crm_lead_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contact_inquiries']['Insert']>;
      };
    };
  };
}
