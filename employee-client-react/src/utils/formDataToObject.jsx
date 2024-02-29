const formDataToObject = (formData) => {
  const userInputs = {};
  formData.forEach((value, key) => {
    // Check if key already exists
    if (Object.prototype.hasOwnProperty.call(userInputs, key)) {
      // If key already exists, make its value an array and push new value
      if (!Array.isArray(userInputs[key])) {
        userInputs[key] = [userInputs[key]];
      }
      userInputs[key].push(value);
    } else {
      // If key doesn't exist, set its value
      userInputs[key] = value;
    }
  });
  return userInputs;
};

export default formDataToObject;
