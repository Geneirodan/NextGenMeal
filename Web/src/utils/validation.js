import * as yup from "yup";

export const stringRequired = t => yup
    .string()
    .required(t('Required'))
export const emailValidation = t => yup
    .string()
    .email(t('Enter a valid email'))
    .required(t('Email is required'))
export const passwordValidation = t => yup
    .string()
    .matches(/[a-z]/g, t("Password should contain at least 1 lowercase letter"))
    .matches(/[A-Z]/g, t("Password should contain at least 1 uppercase letter"))
    .matches(/[0-9]/g, t("Password should contain at least 1 digit"))
    .min(8, t('Password should be of minimum 8 characters length'))
    .required(t('Password is required'));

export const confirmPasswordValidation = t => yup
    .string()
    //.oneOf([yup.ref('password')], t("Passwords are not same"))
    .required(t('Confirm your password'))
    .test('confirmPassword', 'Passwords must match', function(value){
        return this.parent.password === value
    })

export const numberValidation = t => yup
    .number()
    .typeError(t("Must be number"))
    .positive(t("Must be positive"))
    .required(t('Required'))
    .round()
