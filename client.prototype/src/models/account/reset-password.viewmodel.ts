export class ResetPasswordViewModel {
    // [Required]
    // [EmailAddress]
    public Email: string;

    // [Required]
    // [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    // [DataType(DataType.Password)]
    public Password: string;

    // [DataType(DataType.Password)]
    // [Display(Name = "Confirm password")]
    // [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public ConfirmPassword: string;

    public Code: string;
}
