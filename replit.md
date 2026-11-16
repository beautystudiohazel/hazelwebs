# Hazel Beauty Studio

## Run locally in Replit

- Existing Astro static website; keep its current structure and npm stack.
- Use the **Start application** workflow (`npm run dev`). Astro listens on
  `0.0.0.0:5000` and allows Replit's preview host.
- The dev command uses `--ignore-lock` to keep Astro 7 in the foreground under
  the managed workflow, rather than automatically detaching when an agent is detected.
- Node 22.12+ is required; this workspace uses Node 24.
- No database, authentication, runtime secrets, or backend is needed.
- Production output: `npm run build` creates `dist/`.
- Checks: `npm run check`, then `npm run build && npm test`.
- The imported `node_modules` was built on macOS. Reinstall dependencies for
  Linux if restoring directly from the original ZIP; do not reuse its native binaries.

## Content safeguards

- Public business details and all 30 services/prices live in `src/data/config.ts`.
  Preserve them unless the owner provides corrections.
- Appointment links use the configured Booksy destination. Event inquiries use email.
- Do not invent testimonials, credentials, service results, or business claims.
- Keep editorial photos identified as such. Do not enable the real-work photo
  until the owner confirms client permission.

## Original import

- `zipFile.zip` is the original uploaded archive and is preserved with Git LFS
  at the user's request. Keep large-file versioning enabled for it.
- Test screenshots and other generated checks belong in `generated-artifacts/`,
  which is excluded from saved versions and publishing.
