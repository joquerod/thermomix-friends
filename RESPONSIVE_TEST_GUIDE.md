# Responsive Design Testing Guide

## How to Test with Browser Developer Tools

### Chrome/Edge Developer Tools
1. **Open the app:** Navigate to http://localhost:3000
2. **Open DevTools:** Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
3. **Toggle Device Mode:** Click the device icon 📱 or press `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows)
4. **Select Device:** Choose from the device dropdown menu at the top

### Firefox Developer Tools
1. **Open the app:** Navigate to http://localhost:3000
2. **Open DevTools:** Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
3. **Responsive Mode:** Press `Cmd+Option+M` (Mac) / `Ctrl+Shift+M` (Windows)
4. **Select Device:** Choose from the device list or set custom dimensions

### Safari Developer Tools
1. **Enable Developer Menu:** Safari → Preferences → Advanced → Show Develop menu
2. **Open the app:** Navigate to http://localhost:3000
3. **Enter Responsive Mode:** Develop → Enter Responsive Design Mode
4. **Select Device:** Choose from the device options

## Recommended Test Devices

### Mobile Devices (Test these first)
| Device | Resolution | What to Check |
|--------|------------|---------------|
| iPhone SE | 375x667 | Smallest common phone, header text scaling |
| iPhone 12 Pro | 390x844 | Standard modern iPhone, map height |
| Samsung Galaxy S20 | 360x800 | Android phone, touch targets |
| iPhone 14 Pro Max | 430x932 | Large phone, popup readability |

### Tablets
| Device | Resolution | What to Check |
|--------|------------|---------------|
| iPad Mini | 768x1024 | Small tablet, transition point |
| iPad Air | 820x1180 | Standard iPad, map controls |
| iPad Pro 12.9" | 1024x1366 | Large tablet, desktop-like experience |

### Desktop
| Resolution | What to Check |
|------------|---------------|
| 1280x720 | Small laptop, centered layout |
| 1920x1080 | Standard desktop, max-width container |
| 2560x1440 | Large monitor, content centering |

## What to Test on Each Device

### Mobile Testing Checklist
- [ ] **Header:** Text scales appropriately with clamp()
- [ ] **Map Height:** Takes up most of screen (calc(100vh - 120px))
- [ ] **Zoom Controls:** Hidden on mobile for cleaner interface
- [ ] **Initial Zoom:** Set to 3 for better country overview
- [ ] **Popups:** Larger text (15-18px), wider width (250-300px)
- [ ] **Touch Targets:** Zoom buttons are 36x36px (if visible)
- [ ] **Scrolling:** No horizontal scroll, smooth vertical
- [ ] **Pin Interaction:** Easy to tap pins

### Tablet Testing Checklist
- [ ] **Layout:** Balanced between mobile and desktop
- [ ] **Map Controls:** Standard sizing
- [ ] **Popups:** Appropriate text size
- [ ] **Performance:** Smooth interaction

### Desktop Testing Checklist
- [ ] **Container:** Max-width 1200px, centered
- [ ] **Map Height:** Fixed 600px
- [ ] **Zoom Controls:** Fully visible and functional
- [ ] **Popups:** Standard sizing (200-350px width)
- [ ] **White Space:** Proper padding on large screens

## Quick Test Sequence

1. **Start at Mobile (375px)**
   - Check header readability
   - Tap a pin and check popup
   - Verify map fills screen

2. **Slowly increase width**
   - Watch for text scaling
   - Check when zoom controls appear
   - Monitor layout changes

3. **Hit breakpoint at 768px**
   - Verify tablet layout kicks in
   - Check all controls work

4. **Continue to 1025px**
   - Verify desktop layout
   - Check max-width container
   - Ensure centered layout

5. **Test at 1920px**
   - Verify content doesn't stretch too wide
   - Check padding and margins

## Common Issues to Watch For

### Mobile
- Text too small to read
- Buttons too small to tap
- Map controls overlapping content
- Popups extending off screen

### Tablet
- Awkward in-between sizing
- Controls not properly scaled

### Desktop
- Content too wide on large screens
- Unnecessary scrolling
- Too much white space

## Browser-Specific Testing

### Test in Multiple Browsers
- Chrome/Chromium
- Firefox
- Safari (Mac only)
- Edge

### Check for:
- CSS compatibility
- Touch event handling
- Map rendering differences
- Font rendering

## Performance Testing

### Mobile Performance
- Check load time on throttled connection (DevTools Network tab)
- Verify smooth pan/zoom on map
- Test with many pins visible

### Memory Usage
- Open DevTools Performance tab
- Record interaction with map
- Check for memory leaks with repeated popup opens

## Accessibility Quick Check
- Can you navigate with keyboard only?
- Do popups have proper contrast?
- Is text readable at all sizes?
- Are touch targets at least 44x44px?

---

## Quick Commands for Testing

### Simulate Different Connections (Chrome DevTools)
1. Network tab → Throttling dropdown
2. Choose "Slow 3G" or "Fast 3G"
3. Reload page and test performance

### Take Screenshots (Chrome DevTools)
1. Cmd+Shift+P (Mac) / Ctrl+Shift+P (Windows)
2. Type "screenshot"
3. Choose "Capture full size screenshot"

### Test Orientation Changes
1. In device mode, click the rotate icon
2. Test both portrait and landscape
3. Verify map adjusts properly

---

**Remember:** Real device testing is always best, but DevTools gives you a good approximation!