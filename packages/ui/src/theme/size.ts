export const sizeOptions = ['small', 'medium', 'large'] as const
export type sizePropsOptions = (typeof sizeOptions)[number]
