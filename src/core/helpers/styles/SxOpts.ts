export interface SxOpts {
  important?: boolean;
}

const defaultOpts: SxOpts = { important: false };
export const important: SxOpts = { important: true };

export function processOpts(sx: string, opts: SxOpts = defaultOpts) {
  if (opts?.important) {
    sx += '!important';
  }
  return sx;
}
