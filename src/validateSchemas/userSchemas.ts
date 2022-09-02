import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

export const updatePassSchema: ValidationType = {
  body: {
    oldPassword: yup.string().required('old password is required'),
    newPassword: yup.string().required('new password is required'),
  },
};

export const updateUserSchema: ValidationType = {
  params: {
    id: yup.number().required('id is required'),
  },
  body: {
    fullName: yup.string(),
    dob: yup.date().transform((originalValue) => {
      return new Date(originalValue);
    }).max(new Date(Date.now())),
    email: yup.string().required('email is required'),
  },
};

export const getOneSchema: ValidationType = ({
  params: ({
    id: yup.number().required('id is required'),
  }),
});

export const getAllSchema: ValidationType = ({
  query: {
    page: yup.string(),
    perPage: yup.string(),
    sortBy: yup.string(),
    sortDirection: yup.string(),
    search: yup.string(),
    dobFrom: yup.string(),
    dobTo: yup.string(),
  },
});