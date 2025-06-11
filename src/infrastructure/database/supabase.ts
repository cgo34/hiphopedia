import { createClient } from '@supabase/supabase-js'
import { injectable } from 'inversify'

export interface ISupabaseClient {
  from: (table: string) => any
}

@injectable()
export class SupabaseClient implements ISupabaseClient {
  private static instance: SupabaseClient
  private readonly supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_KEY as string
  )

  constructor() {
    console.log('[SupabaseClient] Initializing with URL:', import.meta.env.VITE_SUPABASE_URL)
    
    if (SupabaseClient.instance) {
      return SupabaseClient.instance
    }
    SupabaseClient.instance = this
  }

  from(table: string) {
    console.log('[SupabaseClient] Accessing table:', table)
    return this.supabase.from(table)
  }
}