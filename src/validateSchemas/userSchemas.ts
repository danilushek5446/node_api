import * as yup from 'yup';

import type { ValidationType } from './validationSchemasType';

export const updatePassSchema: ValidationType = {
  body: {
    oldPassword: yup.string().required('old password is required'),
    newPassword: yup.string().required('new password is required'),
  },
};

export const updateUserSchema: ValidationType = {
  body: {
    fullName: yup.string(),
    dob: yup.date().max(new Date(Date.now())),
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
    priceMin: yup.string(),
    priceMax: yup.string(),
    genere: yup.string(),
  },
});
