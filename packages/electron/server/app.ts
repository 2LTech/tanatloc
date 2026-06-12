/** @module Server */

import createError from 'http-errors'
import express, { json, Request, Response, urlencoded } from 'express'
import cors from 'cors'

// @ts-expect-error @ts2307 relative to electron dist
import avatar from '../tanatloc/src/route/avatar'
// @ts-expect-error @ts2307 relative to electron dist
import email from '../tanatloc/src/route/email'
// @ts-expect-error @ts2307 relative to electron dist
import geometries from '../tanatloc/src/route/geometries'
// @ts-expect-error @ts2307 relative to electron dist
import geometry from '../tanatloc/src/route/geometry'
// @ts-expect-error @ts2307 relative to electron dist
import geometryId from '../tanatloc/src/route/geometry/[id]'
// @ts-expect-error @ts2307 relative to electron dist
import geometryDownload from '../tanatloc/src/route/geometry/[id]/download'
// @ts-expect-error @ts2307 relative to electron dist
import geometryPart from '../tanatloc/src/route/geometry/[id]/part'
// @ts-expect-error @ts2307 relative to electron dist
import group from '../tanatloc/src/route/group'
// @ts-expect-error @ts2307 relative to electron dist
import groups from '../tanatloc/src/route/groups'
// @ts-expect-error @ts2307 relative to electron dist
import groupsId from '../tanatloc/src/route/groups/[id]'
// @ts-expect-error @ts2307 relative to electron dist
import link from '../tanatloc/src/route/link'
// @ts-expect-error @ts2307 relative to electron dist
import organization from '../tanatloc/src/route/organization'
// @ts-expect-error @ts2307 relative to electron dist
import organizationId from '../tanatloc/src/route/organization/[id]'
// @ts-expect-error @ts2307 relative to electron dist
import organizations from '../tanatloc/src/route/organizations'
// @ts-expect-error @ts2307 relative to electron dist
import plugin from '../tanatloc/src/route/plugin'
// @ts-expect-error @ts2307 relative to electron dist
import plugins from '../tanatloc/src/route/plugins'
// @ts-expect-error @ts2307 relative to electron dist
import postprocessing from '../tanatloc/src/route/postprocessing'
// @ts-expect-error @ts2307 relative to electron dist
import project from '../tanatloc/src/route/project'
// @ts-expect-error @ts2307 relative to electron dist
import projectId from '../tanatloc/src/route/project/[id]'
// @ts-expect-error @ts2307 relative to electron dist
import projectArchive from '../tanatloc/src/route/project/[id]/archive'
// @ts-expect-error @ts2307 relative to electron dist
import projects from '../tanatloc/src/route/projects'
// @ts-expect-error @ts2307 relative to electron dist
import result from '../tanatloc/src/route/result'
// @ts-expect-error @ts2307 relative to electron dist
import resultDownload from '../tanatloc/src/route/result/download'
// @ts-expect-error @ts2307 relative to electron dist
import resultArchive from '../tanatloc/src/route/result/archive'
// @ts-expect-error @ts2307 relative to electron dist
import simulation from '../tanatloc/src/route/simulation'
// @ts-expect-error @ts2307 relative to electron dist
import simulationId from '../tanatloc/src/route/simulation/[id]'
// @ts-expect-error @ts2307 relative to electron dist
import simulationIdRun from '../tanatloc/src/route/simulation/[id]/run'
// @ts-expect-error @ts2307 relative to electron dist
import simulationIdStop from '../tanatloc/src/route/simulation/[id]/stop'
// @ts-expect-error @ts2307 relative to electron dist
import simulationIdLog from '../tanatloc/src/route/simulation/[id]/log'
// @ts-expect-error @ts2307 relative to electron dist
import simulationIdTasks from '../tanatloc/src/route/simulation/[id]/tasks'
// @ts-expect-error @ts2307 relative to electron dist
import simulations from '../tanatloc/src/route/simulations'
// @ts-expect-error @ts2307 relative to electron dist
import system from '../tanatloc/src/route/system'
// @ts-expect-error @ts2307 relative to electron dist
import user from '../tanatloc/src/route/user'
// @ts-expect-error @ts2307 relative to electron dist
import userId from '../tanatloc/src/route/user/[id]'
// @ts-expect-error @ts2307 relative to electron dist
import userCheck from '../tanatloc/src/route/user/check'
// @ts-expect-error @ts2307 relative to electron dist
import userModel from '../tanatloc/src/route/userModel'
// @ts-expect-error @ts2307 relative to electron dist
import users from '../tanatloc/src/route/users'
// @ts-expect-error @ts2307 relative to electron dist
import workspace from '../tanatloc/src/route/workspace'
// @ts-expect-error @ts2307 relative to electron dist
import { loginRoute } from '../tanatloc/src/route/login'
// @ts-expect-error @ts2307 relative to electron dist
import { logout } from '../tanatloc/src/route/logout'

// App
const app = express()
app.disable('x-powered-by')

app.use(
  cors({
    origin: ['http://localhost:8888', 'app://.']
  })
)
app.use(json({ limit: '150mb' }))
app.use(urlencoded({ extended: false, limit: '150mb' }))

app.all('/api/avatar', avatar)

app.all('/api/email', email)

app.all('/api/geometries', geometries)

app.all('/api/geometry', geometry)
app.all('/api/geometry/:id', geometryId)
app.all('/api/geometry/:id/download', geometryDownload)
app.all('/api/geometry/:id/part', geometryPart)

app.all('/api/group', group)

app.all('/api/groups', groups)
app.all('/api/groups/:id', groupsId)

app.all('/api/link', link)

app.all('/api/organization', organization)
app.all('/api/organization/:id', organizationId)

app.all('/api/organizations', organizations)

app.all('/api/plugin', plugin)

app.all('/api/plugins', plugins)

app.all('/api/postprocessing', postprocessing)

app.all('/api/project', project)
app.all('/api/project/:id', projectId)
app.all('/api/project/:id/archive', projectArchive)

app.all('/api/projects', projects)

app.all('/api/result', result)
app.all('/api/result/download', resultDownload)
app.all('/api/result/archive', resultArchive)

app.all('/api/simulation', simulation)
app.all('/api/simulation/:id', simulationId)
app.all('/api/simulation/:id/log', simulationIdLog)
app.all('/api/simulation/:id/run', simulationIdRun)
app.all('/api/simulation/:id/stop', simulationIdStop)
app.all('/api/simulation/:id/tasks', simulationIdTasks)

app.all('/api/simulations', simulations)

app.all('/api/system', system)

app.all('/api/user', user)
app.all('/api/user/:id', userId)
app.post('/api/user/check', userCheck)

app.all('/api/userModel', userModel)

app.all('/api/users', users)

app.all('/api/workspace', workspace)

app.post('/api/login', async (req, res) => {
  await loginRoute(req, res)
})

app.get('/api/logout', logout)

/**
 * Catch 404 and forward to error handler
 * @param next Next
 */
app.use((_: any, __: any, next) => {
  next(createError(404))
})

/**
 * Error handler
 * @param req Request
 * @param res Response
 * @param next Next
 */
app.use((err: any, req: Request, res: Response, _next: Function) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ status: 'error', err: err })
})

export default app
