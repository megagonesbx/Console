import { genericIntegerRule, genericQueryParamIdRule, genericStringRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const createIncidentValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["incidentName", "description"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            'incidentEvidence',
            {
                requiredType: "string",
                warnings: "This field is not a string or is empty."
            },
            null,
            false
        ),
        ...newRules
    ];
};

export const updateIncidentValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            ["incidentName", "description"],
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        genericStringRule(
            'incidentEvidence',
            {
                requiredType: "string",
                warnings: "This field is not a string or is empty."
            },
            null,
            false
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

export const getIncidentValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericQueryParamIdRule(
            'incidentId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a integer or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ]
};

export const getIncidentsValidationRules = (additionalRules: any = null) => {
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