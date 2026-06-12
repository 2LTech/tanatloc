/** @module Components.Editor.Share */

import { useContext, useMemo } from 'react'
import isElectron from 'is-electron'

import {
  IFrontMutateUser,
  IFrontOrganizationsItem,
  IFrontUser
} from '@/api/index.d'

import Share from '@/components/assets/share'

import { EditorContext } from '@/context/editor'

/**
 * Props
 */
export interface IProps {
  user: Pick<IFrontUser, 'id' | 'usermodels'>
  organizations: Pick<
    IFrontOrganizationsItem,
    'id' | 'name' | 'owners' | 'users' | 'groups'
  >[]
  swr: {
    mutateUser?: (user: IFrontMutateUser) => Promise<void>
  }
}

/**
 * UserModelShare
 * @param props Props
 * @returns UserModelShare
 */
const UserModelShare: React.FunctionComponent<IProps> = ({
  user,
  organizations,
  swr
}) => {
  // Context
  const { id } = useContext(EditorContext)

  // Visible
  const visible = useMemo(() => {
    if (isElectron()) return false
    else return true
  }, [])

  // Current
  const current = useMemo(
    () => user.usermodels.find((u) => u.id === id),
    [user, id]
  )

  // Disabled
  const disabled = useMemo(() => {
    if (current?.owners.some((owner) => owner.id === user.id)) return false
    else return true
  }, [current, user])

  /**
   * Render
   */
  if (!visible) return <></>
  return (
    <Share
      disabled={disabled}
      userModel={current}
      organizations={organizations}
      swr={swr}
      style={{ buttonBordered: true }}
    />
  )
}

export default UserModelShare
