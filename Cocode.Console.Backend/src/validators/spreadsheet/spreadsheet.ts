import { genericIntegerRule, genericQueryParamIdRule, genericStringRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const createSpreadsheetValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericIntegerRule(
            ["paymentMonth", "dpi"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or must be greather than 0."
            }
        ),
        genericStringRule(
            "name",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        ...newRules
    ];
};

export const updateSpreadsheetValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericIntegerRule(
            ["paymentMonth", "dpi", "id"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or must be greather than 0."
            }
        ),
        genericStringRule(
            "name",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        ...newRules
    ];
};

export const getSpreadsheetValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericQueryParamIdRule(
            'spreadsheetId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a int or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ];
};

export const getSpreadsheetsValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericIntegerRule(
            ["pageSize", "page", "dpi"],
            {
                requiredType: "integer",
                warnings: "This field doesn't exist, is not a integer or must be greather than 0."
            },
            {},
            false
        ),
        ...newRules
    ];
};