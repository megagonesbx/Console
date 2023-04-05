import { genericIntegerRule, genericQueryParamIdRule, genericStringRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const createDonationValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericIntegerRule(
            "quantity",
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or must be greather than 0."
            }
        ),
        genericStringRule(
            "description",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            ["donationPhoto", "utilization"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            },
            null,
            false
        ),
        ...newRules
    ];
};

export const getDonationValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericQueryParamIdRule(
            'donationId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a int or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ]
};

export const updateDonationValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericIntegerRule(
            ["id", "donationNumber", "quantity"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or must be greather than 0."
            }
        ),
        genericStringRule(
            ["donationPhoto", "description", "utilization"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        ...newRules
    ];
};

export const getDonationsValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericIntegerRule(
            ["pageSize", "page"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or must be greather than 0."
            },
            {},
            false
        ),
        ...newRules
    ]
};