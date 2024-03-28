import { request } from './apiService'

const login = async (username: string, password: string) => {
  try {
    const response = await request({
      url: '/login_check',
      method: 'POST',
      data: {
        username,
        password,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const apiUserService = {
  login,
}
