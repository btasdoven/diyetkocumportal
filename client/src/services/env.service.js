export default {
    isProduction
};

const isProduction = process.env.NODE_ENV != 'development';