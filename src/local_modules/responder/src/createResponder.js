import Responder from "./responder";

 const createResponder = {
    create: function(config) {
        return new Responder(config);
    },
}

export default createResponder;
