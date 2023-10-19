
export default class Answer {

    /**
     * @type boolean
     */
    status;

    /**
     * @type String
     */
    info;

    /**
     * @type String
     */
    description;

    /**
     *
     * @type {{}}
     */
    data = {};

    constructor(status, info, description, data = null) {
        this.status = status;
        this.info = info;
        this.description = description;
        if (data) {
            this.data = data;
        }
    }

    is(answerStatus) {
        return this.info === this.getStatusSlug(answerStatus)
    }

    /**
     * Получение полных данных статуса ответа
     *
     * @param status
     * @returns {{description, slug: *}}
     */
    getStatusSlug(status) {
        let answerStatusSlug = '';
        if (typeof status === 'string') {
            answerStatusSlug = status;
        } else if (typeof status === 'object' && status.slug) {
            answerStatusSlug = status.slug;
        } else {
            throw new Error(`Invalid structure data of status. Expected string or object with slug property. Giving ${typeof status} ${status}`)
        }

        return answerStatusSlug;
    }
}
