const refreshStore = new Map<string, string>()

export function saveRefreshToken(userId: string, token: string) {
  refreshStore.set(userId, token)
}

export function getRefreshToken(userId: string) {
  return refreshStore.get(userId)
}

export function deleteRefreshToken(userId: string) {
  refreshStore.delete(userId)
}

export function findUserIdByRefreshToken(token: string) {
  for (const [userId, t] of refreshStore.entries()) {
    if (t === token) return userId
  }
  return null
}
