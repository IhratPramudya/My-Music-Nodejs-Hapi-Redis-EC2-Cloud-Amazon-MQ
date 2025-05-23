
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            field: error.details[0].context.key
        })
    }
    next();
}

export default validate