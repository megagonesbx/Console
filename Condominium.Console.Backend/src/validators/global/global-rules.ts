import { TOKEN } from "../../config";
import { genericHeaderRule, genericMongoIdRule } from "../../helpers";
import { PARAM_LOCATION } from "../../typings";

export const genericMongoIdValidationRules = (additionalRules: any = null, extraFields: string | string[] = "id") => {
    const newRules = additionalRules || [];
    const fields = extraFields || [];

    return [
        genericMongoIdRule(
            fields,
            {
                location: PARAM_LOCATION.QUERY_PARAM,
                warnings: "Parameter's doesn't exist or is not a mongo id."
            }
        ),
        ...newRules
    ]
};

export const genericTokenValidationRule = (additionalRules: any = null, extraFields: string | string[] = TOKEN) => {
    const newRules = additionalRules || [];
    const fields = extraFields || [];

    return [
        genericHeaderRule(
            fields,
            {
                location: PARAM_LOCATION.HEADER,
                warnings: "Token unexpected."
            }
        ),
        ...newRules
    ]
};