const handleMessageError = (response) => {
  const { data } = response;
  const { data: fieldError } = data;

  if (fieldError) {
    return fieldError.email || fieldError.password;
  }

  return data.message;
};

export default handleMessageError;
