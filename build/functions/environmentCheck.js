module.exports = (environment, condition = true) => {

    return condition === (process.env.NODE_ENV === environment);

};