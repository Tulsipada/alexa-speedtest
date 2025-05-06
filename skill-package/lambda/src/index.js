const Alexa = require('ask-sdk-core');
const speedTest = require('speedtest-net');

// Language-specific responses
const responses = {
    'en-US': {
        welcome: 'Welcome to Speed Test. I can help you check your internet speed. Just say, run a speed test.',
        help: 'I can help you check your internet speed. Just say, run a speed test.',
        goodbye: 'Goodbye!',
        error: 'Sorry, I encountered an error while running the speed test.',
        runningTest: 'Running the speed test. This may take a few minutes.',
        testResults: 'Your download speed is {download} megabits per second, and your upload speed is {upload} megabits per second.'
    },
    'en-GB': {
        welcome: 'Welcome to Speed Test. I can help you check your internet speed. Just say, run a speed test.',
        help: 'I can help you check your internet speed. Just say, run a speed test.',
        goodbye: 'Goodbye!',
        error: 'Sorry, I encountered an error while running the speed test.',
        runningTest: 'Running the speed test. This may take a few minutes.',
        testResults: 'Your download speed is {download} megabits per second, and your upload speed is {upload} megabits per second.'
    },
    'de-DE': {
        welcome: 'Willkommen beim Geschwindigkeitstest. Ich kann Ihnen helfen, Ihre Internetgeschwindigkeit zu überprüfen. Sagen Sie einfach, führen Sie einen Geschwindigkeitstest durch.',
        help: 'Ich kann Ihnen helfen, Ihre Internetgeschwindigkeit zu überprüfen. Sagen Sie einfach, führen Sie einen Geschwindigkeitstest durch.',
        goodbye: 'Auf Wiedersehen!',
        error: 'Entschuldigung, beim Ausführen des Geschwindigkeitstests ist ein Fehler aufgetreten.',
        runningTest: 'Führe den Geschwindigkeitstest durch. Dies kann einige Minuten dauern.',
        testResults: 'Ihre Download-Geschwindigkeit beträgt {download} Megabit pro Sekunde und Ihre Upload-Geschwindigkeit beträgt {upload} Megabit pro Sekunde.'
    },
    'fr-FR': {
        welcome: 'Bienvenue dans Test de Vitesse. Je peux vous aider à vérifier votre vitesse internet. Dites simplement, lancez un test de vitesse.',
        help: 'Je peux vous aider à vérifier votre vitesse internet. Dites simplement, lancez un test de vitesse.',
        goodbye: 'Au revoir!',
        error: 'Désolé, j\'ai rencontré une erreur lors de l\'exécution du test de vitesse.',
        runningTest: 'Exécution du test de vitesse. Cela peut prendre quelques minutes.',
        testResults: 'Votre vitesse de téléchargement est de {download} mégabits par seconde et votre vitesse d\'envoi est de {upload} mégabits par seconde.'
    },
    'es-ES': {
        welcome: 'Bienvenido a Prueba de Velocidad. Puedo ayudarte a comprobar tu velocidad de internet. Solo di, realiza una prueba de velocidad.',
        help: 'Puedo ayudarte a comprobar tu velocidad de internet. Solo di, realiza una prueba de velocidad.',
        goodbye: '¡Adiós!',
        error: 'Lo siento, encontré un error al ejecutar la prueba de velocidad.',
        runningTest: 'Ejecutando la prueba de velocidad. Esto puede tardar unos minutos.',
        testResults: 'Tu velocidad de descarga es de {download} megabits por segundo y tu velocidad de subida es de {upload} megabits por segundo.'
    },
    'it-IT': {
        welcome: 'Benvenuto in Test Velocità. Posso aiutarti a controllare la tua velocità internet. Dì semplicemente, esegui un test di velocità.',
        help: 'Posso aiutarti a controllare la tua velocità internet. Dì semplicemente, esegui un test di velocità.',
        goodbye: 'Arrivederci!',
        error: 'Mi dispiace, ho riscontrato un errore durante l\'esecuzione del test di velocità.',
        runningTest: 'Esecuzione del test di velocità. Questo potrebbe richiedere alcuni minuti.',
        testResults: 'La tua velocità di download è di {download} megabit al secondo e la tua velocità di upload è di {upload} megabit al secondo.'
    },
    'ja-JP': {
        welcome: 'スピードテストへようこそ。インターネット速度を確認するお手伝いができます。「スピードテストを実行して」と言ってください。',
        help: 'インターネット速度を確認するお手伝いができます。「スピードテストを実行して」と言ってください。',
        goodbye: 'さようなら！',
        error: '申し訳ありませんが、スピードテストの実行中にエラーが発生しました。',
        runningTest: 'スピードテストを実行中です。数分かかる場合があります。',
        testResults: 'ダウンロード速度は{download}メガビット/秒、アップロード速度は{upload}メガビット/秒です。'
    },
    'hi-IN': {
        welcome: 'स्पीड टेस्ट में आपका स्वागत है। मैं आपकी इंटरनेट स्पीड चेक करने में मदद कर सकता हूं। बस कहें, स्पीड टेस्ट करें।',
        help: 'मैं आपकी इंटरनेट स्पीड चेक करने में मदद कर सकता हूं। बस कहें, स्पीड टेस्ट करें।',
        goodbye: 'अलविदा!',
        error: 'क्षमा करें, स्पीड टेस्ट चलाते समय एक त्रुटि हुई।',
        runningTest: 'स्पीड टेस्ट चल रहा है। इसमें कुछ मिनट लग सकते हैं।',
        testResults: 'आपकी डाउनलोड स्पीड {download} मेगाबिट प्रति सेकंड है और अपलोड स्पीड {upload} मेगाबिट प्रति सेकंड है।'
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const response = responses[locale] || responses['en-US'];
        return handlerInput.responseBuilder
            .speak(response.welcome)
            .reprompt(response.help)
            .getResponse();
    }
};

const RunSpeedTestIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RunSpeedTestIntent';
    },
    async handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const response = responses[locale] || responses['en-US'];

        try {
            await handlerInput.responseBuilder
                .speak(response.runningTest)
                .getResponse();

            const test = speedTest({ maxTime: 5000 });
            const results = await test;

            const downloadSpeed = Math.round(results.download.bandwidth / 125000);
            const uploadSpeed = Math.round(results.upload.bandwidth / 125000);

            return handlerInput.responseBuilder
                .speak(response.testResults.replace('{download}', downloadSpeed).replace('{upload}', uploadSpeed))
                .getResponse();
        } catch (error) {
            console.error('Error running speed test:', error);
            return handlerInput.responseBuilder
                .speak(response.error)
                .getResponse();
        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const response = responses[locale] || responses['en-US'];
        return handlerInput.responseBuilder
            .speak(response.help)
            .reprompt(response.help)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const response = responses[locale] || responses['en-US'];
        return handlerInput.responseBuilder
            .speak(response.goodbye)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const response = responses[locale] || responses['en-US'];
        return handlerInput.responseBuilder
            .speak(response.error)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RunSpeedTestIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda(); 