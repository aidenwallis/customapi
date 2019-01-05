class ExternalApiError extends Error {
    constructor(message, code, safe = false) {
        super(message);
        this.message = message;
        this.code = code;
        this.safe = safe;
    }

    getMessage() {
        return this.safe ? this.message : 'An unknown error occurred.';
    }
}

export default ExternalApiError;
