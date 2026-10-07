// usage example; app.get("/debtorId", validate({params: debtor}), getDebtors)
export const validate = (schemas) => {
  return (req, res, next) => {
    for (const [key, schema] of Object.entries(schemas)) {
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        const error = new Error("Data validation failed");
        error.statusCode = 400;
        error.details = result.error.issues.map((error) => ({
          field: error.path.join("."),
          message: error.message,
        }));
        return next(error);
      }
      req[key] = result.data;
    }
    next();
  };
};
