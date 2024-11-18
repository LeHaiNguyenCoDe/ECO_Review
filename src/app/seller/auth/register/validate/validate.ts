export interface ValidationResult {
  isValid: boolean;
  errors: {
      username?: string;
      phoneNumber?: string;
      identifier?: string;
      password?: string;
      confirmPassword?: string;
  };
}
export function validateUserInput(
  username: string,
  phoneNumber: string,
  identifier: string,
  password: string,
  confirmPassword: string,
  existingUsers: { username: string, phoneNumber: string, identifier: string }[]
): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
      errors.username = 'Tên người dùng phải chứa ít nhất 3 ký tự và không có ký tự đặc biệt';
  }

  if (!/^\d{10,11}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Số điện thoại phải chứa 10 hoặc 11 chữ số';
  }

  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(identifier)) {
    errors.identifier= 'Email không hợp lệ';
}


  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số';
  }

  if(confirmPassword !== password ){
      errors.confirmPassword = 'Mật khẩu không khớp với mật khẩu vừa tạo';
  }

  const isUsernameDuplicate = existingUsers.some((user) => user.username === username);
  const isPhoneNumberDuplicate = existingUsers.some((user) => user.phoneNumber === phoneNumber);
  const isEmailDuplicate = existingUsers.some((user) => user.identifier === identifier);

  if (isUsernameDuplicate) {
      errors.username = 'Tên người dùng đã tồn tại';
  }
  if (isPhoneNumberDuplicate) {
      errors.phoneNumber = 'Số điện thoại đã tồn tại';
  }
  if (isEmailDuplicate) {
      errors.identifier = 'Email đã tồn tại';
  }

  return {
      isValid: Object.keys(errors).length === 0,
      errors,
  };
}
