import NotificationProvider from '@/context/notification'

/**
 * Interface
 */
export interface Props {
  children: React.ReactNode
}

const WithNotification: React.FunctionComponent<Props> = ({ children }) => {
  return <NotificationProvider>{children}</NotificationProvider>
}

export default WithNotification
