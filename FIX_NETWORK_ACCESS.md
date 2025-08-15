# Fix Network Access Issues

## The Problem
The app works on localhost but not on network IP (192.168.0.202:3000)

## Solution 1: macOS Firewall Settings (Most Common Fix)

### Steps:
1. **Open System Settings** (or System Preferences)
2. Go to **Network** → **Firewall** (or **Security & Privacy** → **Firewall**)
3. Click the lock to make changes
4. Either:
   - **Option A:** Turn OFF firewall temporarily to test
   - **Option B:** Click "Options" or "Firewall Options"
     - Look for Node.js in the list
     - If present, ensure "Block incoming connections" is UNCHECKED
     - If not present, click "+" to add: `/usr/local/bin/node` or wherever node is installed
     - Allow incoming connections for Node.js

### After changing firewall:
1. Keep the React server running
2. Try accessing: http://192.168.0.202:3000 from another device

## Solution 2: Use a Different Network Interface

You have two IPs available:
- 192.168.0.202
- 192.168.0.103

Try both:
- http://192.168.0.103:3000
- http://192.168.0.202:3000

## Solution 3: Use ngrok (Works Around Firewall)

### Install ngrok:
```bash
brew install ngrok
```

### In a new terminal:
```bash
ngrok http 3000
```

This will give you a public URL like:
- https://abc123.ngrok.io

Share this URL with any device (even outside your network!)

## Solution 4: Check if Node.js Has Network Permission

### Run this command:
```bash
which node
```

### Then check if it has permissions:
```bash
ls -la $(which node)
```

### If using nvm, the path might be:
```
~/.nvm/versions/node/vXX.XX.X/bin/node
```

## Solution 5: Try Different Port

Sometimes port 3000 is blocked. Try:

### Change React port:
```bash
PORT=8080 HOST=0.0.0.0 npm start
```

Then access: http://192.168.0.202:8080

## Quick Diagnostic Commands

### 1. Check if server is listening correctly:
```bash
netstat -an | grep 3000
```
Should show: `*.3000` or `0.0.0.0:3000`

### 2. Test from same machine:
```bash
curl http://192.168.0.202:3000
```

### 3. Check firewall status:
```bash
sudo pfctl -s info
```

### 4. Check if port is accessible:
```bash
nc -zv 192.168.0.202 3000
```

## If Still Not Working

### Try this sequence:
1. Stop the React server (Ctrl+C)
2. Disable firewall completely (temporarily)
3. Start server with:
   ```bash
   HOST=0.0.0.0 PORT=3000 npm start
   ```
4. From another device on same WiFi, try:
   - http://192.168.0.202:3000
   - If this works, the issue is definitely firewall

### Alternative: Use localhost tunneling
If firewall is restricted by company policy, use:
- **ngrok** (recommended)
- **localtunnel**: `npx localtunnel --port 3000`
- **serveo**: `ssh -R 80:localhost:3000 serveo.net`

## Common Issues

### "Connection Refused"
- Server not running on 0.0.0.0
- Firewall blocking

### "Timeout"
- Wrong IP address
- Not on same network
- Firewall blocking

### "Cannot reach this page"
- Device not on same WiFi
- Using wrong IP

## Verify Network

From the device trying to connect:
1. Make sure on same WiFi network
2. Can you ping the Mac?
   ```
   ping 192.168.0.202
   ```
3. If ping works but browser doesn't = firewall issue

## The Nuclear Option

If nothing else works:

1. **Temporarily disable ALL security:**
   ```bash
   sudo pfctl -d  # Disables packet filter firewall
   ```

2. **Run server:**
   ```bash
   HOST=0.0.0.0 npm start
   ```

3. **Test access**

4. **Re-enable firewall:**
   ```bash
   sudo pfctl -e
   ```

**WARNING:** Only do this for testing!