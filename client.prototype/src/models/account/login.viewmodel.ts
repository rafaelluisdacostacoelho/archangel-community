export class LoginViewModel {
    // [Required]
    // [EmailAddress]
    public email: string;

    // [Required]
    // [DataType(DataType.Password)]
    public password: string;

    public RememberMe: boolean;

    public StayConnected: boolean;
}
