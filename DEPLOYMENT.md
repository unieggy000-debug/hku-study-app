# Free demo deployment path

## Target architecture

```text
GitHub Pages (HTML/CSS/JS)
        |
        | Supabase anon key + user JWT
        v
Supabase Auth + Postgres + private Storage
        |
        v
Edge Function / parser worker -> structured study cards
```

GitHub Pages hosts the public static interface. Supabase owns authentication, user-scoped rows, private uploads and the later parsing queue. The current localStorage behavior remains as a fallback until a Supabase project is connected.

## Why username-only is acceptable for this demo

The interface can show only username and password. Internally, the demo can use a deterministic placeholder identity for Supabase Auth and disable email confirmation. This avoids asking for email now, but it means password recovery is not available until a recovery channel is added. Do not reuse an important password on this demo.

## Data isolation rules

- Every row contains `user_id`.
- Every storage path starts with the authenticated user UUID.
- Every exposed table and storage object uses Row Level Security.
- The service-role key is server-only.
- AI parsing runs after authentication and writes results under the same user UUID.

## Parsing pipeline

1. Browser validates extension and size.
2. Browser uploads to the user's private folder: `<user_id>/<upload_id>/source.ext`.
3. Database creates a `queued` upload record.
4. A server-side function claims the job and extracts text or audio transcript.
5. AI converts the source into chapters, bilingual concept cards, questions and review links.
6. The user previews the result before it is added to the study app.

## Abuse controls

- Limit upload size, duration and number of files per day.
- Allow only a fixed MIME/extension list.
- Add rate limits to sign-up, login, upload and parse requests.
- Add Turnstile or equivalent bot verification to public forms.
- Do not expose raw uploaded files through public URLs.
- Record parser status and errors; never display server stack traces to users.
- Keep API keys, parser credentials and service-role credentials in server secrets.

## Deployment checklist

1. Create a GitHub repository and connect it to this folder.
2. Create a Supabase free project.
3. Run `supabase/schema.sql`.
4. Copy `supabase-config.example.js` to a local `supabase-config.js` and fill in the project URL and anon key.
5. Connect the authentication and sync adapter.
6. Push the static site to GitHub Pages through the included workflow.
7. Test account isolation with two demo users before enabling uploads.
