
//console.log("env.service");
console.log(process.env);
const isProduction = process.env.NODE_ENV != 'development';
//console.log(isProduction);

module.exports = {
    isProduction: isProduction
}