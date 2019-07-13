// eslint-disable-next-line 
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// eslint-disable-next-line 
const URL_PATTERN = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const validations = {
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Invalid email pattern';
    }
    return message;
  },
  name: (value) => {
    let message;
    if (!value || value.length < 3) {
      message = 'Name is required';
    } 
    return message;
  },
  description: (value) => {
    let message;
    if (!value || value.length < 10 ) {
      message = 'A description is required';
    } 
    return message;
  },
  password: (value) => {
    let message;
    if (!value || value.length < 3) {
      message = 'Password is required';
    }
    return message;
  }, 
  // birthDate: (value) => {
  //   let message;
  //   let isValidDate = Date.parse(value);
  //   if (isNaN(isValidDate)) {
  //     message = 'Date Format is invalid';
  //   }
  //   return message;
  // },
  image: (value) => {
    let message;
    if (!URL_PATTERN.test(value)) {
      message = 'Invalid Url Pattern';
    }
    return message;
  }
}

export default validations