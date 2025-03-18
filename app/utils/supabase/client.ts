import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '../types/database.types'
import type { TypedSupabaseClient } from '../types/types'
import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

function createClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}

function useSupabaseBrowserClient() {
  return useMemo(createClient, [])
}

export default useSupabaseBrowserClient