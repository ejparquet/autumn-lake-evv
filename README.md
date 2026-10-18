# Autumn Lake EVV

Prototype EVV (Electronic Visit Verification) dashboard and worker app for Autumn Lake Healthcare Services, a Louisiana home health agency. Built as static HTML with sample data — no backend yet; the LaSRS sync, phone calls/SMS, QR scanning and GPS are simulated.

- `index.html` — admin & supervisor dashboard (live visits, corrections, timesheets, hour caps, workers, clients, caseloads, calendar, messaging, reports, LaSRS sync, audit log, settings)
- `worker.html` — mobile app for direct care workers (clock in/out by QR or GPS, service logs, signatures, timesheets, corrections, messages)

## Run locally

```bash
PORT=3100 node serve.mjs
```

Then open http://localhost:3100 (dashboard) or http://localhost:3100/worker.html (worker app).

All names, clients, medications and IDs are fictional sample data.
