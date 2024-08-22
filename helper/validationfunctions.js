
const validateUsername = (username) => {
    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
    return !usernameRegex.test(username);
  };
  
  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return !strongPasswordRegex.test(password);
  };
  
  const validatePhone = (phone) => {
    return !/^\+923\d{9}$/.test(phone);
  };
  
  const validateCnic = (cnic) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    return !cnicRegex.test(cnic);
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !emailRegex.test(email);
  };


export { validateUsername, validatePassword, validatePhone, validateCnic, validateEmail };