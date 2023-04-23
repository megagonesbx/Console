import { genericQueryParamIdRule, genericStringRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const createNotificationValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];

    return [
        genericStringRule(
            "email",
            {
                requiredType: "string",
                warnings: "This field doesn't exist, is not a string or is empty."
            }
        ),
        ...newRules
    ];
};

export const getNotificationsValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericQueryParamIdRule(
            'email',
            {
                warnings: "The email doesn't exist in the queryparam, is not a string or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ];
};

export const notificationValidationRules = (additionalRules: any = null) => {
    const newRules = additionalRules || [];
    
    return [
        genericQueryParamIdRule(
            'notificationId',
            {
                warnings: "The ID doesn't exist in the queryparam, is not a integer or is empty.",
                location: PARAM_LOCATION.QUERY_PARAM
            }
        ),
        ...newRules
    ];
};