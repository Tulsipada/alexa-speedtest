# Alexa Internet Speed Test Skill

This Alexa skill allows users to check their internet speed using Speedtest.net's API. The skill provides information about download speed, upload speed, and ping. The skill supports multiple languages including English, German, Spanish, French, Italian, Japanese, Portuguese, and Hindi.

## Features

- Check internet download speed
- Check internet upload speed
- Check ping latency
- Simple voice commands
- User-friendly responses
- Multi-language support for:
  - English (US, UK, CA, AU, IN)
  - German (DE)
  - Spanish (ES, MX)
  - French (FR)
  - Italian (IT)
  - Japanese (JP)
  - Portuguese (BR)
  - Hindi (IN)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a new Alexa skill in the Alexa Developer Console:
   - Go to https://developer.amazon.com/alexa/console/ask
   - Click "Create Skill"
   - Choose "Custom" as the model
   - Choose "Provision your own" as the backend
   - Name your skill "Internet Speed Test"
   - Enable all supported languages in the skill settings

3. Upload the interaction model:
   - In the Alexa Developer Console, go to the "Interaction Model" tab
   - Click "JSON Editor"
   - Copy and paste the contents of `interaction-model.json`

4. Deploy the skill:
   - Create a new AWS Lambda function
   - Copy the contents of `index.js` to the Lambda function
   - Set the handler to `index.handler`
   - Configure the Lambda function with the following environment variables:
     - `NODE_ENV=production`

5. Link the Lambda function to your Alexa skill:
   - In the Alexa Developer Console, go to the "Endpoint" tab
   - Select "AWS Lambda ARN" as the endpoint
   - Paste your Lambda function's ARN

## Usage

To use the skill, say:
- English (US): "Alexa, open internet speed test"
- German: "Alexa, öffne internet geschwindigkeitstest"
- Spanish: "Alexa, abre prueba de velocidad"
- French: "Alexa, ouvre test de vitesse internet"
- Italian: "Alexa, apri test velocita internet"
- Japanese: "Alexa, インターネット速度テストを開いて"
- Portuguese: "Alexa, abra teste de velocidade"
- Hindi: "Alexa, इंटरनेट स्पीड टेस्ट खोलो"

Then you can ask for a speed test in your preferred language:
- English: "Check my internet speed"
- German: "Prüfe meine Internetgeschwindigkeit"
- Spanish: "Comprobar mi velocidad de internet"
- French: "Vérifier ma vitesse internet"
- Italian: "Controlla la mia velocità internet"
- Japanese: "インターネット速度を確認"
- Portuguese: "Verificar minha velocidade de internet"
- Hindi: "मेरी इंटरनेट स्पीड चेक करें"

## Requirements

- Node.js 12.x or later
- AWS Lambda
- Alexa Developer Account
- Internet connection

## Notes

- The speed test may take up to a minute to complete
- Results are provided in megabits per second (Mbps)
- Ping is provided in milliseconds (ms)
- The skill requires an active internet connection to function
- The skill automatically detects the user's language and responds accordingly
- If a language is not supported, the skill defaults to English (US)

## License

ISC 