from config import LANGUAGES
from deep_translator import (ChatGptTranslator, DeeplTranslator,
                             GoogleTranslator, LingueeTranslator,
                             MicrosoftTranslator, MyMemoryTranslator,
                             PapagoTranslator, PonsTranslator, QcriTranslator,
                             YandexTranslator, batch_detection,
                             single_detection)


def translate(source, target, texts: list):
    translated = MyMemoryTranslator(
        LANGUAGES[source], LANGUAGES[target]).translate_batch(texts)

    return translated


if __name__ == '__main__':
    res = translate(source='en', target='ru', texts=['Hello world'])
    print(res)
