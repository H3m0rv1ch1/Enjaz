# إنجاز - App Icons

This folder contains the app icons for the إنجاز (Enjaz) application.

## Files

- **icon.svg** - Main app icon (512x512) - Source file for all icons
- **favicon.svg** - Simplified favicon version (32x32) for browser tabs

## Design

The icon features the exact Lucide React Rocket icon from the app header:
- 🚀 Rocket symbol representing progress and achievement
- 🎨 Emerald gradient background (from #059669 to #064e3b) matching the app's brand colors
- ⚪ White rocket icon with clean lines
- 🎯 Centered and properly scaled

## Usage

### In HTML
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/icon/favicon.svg">

<!-- App Icon -->
<link rel="apple-touch-icon" href="/icon/icon.svg">
```

### As Image
```html
<img src="/icon/icon.svg" alt="إنجاز" width="64" height="64">
```

### For Tauri Desktop App

This icon is automatically used for:
- ✅ Windows .exe file icon
- ✅ macOS .app icon
- ✅ Linux app icon
- ✅ MSI installer icon
- ✅ All platform-specific formats

Generated formats in `src-tauri/icons/`:
- icon.ico (Windows)
- icon.icns (macOS)
- Multiple PNG sizes (32x32, 64x64, 128x128, 256x256, 512x512)

## Brand Colors

- Primary Emerald: `#059669`
- Dark Emerald: `#064e3b`
- White: `#FFFFFF` (for the rocket icon)
