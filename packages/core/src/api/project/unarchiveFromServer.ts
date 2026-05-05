/** @module API.Project.UnarchiveFromServer */

import { ICallResponse } from '../index.d'

import { call } from '@/api/call'

/**
 * Unarchive from server
 * @param project Project
 * @returns Response
 */
export const unarchiveFromServer = async (project: {
  id: string
}): Promise<ICallResponse> => {
  return call('/api/project/' + project.id + '/archive', {
    method: 'PUT'
  })
}
