/** @module App.API.User */

import { GET as userGET } from '@/route/user'

export const GET = async () => userGET()

// /**
//  * User API
//  * @param req Request
//  * @param res Response
//  */
// const api = async (req: Request, res: Response): Promise<void> => {
//   await route(req, res)
// }

// export default api
