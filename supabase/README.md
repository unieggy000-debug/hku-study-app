# Supabase deployment plan

This directory contains the free-tier backend starting point for the study app.

## Demo login choice

The UI can ask only for `username` and `password`. Internally, the demo can map the username to a deterministic placeholder login such as `username@demo.local`, while email confirmation stays disabled. The email address is not shown to the user. This is suitable for a private demo, but it does not provide password recovery until a real email or another recovery method is added.

## Setup

1. Create a Supabase project on the free plan.
2. Run `schema.sql` in the SQL Editor.
3. Enable password authentication and disable email confirmation for the demo.
4. Put only the project URL and anon key in the frontend config. Never put the service role key in HTML or JavaScript.
5. Keep uploaded files in the private `course-files` bucket. File paths must begin with the authenticated user's UUID.

## Next integration steps

- Replace localStorage-only review data with a sync adapter for `study_items`.
- Add a username/password screen backed by Supabase Auth.
- Add upload validation and a queued parser endpoint.
- Parse PPT/PDF/TXT/audio on a server-side Edge Function or separate worker, then write structured cards and questions using the authenticated user's ID.
- Add rate limits and bot verification to sign-up, login, upload, and AI parse endpoints.

