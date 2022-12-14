import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApiError from '../../utils/ApiError';
import db from '../../db';
import type User from '../../db/entities/User';
import config from '../../config';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
};

type BodyType = {
  email: string;
  fullName?: string;
  dob?: Date;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const updateUser: HandlerType = async (req, res, next) => {
  try {
    const {
      email,
      fullName,
      dob,
    } = req.body;
    const id = +req.user.id;

    const isEmailNotUnique = await db.user.findOne({
      select: {
        id: true,
        email: true,
      },
      where: {
        email,
      },
    });

    if (isEmailNotUnique && isEmailNotUnique.id !== id) {
      return next(new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'user with this email is allready exists',
      }));
    }

    const user = await db.user.findOne({ where: { id } });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'user not found' }));
    }

    if (dob) {
      user.dob = dob;
    }
    user.email = email;
    user.fullName = fullName;

    await db.user.save(user);

    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export default updateUser;
