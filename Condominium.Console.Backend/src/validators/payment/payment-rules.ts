import { genericIntegerRule, genericStringRule } from "../../helpers";

export const createPaymentValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["ownerDPI", "description"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            "photo",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            },
            null,
            false
        ),
        genericIntegerRule(
            ["amount", "month"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or is empty."
            }
        ),
        ...newRules
    ]
};

export const getPaymentsValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            "dpi",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            },
            null,
            false
        ),
        genericIntegerRule(
            ["pageSize", "page"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or is empty."
            },
            {},
            false
        ),
        ...newRules
    ]
};