import { genericStringRule, genericIntegerRule, genericQueryParamIdRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const createUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["firstName","lastName","email","password"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericIntegerRule(
            'role',
            {
                requiredType: "int",
                warnings: "This field doesn't exist, is not a int or is empty."
            }
        ),
        ...newRules
    ];
};

export const getUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericQueryParamIdRule(
            'userId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a int or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ]
};

export const updateUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["firstName","lastName","password"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericIntegerRule(
            ["id","role"],
            {
                requiredType: "int",
                warnings: "This field doesn't exist, is not a integer or is empty."
            }
        ),
        ...newRules
    ]
};