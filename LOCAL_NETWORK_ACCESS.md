# Access Thermomix Friends from Other Devices on Local Network

## Quick Setup

### 1. Find Your Local IP Address

**Mac (Terminal):**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows (Command Prompt):**
```cmd
ipconfig
```
Look for "IPv4 Address" under your active network adapter.

**Linux:**
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

Your local IP will typically look like:
- `192.168.1.xxx`
- `192.168.0.xxx`
- `10.0.0.xxx`

### 2. Update Your Backend CORS Settings

The backend needs to accept requests from other devices. Update the CORS configuration:

**Edit: backend/src/server.ts**

Change from:
```typescript
app.use(cors());
```

To:
```typescript
app.use(cors({
  origin: true, // Allows all origins in development
  credentials: true
}));
```

Or for more security, specify allowed origins:
```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    `http://${YOUR_LOCAL_IP}:3000`,
    `http://${YOUR_LOCAL_IP}:3001`
  ],
  credentials: true
}));
```

### 3. Update Frontend API Calls

The frontend needs to know where to find the backend. Currently it's hardcoded to localhost.

**Create: .env.local** in the root directory:
```
REACT_APP_API_URL=http://YOUR_LOCAL_IP:3001
```

**Update: src/store/consultantsSlice.ts**

Change from:
```typescript
const response = await fetch('http://localhost:3001/api/consultants');
```

To:
```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const response = await fetch(`${API_URL}/api/consultants`);
```

### 4. Configure Firewall (if needed)

**Mac:**
- System Preferences → Security & Privacy → Firewall
- Click "Firewall Options"
- Ensure Node.js is allowed

**Windows:**
- Windows Defender Firewall → Allow an app
- Add Node.js if not listed
- Check both Private and Public networks

**Linux:**
```bash
# Allow ports 3000 and 3001
sudo ufw allow 3000
sudo ufw allow 3001
```

### 5. Start Both Servers

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
# In main directory
npm start
```

### 6. Access from Other Devices

On any device connected to the same network, open a browser and go to:

```
http://YOUR_LOCAL_IP:3000
```

For example:
- `http://192.168.1.100:3000`
- `http://10.0.0.50:3000`

## Testing on Different Devices

### 📱 Mobile Phones
1. Connect phone to same WiFi network
2. Open browser
3. Type: `http://YOUR_LOCAL_IP:3000`
4. Bookmark for easy access

### 📲 Tablets
- Same as mobile phones
- Test both portrait and landscape

### 💻 Other Computers
- Ensure on same network
- Use the IP address URL

## Troubleshooting

### Can't Connect?

1. **Check IP Address:**
   ```bash
   # Verify your IP hasn't changed
   ifconfig | grep "inet "
   ```

2. **Check if Services are Running:**
   ```bash
   # Check if ports are listening
   lsof -i :3000
   lsof -i :3001
   ```

3. **Firewall Issues:**
   - Temporarily disable firewall to test
   - If it works, add permanent firewall rules

4. **Network Issues:**
   - Ensure all devices on same network
   - Check router doesn't block local connections
   - Some corporate/guest networks block device-to-device

5. **React Development Server:**
   The React dev server might need HOST environment variable:
   ```bash
   HOST=0.0.0.0 npm start
   ```
   Or in package.json:
   ```json
   "scripts": {
     "start": "HOST=0.0.0.0 react-scripts start"
   }
   ```

## Security Considerations

⚠️ **Development Only:** This setup is for development/testing only!

For production:
- Use proper SSL/HTTPS
- Configure strict CORS policies
- Use environment-specific configurations
- Set up proper authentication
- Use a reverse proxy (nginx/Apache)

## Quick Reference

### Your Network Details (Fill in after finding):
```
Local IP: _________________
Backend URL: http://_________________:3001
Frontend URL: http://_________________:3000
```

### Common Local IPs by Router:
- Linksys/Cisco: 192.168.1.x
- Netgear/D-Link: 192.168.0.x
- Apple: 10.0.1.x
- Some ISPs: 10.0.0.x

## Advanced: Using ngrok (Internet Access)

If you need to share with someone outside your network:

1. **Install ngrok:**
   ```bash
   brew install ngrok  # Mac
   # Or download from https://ngrok.com
   ```

2. **Expose Frontend:**
   ```bash
   ngrok http 3000
   ```

3. **Expose Backend (in another terminal):**
   ```bash
   ngrok http 3001
   ```

4. **Update API URLs** to use ngrok URLs

This gives you public URLs like:
- `https://abc123.ngrok.io` → Frontend
- `https://xyz789.ngrok.io` → Backend

## Quick Test Checklist

- [ ] Found local IP address
- [ ] Updated backend CORS settings
- [ ] Updated frontend API URL
- [ ] Restarted both servers
- [ ] Tested on phone browser
- [ ] Tested on tablet
- [ ] Tested on another computer
- [ ] All features working (map, popups, data loading)

---

**Note:** When you're done testing, remember to:
1. Revert CORS settings if needed for security
2. Change API URLs back to localhost if desired
3. Re-enable firewall if disabled