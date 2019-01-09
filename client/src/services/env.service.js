export default {
    isProduction
};

console.log(process.env);
const isProduction = process.env.NODE_ENV != 'development';