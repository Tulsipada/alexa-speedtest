const Alexa = require('ask-sdk-core');
const speedTest = require('speedtest-net');

// Language-specific responses
const languageStrings = {
    'en-US': {
        welcome: 'Welcome to Internet Speed Test. You can ask me to check your internet speed.',
        starting: 'Starting internet speed test. This may take a minute.',
        results: 'Your internet speed test results are: Download speed is {download} megabits per second, Upload speed is {upload} megabits per second, and Ping is {ping} milliseconds.',
        help: 'You can ask me to check your internet speed by saying, "Check my internet speed" or "Run a speed test".',
        goodbye: 'Goodbye!',
        error: 'Sorry, I encountered an error while testing your internet speed. Please try again later.'
    },
    'de-DE': {
        welcome: 'Willkommen beim Internet-Geschwindigkeitstest. Sie können mich bitten, Ihre Internetgeschwindigkeit zu überprüfen.',
        starting: 'Internet-Geschwindigkeitstest wird gestartet. Dies kann eine Minute dauern.',
        results: 'Ihre Internet-Geschwindigkeitstestergebnisse sind: Download-Geschwindigkeit ist {download} Megabit pro Sekunde, Upload-Geschwindigkeit ist {upload} Megabit pro Sekunde und Ping ist {ping} Millisekunden.',
        help: 'Sie können mich bitten, Ihre Internetgeschwindigkeit zu überprüfen, indem Sie sagen: "Prüfe meine Internetgeschwindigkeit" oder "Führe einen Geschwindigkeitstest durch".',
        goodbye: 'Auf Wiedersehen!',
        error: 'Entschuldigung, beim Testen Ihrer Internetgeschwindigkeit ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
    },
    'es-ES': {
        welcome: 'Bienvenido a la prueba de velocidad de internet. Puedes pedirme que verifique tu velocidad de internet.',
        starting: 'Iniciando prueba de velocidad de internet. Esto puede tomar un minuto.',
        results: 'Los resultados de tu prueba de velocidad son: Velocidad de descarga es {download} megabits por segundo, Velocidad de subida es {upload} megabits por segundo, y Ping es {ping} milisegundos.',
        help: 'Puedes pedirme que verifique tu velocidad de internet diciendo: "Comprobar mi velocidad de internet" o "Realizar prueba de velocidad".',
        goodbye: '¡Adiós!',
        error: 'Lo siento, encontré un error al probar tu velocidad de internet. Por favor, inténtalo de nuevo más tarde.'
    },
    'fr-FR': {
        welcome: 'Bienvenue dans le test de vitesse internet. Vous pouvez me demander de vérifier votre vitesse internet.',
        starting: 'Démarrage du test de vitesse internet. Cela peut prendre une minute.',
        results: 'Vos résultats de test de vitesse sont: La vitesse de téléchargement est de {download} mégabits par seconde, la vitesse de téléversement est de {upload} mégabits par seconde, et le Ping est de {ping} millisecondes.',
        help: 'Vous pouvez me demander de vérifier votre vitesse internet en disant: "Vérifier ma vitesse internet" ou "Faire un test de vitesse".',
        goodbye: 'Au revoir!',
        error: 'Désolé, j\'ai rencontré une erreur lors du test de votre vitesse internet. Veuillez réessayer plus tard.'
    },
    'it-IT': {
        welcome: 'Benvenuto nel test di velocità internet. Puoi chiedermi di controllare la tua velocità internet.',
        starting: 'Avvio del test di velocità internet. Questo potrebbe richiedere un minuto.',
        results: 'I risultati del tuo test di velocità sono: Velocità di download è {download} megabit al secondo, Velocità di upload è {upload} megabit al secondo, e Ping è {ping} millisecondi.',
        help: 'Puoi chiedermi di controllare la tua velocità internet dicendo: "Controlla la mia velocità internet" o "Esegui un test di velocità".',
        goodbye: 'Arrivederci!',
        error: 'Mi dispiace, ho riscontrato un errore durante il test della tua velocità internet. Per favore riprova più tardi.'
    },
    'ja-JP': {
        welcome: 'インターネット速度テストへようこそ。インターネットの速度を確認することができます。',
        starting: 'インターネット速度テストを開始します。1分ほどかかる場合があります。',
        results: 'インターネット速度テストの結果は以下の通りです：ダウンロード速度は{download}メガビット毎秒、アップロード速度は{upload}メガビット毎秒、Pingは{ping}ミリ秒です。',
        help: '「インターネット速度を確認」または「速度テストを実行」と言って、インターネットの速度を確認できます。',
        goodbye: 'さようなら！',
        error: '申し訳ありませんが、インターネット速度のテスト中にエラーが発生しました。後でもう一度お試しください。'
    },
    'pt-BR': {
        welcome: 'Bem-vindo ao teste de velocidade da internet. Você pode me pedir para verificar sua velocidade de internet.',
        starting: 'Iniciando teste de velocidade da internet. Isso pode levar um minuto.',
        results: 'Seus resultados do teste de velocidade são: Velocidade de download é {download} megabits por segundo, Velocidade de upload é {upload} megabits por segundo, e Ping é {ping} milissegundos.',
        help: 'Você pode me pedir para verificar sua velocidade de internet dizendo: "Verificar minha velocidade de internet" ou "Fazer teste de velocidade".',
        goodbye: 'Tchau!',
        error: 'Desculpe, encontrei um erro ao testar sua velocidade de internet. Por favor, tente novamente mais tarde.'
    },
    'hi-IN': {
        welcome: 'इंटरनेट स्पीड टेस्ट में आपका स्वागत है। आप मुझसे अपनी इंटरनेट स्पीड चेक करने के लिए कह सकते हैं।',
        starting: 'इंटरनेट स्पीड टेस्ट शुरू कर रहा हूं। इसमें एक मिनट का समय लग सकता है।',
        results: 'आपके इंटरनेट स्पीड टेस्ट के परिणाम हैं: डाउनलोड स्पीड {download} मेगाबिट प्रति सेकंड है, अपलोड स्पीड {upload} मेगाबिट प्रति सेकंड है, और पिंग {ping} मिलीसेकंड है।',
        help: 'आप मुझसे इंटरनेट स्पीड चेक करने के लिए कह सकते हैं: "मेरी इंटरनेट स्पीड चेक करें" या "स्पीड टेस्ट चलाएं"।',
        goodbye: 'अलविदा!',
        error: 'क्षमा करें, आपकी इंटरनेट स्पीड टेस्ट करते समय एक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।'
    }
};

// Helper function to get language-specific string
const getLanguageString = (handlerInput, key) => {
    const locale = Alexa.getLocale(handlerInput.requestEnvelope);
    const language = languageStrings[locale] || languageStrings['en-US'];
    return language[key];
};

// Launch Request Handler
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = getLanguageString(handlerInput, 'welcome');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Speed Test Intent Handler
const SpeedTestIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SpeedTestIntent';
    },
    async handle(handlerInput) {
        const speakOutput = getLanguageString(handlerInput, 'starting');
        await handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();

        try {
            const test = speedTest({ maxTime: 5000 });

            test.on('data', async (data) => {
                const downloadSpeed = (data.speeds.download * 8).toFixed(2);
                const uploadSpeed = (data.speeds.upload * 8).toFixed(2);
                const ping = data.server.ping.toFixed(0);

                const resultSpeech = getLanguageString(handlerInput, 'results')
                    .replace('{download}', downloadSpeed)
                    .replace('{upload}', uploadSpeed)
                    .replace('{ping}', ping);

                return handlerInput.responseBuilder
                    .speak(resultSpeech)
                    .getResponse();
            });

            test.on('error', async (err) => {
                console.error(err);
                return handlerInput.responseBuilder
                    .speak(getLanguageString(handlerInput, 'error'))
                    .getResponse();
            });
        } catch (error) {
            console.error(error);
            return handlerInput.responseBuilder
                .speak(getLanguageString(handlerInput, 'error'))
                .getResponse();
        }
    }
};

// Help Intent Handler
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = getLanguageString(handlerInput, 'help');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Cancel and Stop Intent Handler
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = getLanguageString(handlerInput, 'goodbye');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Session Ended Request Handler
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

// Error Handler
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak(getLanguageString(handlerInput, 'error'))
            .reprompt(getLanguageString(handlerInput, 'error'))
            .getResponse();
    }
};

// Skill Builder
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        SpeedTestIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda(); 