/**
 * Contrat du document collaboratif d'un canvas.
 *
 * Le canvas est rendu par tldraw cote frontend et synchronise en CRDT (Yjs) via
 * le serveur Hocuspocus. Le document Yjs porte deux structures :
 *
 *   - une Y.Map indexee par id de record tldraw, qui contient l'integralite des
 *     shapes (post-its, formes, stylo, texte, fleches) ;
 *   - une Y.Array de messages de chat, persistee avec le document pour rester
 *     disponible apres reconnexion et pour etre exportable vers l'IA.
 */
export const CANVAS_KEYS = {
  /** Y.Map<string, unknown> : recordId -> record tldraw */
  RECORDS: 'tl_records',
  /** Y.Array<CanvasChatMessage> */
  CHAT: 'chat',
} as const

export interface CanvasChatMessage {
  id: string
  text: string
  authorId: string
  timestamp: number
}

/** Nature semantique d'un element du canvas, apres traduction des shapes tldraw. */
export type CanvasElementKind = 'note' | 'text' | 'shape' | 'arrow' | 'drawing'

export interface CanvasElement {
  id: string
  kind: CanvasElementKind
  /** Texte porte par l'element (contenu d'un post-it, label d'une forme...). */
  text: string
  /** Pour kind === 'shape' : rectangle, ellipse, diamond... */
  geo?: string
  /** Pour kind === 'arrow' : texte des elements relies, quand la fleche est liee. */
  from?: string
  to?: string
}

/**
 * Vue semantique d'un canvas, produite par le backend canvas et consommee par le
 * core pour construire le prompt. On n'expose volontairement ni coordonnees ni
 * style : seul le sens compte pour generer des taches.
 */
export interface CanvasExport {
  canvasId: string
  projectId: string
  tenantId: string
  elements: CanvasElement[]
  chat: CanvasChatMessage[]
  /** Nombre de traces au stylo : ils n'ont pas de texte, on ne garde que le volume. */
  drawingCount: number
}

/** Tache proposee par l'IA a partir du canvas. Rien n'est persiste tant que
 *  l'utilisateur n'a pas valide. */
export interface ProposedTask {
  title: string
  description: string
  /** Elements du canvas qui ont motive la tache, pour que l'utilisateur puisse juger. */
  sourceHints: string[]
}
