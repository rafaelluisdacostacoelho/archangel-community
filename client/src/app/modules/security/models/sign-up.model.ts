export class SignUpModel {
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public passwordConfirmation: string
    ) { }
}
