import { genericIntegerRule, genericQueryParamIdRule, genericStringRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const createVisitorValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["name", "homeAddress"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericIntegerRule(
            'dpi',
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a integer or is empty."
            }
        ),
        ...newRules
    ];
};

export const updateVisitorValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["name", "homeAddress"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericIntegerRule(
            ['dpi','id'],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or is empty."
            }
        ),
        ...newRules
    ];
};

export const getVisitorValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericQueryParamIdRule(
            'visitorId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a integer or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ]
};

export const getVisitorsValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
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