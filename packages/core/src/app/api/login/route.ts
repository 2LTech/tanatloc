/** @module App.API.Login */

import {
  APICreateLoginRoute,
  FindUser,
  ValidatePassword
} from '@2ltech/nextjs-app-passport'

import { IUserCheck } from '@/database/user'

import User from '@/lib/user'

export const POST = APICreateLoginRoute(
  User.findUser as FindUser<IUserCheck>,
  User.validatePassword as ValidatePassword<IUserCheck>
)
