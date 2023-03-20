enum PARAM_LOCATION {
    BODY = "Body",
    QUERY_PARAM = "Query param",
    HEADER = "Header"
};

type FieldValidationError = {
    field: string;
    message: Record<string, string>
};

type FieldValidationMessage = {
    requiredType: string
    warnings: string
}

type FieldIdValidationMessage = {
    warnings: string;
    location: PARAM_LOCATION
};

export { FieldValidationMessage, FieldValidationError, FieldIdValidationMessage, PARAM_LOCATION};