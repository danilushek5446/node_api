import type { Handler } from 'express';
import db from '../../db';
import ApiError from '../../error/ApiError';

const getOneUser: Handler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await db.user.findOneBy({
      id: +id,
    });
    if (!user) {
      return next(new ApiError({ statusCode: 404, message: 'user not found' }));
    }

    return res.send({ user });
  } catch (error) {
    return next(error);
  }
};

export default getOneUser;
