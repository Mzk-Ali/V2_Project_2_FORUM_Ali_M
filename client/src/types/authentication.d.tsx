// Type du formulaire d'inscription
export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
};

// Type du formulaire de connexion
export type LoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

// Type du formulaire du reset password
export type ForgotPasswordFormData = {
    emailForForgetPassword: string;
};

// Type du formulaire du changement password
export type ChangePasswordFormData = {
    password: string;
    confirmPassword: string;
};