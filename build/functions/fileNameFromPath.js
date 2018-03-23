module.exports = (str) => {
    return str.split('\\').pop().split('/').pop();
};