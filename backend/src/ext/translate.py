from deep_translator import (GoogleTranslator,
                             ChatGptTranslator,
                             MicrosoftTranslator,
                             PonsTranslator,
                             LingueeTranslator,
                             MyMemoryTranslator,
                             YandexTranslator,
                             PapagoTranslator,
                             DeeplTranslator,
                             QcriTranslator,
                             single_detection,
                             batch_detection)
from config import LANGUAGES

def translate(source, target, texts: list):
    translated = MyMemoryTranslator(LANGUAGES[source], LANGUAGES[target]).translate_batch(texts)

    return translated

if __name__ == '__main__':
    res = translate(source='en', target='ru', texts=['Hello world'])
    print(res)