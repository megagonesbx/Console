import { genericBooleanRule, genericIntegerRule, genericQueryParamIdRule, genericQueryParamRule, genericStringRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const createHouseValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["homeAddress", "ownerName", "ownerDPI", "phoneNumber"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericBooleanRule(
            "solvent",
            {
                requiredType: "boolean",
                warnings: "This field doesn't exist, is not a boolean or is empty."
            }
        ),
        ...newRules
    ];
};

export const updateHouseValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["homeAddress", "ownerName", "ownerDPI", "phoneNumber"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericBooleanRule(
            "solvent",
            {
                requiredType: "boolean",
                warnings: "This field doesn't exist, is not a boolean or is empty."
            }
        ),
        genericIntegerRule(
            'id',
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or is empty."
            }
        ),
        ...newRules
    ];
};

export const getHouseValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericQueryParamIdRule(
            'houseId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a int or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ]
};

export const getHousesValidationRules = (additionalRules: any = null) => {
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

export const getHousesByUserValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericQueryParamRule(
            "email",
            {
                location: PARAM_LOCATION.HEADER,
                warnings: "This field doesn't exist, is not a string or is empty."
            },
        ),
        ...newRules
    ]
};