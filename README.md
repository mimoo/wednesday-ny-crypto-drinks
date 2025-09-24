# Wednesday NY Crypto Drinks

A unique landing page for Wednesday NY Crypto Drinks meetup focused on Advanced Cryptography in Blockchains.

## Features

- **Beautiful Landing Page**: Modern gradient design with space for a hero image
- **Calendar Subscription**: Automatic webcal link generation for easy calendar integration
- **ICS Generator**: Script to generate calendar files from YAML configuration
- **No Location Privacy**: Events have no location details for privacy (shared via group chat)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate the calendar file**:
   ```bash
   npm run generate
   ```

3. **Serve the website locally**:
   ```bash
   npm run serve
   ```
   Visit http://localhost:8000

## Adding Events

Edit the `events.yml` file to add or modify events:

```yaml
events:
  - date: 2025-01-08
    startTime: "18:00"
    endTime: "21:00"
    title: "Wednesday NY Crypto Drinks"
    topic: "Zero-Knowledge Proofs"
    description: |
      Advanced Cryptography in Blockchains - Weekly Meetup

      Topic: Zero-Knowledge Proofs and their applications

      Location: Private (shared via group chat)

      To join the group chat, DM @cryptodavidw on Twitter
```

After editing, run `npm run generate` to update the `events.ics` file.

## File Structure

- `index.html` - Landing page
- `events.yml` - Event configuration
- `generate-ics.js` - ICS generator script
- `events.ics` - Generated calendar file
- `package.json` - Dependencies and scripts

## Deployment

### Option 1: GitHub Pages (Recommended)

This project includes GitHub Actions for automatic deployment to GitHub Pages:

1. **Fork or create this repository on GitHub**
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"
3. **Push changes to main branch** - the site will auto-deploy via GitHub Actions
4. **Your site will be available at**: `https://yourusername.github.io/wednesday-ny-crypto-drinks`

### Option 2: Manual Deployment

1. Generate the ICS file: `npm run generate`
2. Upload all files to your web server
3. Ensure the webcal URL in the HTML points to your domain

### Using the Makefile

For easier management, use the included Makefile:

```bash
# Install dependencies and generate calendar
make setup

# Generate ICS file
make generate

# Serve locally for testing
make serve

# Clean generated files
make clean

# Deploy (runs setup and shows deployment info)
make deploy
```

## Features

- **Responsive Design**: Works on desktop and mobile
- **Copy to Clipboard**: One-click URL copying
- **Timezone Support**: New York timezone with DST handling
- **Reminders**: 30-minute advance notifications
- **Privacy First**: No location details in calendar events

## Contact

For group chat access, DM [@cryptodavidw](https://twitter.com/cryptodavidw) on Twitter.