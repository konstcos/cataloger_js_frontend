
export default class ResponderValidator {

    /**
     * проверяем наличие основных параметров в конфиге
     * @param config
     */
    configValidation(config) {
        if (typeof config.answers !== 'object' || config.answers === null) {
            throw new Error('Answers list for configure responder is required');
        }
    }

    /**
     * Валидация секции ответа
     *
     * @param sectionKey
     * @param answersList
     */
    sectionValidation(sectionKey, answersList) {
        if (typeof sectionKey !== 'string') {
            throw new Error(`Ключ "${sectionKey}" должен быть строкой`);
        }

        const section = answersList[sectionKey];

        if (typeof section !== 'object' || section === null) {
            throw new Error(`Значение ключа "${sectionKey}" должно быть объектом`);
        }
    }

    /**
     * Валидация объекта ответа
     *
     * @param answerKey
     * @param section
     */
    answerObjectValidation(answerKey, section) {
        const answerObject = section[answerKey];

        if (typeof answerObject !== 'object' || answerObject === null) {
            throw new Error(`Значение ошибки "${answerKey}" должно быть объектом`);
        }

        if (typeof answerObject.slug !== 'string') {
            throw new Error(`Ошибка "${answerKey}" должна иметь строковое значение для "slug"`);
        }

        if (typeof answerObject.description !== 'string') {
            throw new Error(`Ошибка "${answerKey}" должна иметь строковое значение для "description"`);
        }
    }
}
