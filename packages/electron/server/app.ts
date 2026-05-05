/** @module Server */

import createError from 'http-errors'
import express, { json, Request, Response, urlencoded } from 'express'
import cors from 'cors'

import avatar from '../../core/src/route/avatar'
import email from '../../core/src/route/email'
import geometries from '../../core/src/route/geometries'
import geometry from '../../core/src/route/geometry'
import geometryId from '../../core/src/route/geometry/[id]'
import geometryDownload from '../../core/src/route/geometry/[id]/download'
import geometryPart from '../../core/src/route/geometry/[id]/part'
import group from '../../core/src/route/group'
import groups from '../../core/src/route/groups'
import groupsId from '../../core/src/route/groups/[id]'
import link from '../../core/src/route/link'
import organization from '../../core/src/route/organization'
import organizationId from '../../core/src/route/organization/[id]'
import organizations from '../../core/src/route/organizations'
import plugin from '../../core/src/route/plugin'
import plugins from '../../core/src/route/plugins'
import postprocessing from '../../core/src/route/postprocessing'
import project from '../../core/src/route/project'
import projectId from '../../core/src/route/project/[id]'
import projectArchive from '../../core/src/route/project/[id]/archive'
import projects from '../../core/src/route/projects'
import result from '../../core/src/route/result'
import resultDownload from '../../core/src/route/result/download'
import resultArchive from '../../core/src/route/result/archive'
import simulation from '../../core/src/route/simulation'
import simulationId from '../../core/src/route/simulation/[id]'
import simulationIdRun from '../../core/src/route/simulation/[id]/run'
import simulationIdStop from '../../core/src/route/simulation/[id]/stop'
import simulationIdLog from '../../core/src/route/simulation/[id]/log'
import simulationIdTasks from '../../core/src/route/simulation/[id]/tasks'
import simulations from '../../core/src/route/simulations'
import system from '../../core/src/route/system'
import user from '../../core/src/route/user'
import userId from '../../core/src/route/user/[id]'
import userCheck from '../../core/src/route/user/check'
import userModel from '../../core/src/route/userModel'
import users from '../../core/src/route/users'
import workspace from '../../core/src/route/workspace'
import { loginRoute } from '../../core/src/route/login'
import { logout } from '../../core/src/route/logout'

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
