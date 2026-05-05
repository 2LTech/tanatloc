/** @module Components.Doc.Workflow */

import { Steps, Typography } from 'antd'

import style from '../index.module.css'

/**
 * Workflow
 * @returns Workflow
 */
const Workflow: React.FunctionComponent = () => {
  /**
   * Render
   */
  return (
    <>
      <Typography.Title level={3}>Workflow</Typography.Title>

      <Typography className={style.text}>
        <Steps
          orientation="vertical"
          items={[
            {
              title: <strong>Login</strong>,
              content: 'Log in to your Tanatloc account',
              status: 'process'
            },
            {
              title: <strong>Account</strong>,
              content: (
                <>
                  Go to account settings
                  <br />
                  Fill your first name, last name, change your password if
                  needed
                  <br />
                  Create an HPC provider, you will need that to run a simulation
                </>
              ),
              status: 'process'
            },
            {
              title: <strong>Workspace</strong>,
              content: 'Create a new workspace',
              status: 'process'
            },
            {
              title: <strong>Project</strong>,
              content: 'Create a new project',
              status: 'process'
            },
            {
              title: <strong>Geometry</strong>,
              content:
                'Upload a geometry (STEP file for 3D or DXF file for 2D)',
              status: 'process'
            },
            {
              title: <strong>Simulation</strong>,
              content: (
                <>
                  Select a simulation model
                  <br />
                  Configure your simulation: geometry, materials, parameters,
                  boundary conditions, depending on your simulation, HPC
                  resource
                  <br />
                  Run your simulation
                </>
              ),
              status: 'process'
            },
            {
              title: <strong>Results</strong>,
              content: 'Display the results',
              status: 'process'
            },
            {
              title: <strong>Data</strong>,
              content: 'Depending on your simulation, visualize data',
              status: 'process'
            },
            {
              title: <strong>Post-processing</strong>,
              content: 'Depending on your simulation, post-process the result',
              status: 'process'
            }
          ]}
        />
      </Typography>
    </>
  )
}

export default Workflow
