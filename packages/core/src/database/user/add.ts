/** @module Database.User.Add */

import { tables } from '@/config/db'

import { query } from '..'
import { pbkdf2Sync, randomBytes } from 'node:crypto'

export interface INewUser {
  alreadyExists?: boolean
  id?: string
  email?: string
}

/**
 * Add
 * @param user User
 * @returns New user
 */
export const add = async (user: {
  email: string
  password: string
}): Promise<INewUser> => {
  // Check email
  const existing = await query(
    'SELECT id FROM ' + tables.USERS + ' WHERE email = $1',
    [user.email]
  )
  if (existing.rows.length)
    return {
      alreadyExists: true
    }

  // Password
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(user.password, salt, 1_000, 64, 'sha512').toString(
    'hex'
  )

  // Create user
  const response = await query(
    'INSERT INTO ' +
      tables.USERS +
      " (email, salt, hash, isvalidated, lastmodificationdate, superuser) VALUES ($1, crypt($2, gen_salt('bf')), $3, to_timestamp($4), $5) returning id",
    [user.email, salt, hash, false, Date.now(), false]
  )

  const newUser = response.rows[0]
  if (newUser) newUser.email = user.email

  return newUser
}
