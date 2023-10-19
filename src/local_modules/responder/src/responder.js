import ResponderValidator from "./responderValidator";
import Answer from "./answer";

export default class Responder {

    /**
     * Список ответов
     *
     * @type {{}}
     */
    answers = {};

    /**
     * Валидатор
     *
     * @type ResponderValidator
     */
    validator;

    constructor(config) {
        this.validator = new ResponderValidator();
        this.configure(config);
    }

    /**
     * Конфигурирование класса
     *
     * @param config
     */
    configure(config) {
        this.validator.configValidation(config);
        this.setAnswersList(config.answers);
    }

    /**
     * Занесение списка ответов в класс
     *
     * @param answersList
     */
    setAnswersList(answersList) {
        for (const sectionKey in answersList) {
            this.validator.sectionValidation(sectionKey, answersList);

            const section = answersList[sectionKey];

            for (let answerKey in section) {
                this.validator.answerObjectValidation(answerKey, section);

                if (section[answerKey].slug in this.answers) {
                    throw new Error(`Answer with slug: ${section[answerKey].slug} already exist in answer list. Names should not be repeated.`);
                }

                this.answers[section[answerKey].slug] = {
                    slug: section[answerKey].slug,
                    description: section[answerKey].description
                };
            }
        }
    }

    /**
     * Получение полных данных статуса ответа
     *
     * @param status
     * @returns {{description, slug: *}}
     */
    getStatusData(status) {
        let answerStatusSlug = '';
        if (typeof status === 'string') {
            answerStatusSlug = status;
        } else if (typeof status === 'object' && status.slug) {
            answerStatusSlug = status.slug;
        } else {
            throw new Error(`Invalid structure data of status. Expected string or object with slug property. Giving ${typeof status} ${status}`)
        }

        if (!(answerStatusSlug in this.answers)) {
            throw new Error(`Wrong answer status ${answerStatusSlug}. It not exists in answer list.`);
        }

        return {
            slug: answerStatusSlug,
            description: this.answers[answerStatusSlug].description,
        };
    }

    success(status, data = {}) {
        const answerStatus = this.getStatusData(status);
        return new Answer(
            true,
            answerStatus.slug,
            answerStatus.description,
            data
        );
    }

    fail(status, data = {}) {
        const answerStatus = this.getStatusData(status);
        return new Answer(
            false,
            answerStatus.slug,
            answerStatus.description,
            data
        );
    }


}
