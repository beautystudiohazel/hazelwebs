---
name: Astro workflow lifecycle
description: Why the managed development workflow must suppress Astro's automatic background mode.
---

Keep Astro's development server in the foreground when running in a Replit workflow.

**Why:** Astro 7 detects an agent environment and automatically detaches its server. The workflow then exits and its child server is terminated, even though startup output claims it is running.

**How to apply:** Check the installed CLI's foreground options when upgrading Astro. In the imported version, `--ignore-lock` disables inferred background mode. Do not run a second detached server beside the managed workflow.
