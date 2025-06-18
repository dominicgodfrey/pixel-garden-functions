// supabase/functions/mark_dead_flowers/index.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(req, res) {
  const { error } = await supabase
    .from('flowers')
    .update({ is_dead: true })
    .lt('last_watered', new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString());

  if (error) {
    return res.status(500).json({ message: 'Error marking dead flowers' });
  }

  return res.status(200).json({ message: 'Dead flowers marked' });
}
