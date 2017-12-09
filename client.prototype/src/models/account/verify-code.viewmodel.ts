export class VerifyCodeViewModel {
    // [Required]
    public Provider: string;

    // [Required]
    public Code: string;

    public ReturnUrl: string;

    // [Display(Name = "Remember this browser?")]
    public RememberBrowser: boolean;

    // [Display(Name = "Remember me?")]
    public RememberMe: boolean;
}
