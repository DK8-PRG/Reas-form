const phoneRegex = /^\+?(420|421)?\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validatePhone = (phone) => phoneRegex.test(phone);
const validateEmail = (email) => emailRegex.test(email);

module.exports = { validatePhone, validateEmail };
