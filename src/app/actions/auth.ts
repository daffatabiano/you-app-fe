import { FormState, SignInSchema } from '../lib/definitions';

export const signin = async (state: FormState, formData: FormData) => {
  const validateFields = SignInSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validateFields) {
    return validateFields?.error?.flatten().fieldErrors;
  }

  const res = await fetch('https://techtest.youapp.ai/api/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return {
    res,
  };
};
