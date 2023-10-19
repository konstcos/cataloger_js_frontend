import answersList from "@/domains/core/answers/answers.json";
import createResponder from "@/local_modules/responder";

export const responder = createResponder.create({
    answers: answersList,
})
