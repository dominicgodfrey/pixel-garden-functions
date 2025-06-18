// supabase/functions/delete_old_dead_flowers/index.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(req, res) {
  const { error } = await supabase
    .from('flowers')
    .delete()
    .eq('is_dead', true)
    .lt('placed_at', new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString());

  if (error) {
    return res.status(500).json({ message: 'Error deleting old dead flowers' });
  }

  return res.status(200).json({ message: 'Old dead flowers deleted' });
}
