/** @module App.API.Login */

import { setLocaLStrategy } from '@2ltech/nextjs-app-passport'

import User from '@/lib/user'

setLocaLStrategy(User.findUser, User.validatePassword)

export { APILoginRoute as POST } from '@2ltech/nextjs-app-passport'
