export interface CanvasTokenPayload {
  userId: string
  tenantId: string
  projectId: string
  role: 'admin' | 'editor' | 'viewer'
}
