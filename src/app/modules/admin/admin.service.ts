import { IAdmin } from './admin.interface'
import Admin from './admin.model'

export const createAdmin = async (adminData: IAdmin): Promise<IAdmin | null> => {
  const admin = await Admin.create(adminData)
  return admin
}
