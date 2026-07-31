# SERVER.md — Standard Wear House

Commands to start and serve the SWH website.

---

## Development Server (localhost)

```bash
npm run dev
```

Starts the Next.js dev server on **http://localhost:3000** with hot-reload.

---

## Production Build & Start

```bash
npm run build
npm run start
```

Builds a standalone production bundle and starts the server.

---

## View on Phone (Local Network)

To access the dev server from your phone (both devices must be on the same Wi-Fi network):

### 1. Start the dev server on all network interfaces

```bash
npx next dev -H 0.0.0.0 -p 3000
```

### 2. Find your computer's local IP address

**Windows (PowerShell):**
```powershell
(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi").IPAddress
```

**Windows (Command Prompt):**
```cmd
ipconfig | findstr "IPv4"
```

**macOS / Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 3. Open on your phone

On your phone's browser, navigate to:

```
http://<YOUR_LOCAL_IP>:3000
```

For example: `http://192.168.1.42:3000`

> **Note:** Make sure your firewall allows incoming connections on port 3000.

---

## Remote Access (via tunnel)

If your phone is on a different network, use a tunneling tool:

### Using localtunnel (free, no signup)

```bash
npx -y localtunnel --port 3000
```

This gives you a public URL like `https://xyz.loca.lt` that you can open on any device.

### Using ngrok (free tier available)

```bash
npx -y ngrok http 3000
```

This gives you a public URL like `https://abc123.ngrok-free.app`.

---

## Quick Reference

| Task | Command |
|------|---------|
| Dev server (localhost only) | `npm run dev` |
| Dev server (LAN accessible) | `npx next dev -H 0.0.0.0 -p 3000` |
| Production build | `npm run build` |
| Production start | `npm run start` |
| Tunnel (localtunnel) | `npx -y localtunnel --port 3000` |
| Tunnel (ngrok) | `npx -y ngrok http 3000` |
