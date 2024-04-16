import "dotenv/config";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { Database } from "./database-generated.types";

export const client = createClient<Database>(
  z.string().parse(process.env.SUPABASE_URL),
  z.string().parse(process.env.SUPABASE_ANON_KEY)
);
