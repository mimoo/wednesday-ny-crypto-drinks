const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

function generateUID() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}@wednesday-ny-crypto.com`;
}

function escapeText(text) {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
}

function generateICS(eventsFile) {
    try {
        const fileContents = fs.readFileSync(eventsFile, 'utf8');
        const data = yaml.load(fileContents);

        let icsContent = [];

        icsContent.push('BEGIN:VCALENDAR');
        icsContent.push('VERSION:2.0');
        icsContent.push('PRODID:-//Wednesday NY Crypto Drinks//EN');
        icsContent.push('CALSCALE:GREGORIAN');
        icsContent.push('METHOD:PUBLISH');
        icsContent.push('X-WR-CALNAME:Wednesday NY Crypto Drinks');
        icsContent.push('X-WR-CALDESC:Advanced Cryptography in Blockchains - Weekly Meetup');
        icsContent.push('X-WR-TIMEZONE:America/New_York');
        icsContent.push('REFRESH-INTERVAL;VALUE=DURATION:PT1H');

        icsContent.push('BEGIN:VTIMEZONE');
        icsContent.push('TZID:America/New_York');
        icsContent.push('BEGIN:DAYLIGHT');
        icsContent.push('TZOFFSETFROM:-0500');
        icsContent.push('TZOFFSETTO:-0400');
        icsContent.push('TZNAME:EDT');
        icsContent.push('DTSTART:20230312T020000');
        icsContent.push('RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU');
        icsContent.push('END:DAYLIGHT');
        icsContent.push('BEGIN:STANDARD');
        icsContent.push('TZOFFSETFROM:-0400');
        icsContent.push('TZOFFSETTO:-0500');
        icsContent.push('TZNAME:EST');
        icsContent.push('DTSTART:20231105T020000');
        icsContent.push('RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU');
        icsContent.push('END:STANDARD');
        icsContent.push('END:VTIMEZONE');

        if (data.events && Array.isArray(data.events)) {
            data.events.forEach(event => {
                const eventDate = new Date(event.date);

                const startTime = event.startTime || '18:00';
                const [startHour, startMinute] = startTime.split(':').map(Number);
                eventDate.setHours(startHour, startMinute, 0);

                const endTime = event.endTime || '21:00';
                const endDate = new Date(eventDate);
                const [endHour, endMinute] = endTime.split(':').map(Number);
                endDate.setHours(endHour, endMinute, 0);

                icsContent.push('BEGIN:VEVENT');
                icsContent.push(`UID:${generateUID()}`);
                icsContent.push(`DTSTAMP:${formatDate(new Date())}Z`);
                icsContent.push(`DTSTART;TZID=America/New_York:${formatDate(eventDate)}`);
                icsContent.push(`DTEND;TZID=America/New_York:${formatDate(endDate)}`);

                const title = event.title || 'Wednesday NY Crypto Drinks';
                icsContent.push(`SUMMARY:${escapeText(title)}`);

                const description = event.description ||
                    'Advanced Cryptography in Blockchains - Weekly Meetup\\n\\n' +
                    'Join us for drinks and discussions about the latest in blockchain cryptography.\\n\\n' +
                    'Location: Private (shared via group chat)\\n\\n' +
                    'To join the group chat\\, DM @cryptodavidw on Twitter';
                icsContent.push(`DESCRIPTION:${escapeText(description)}`);

                if (event.topic) {
                    icsContent.push(`CATEGORIES:${escapeText(event.topic)}`);
                }

                icsContent.push('STATUS:CONFIRMED');
                icsContent.push('TRANSP:OPAQUE');

                if (event.reminder !== false) {
                    icsContent.push('BEGIN:VALARM');
                    icsContent.push('ACTION:DISPLAY');
                    icsContent.push('DESCRIPTION:Wednesday NY Crypto Drinks starting soon!');
                    icsContent.push('TRIGGER:-PT30M');
                    icsContent.push('END:VALARM');
                }

                icsContent.push('END:VEVENT');
            });
        }

        icsContent.push('END:VCALENDAR');

        const icsString = icsContent.join('\r\n');

        const outputFile = path.join(path.dirname(eventsFile), 'events.ics');
        fs.writeFileSync(outputFile, icsString, 'utf8');

        console.log(`✅ ICS file generated successfully: ${outputFile}`);
        console.log(`📅 Total events: ${data.events ? data.events.length : 0}`);

    } catch (error) {
        console.error('❌ Error generating ICS file:', error.message);
        process.exit(1);
    }
}

const eventsFile = process.argv[2] || 'events.yml';

if (!fs.existsSync(eventsFile)) {
    console.error(`❌ Events file not found: ${eventsFile}`);
    console.log('Usage: node generate-ics.js [events.yml]');
    process.exit(1);
}

generateICS(eventsFile);