# Alexa Speed Test Skill

This Alexa skill allows users to check their internet speed using the speedtest.net service. The skill provides information about download speed, upload speed, and ping.

## Project Structure

```
skill-package/
├── skill.json                # Skill manifest
├── interactionModels/        # Interaction models
│   └── custom/
│       └── en-US.json       # English (US) interaction model
├── lambda/                   # Lambda function
│   └── src/
│       ├── index.js         # Main Lambda function code
│       └── package.json     # Lambda dependencies
└── assets/                  # Skill assets (if any)
```

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)
- ASK CLI (v2 or later)
- An AWS account
- An Amazon Developer account

## Setup Instructions

1. Install the ASK CLI:
   ```bash
   npm install -g ask-cli
   ```

2. Configure the ASK CLI:
   ```bash
   ask configure
   ```

3. Install dependencies:
   ```bash
   cd lambda/src
   npm install
   ```

4. Deploy the skill:
   ```bash
   ask deploy
   ```

## Testing the Skill

1. Open the Alexa Developer Console
2. Navigate to your skill
3. Go to the Test tab
4. Enable testing in development
5. Try the following utterances:
   - "Alexa, open speed test"
   - "Alexa, ask speed test to check my internet speed"
   - "Alexa, tell speed test to run a test"

## Features

- Check internet speed (download, upload, and ping)
- Progressive responses for long-running tests
- Error handling and user feedback
- Help and cancel/stop intents

## Notes

- The speed test may take a few minutes to complete
- The skill uses the speedtest-net package to perform the tests
- Results are reported in megabits per second (Mbps) for speeds and milliseconds (ms) for ping

## License

ISC 