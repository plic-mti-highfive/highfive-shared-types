export interface CanvasTokenPayload {
  userId: string
  tenantId: string
  projectId: string
  /** Un projet peut porter plusieurs canvas : c'est le canvasId, et non le
   *  projectId, qui identifie le document Hocuspocus et contre lequel le
   *  serveur canvas valide le token. */
  canvasId: string
  role: 'admin' | 'editor' | 'viewer'
}
