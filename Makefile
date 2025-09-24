.PHONY: help setup generate serve clean deploy test

# Default target
help:
	@echo "Wednesday NY Crypto Drinks - Available commands:"
	@echo ""
	@echo "  make setup    - Install dependencies and generate initial calendar"
	@echo "  make generate - Generate ICS calendar file from events.yml"
	@echo "  make serve    - Start local development server on port 8000"
	@echo "  make clean    - Remove generated files"
	@echo "  make deploy   - Prepare for deployment (setup + info)"
	@echo "  make test     - Validate generated ICS file"
	@echo "  make help     - Show this help message"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@npm install

# Generate ICS file
generate:
	@echo "📅 Generating calendar file from events.yml..."
	@npm run generate

# Setup: install and generate
setup: install generate
	@echo "✅ Setup complete!"
	@echo "   - Dependencies installed"
	@echo "   - Calendar file generated"
	@echo "   - Ready to serve or deploy"

# Start local server
serve:
	@echo "🌐 Starting local server at http://localhost:8000"
	@echo "   Press Ctrl+C to stop"
	@npm run serve

# Clean generated files
clean:
	@echo "🧹 Cleaning generated files..."
	@rm -f events.ics
	@echo "   - events.ics removed"

# Test the generated ICS file
test: generate
	@echo "🧪 Testing generated ICS file..."
	@if [ -f "events.ics" ]; then \
		echo "   ✅ events.ics exists"; \
		echo "   📊 File size: $$(wc -c < events.ics) bytes"; \
		echo "   📅 Events count: $$(grep -c "BEGIN:VEVENT" events.ics)"; \
	else \
		echo "   ❌ events.ics not found"; \
		exit 1; \
	fi

# Prepare for deployment
deploy: setup test
	@echo ""
	@echo "🚀 Ready for deployment!"
	@echo ""
	@echo "GitHub Pages deployment:"
	@echo "   1. Push to GitHub repository"
	@echo "   2. Enable GitHub Pages in repository settings"
	@echo "   3. Set source to 'GitHub Actions'"
	@echo "   4. Site will be available at: https://[username].github.io/[repo-name]"
	@echo ""
	@echo "Manual deployment:"
	@echo "   1. Upload these files to your web server:"
	@echo "      - index.html"
	@echo "      - events.ics"
	@echo "      - meetup.png"
	@echo "   2. Update webcal URL in index.html if needed"
	@echo ""
	@echo "Local testing:"
	@echo "   Run 'make serve' to test locally"

# Add new event (interactive)
add-event:
	@echo "📝 Adding new event to events.yml..."
	@echo "   (You'll need to edit events.yml manually)"
	@echo "   After editing, run 'make generate' to update the calendar"
	@${EDITOR:-nano} events.yml

# Quick dev cycle: generate and serve
dev: generate
	@echo "🔄 Development mode: generating and serving..."
	@npm run serve