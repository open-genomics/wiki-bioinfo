const EXTERNAL_PROTOCOL_RE = /^[a-z][a-z\d+.-]*:/i;

function normalizeBase(base: string): string {
  if (!base || base === '/') {
    return '';
  }

  return base.replace(/\/$/, '');
}

function normalizeInternalPath(path: string): string {
  const strippedDocsPrefix = path.replace(/^\/?(docs|wiki-bioinfo|wiki)(?=\/|$)/, '') || '/';

  if (strippedDocsPrefix === '/') {
    return '/';
  }

  return strippedDocsPrefix.startsWith('/')
    ? strippedDocsPrefix
    : `/${strippedDocsPrefix}`;
}

export function isExternalHref(to: string): boolean {
  return EXTERNAL_PROTOCOL_RE.test(to) || to.startsWith('//');
}

export function buildHref(to: string, baseUrl: string): string {
  if (!to) {
    return '#';
  }

  const normalizedBase = normalizeBase(baseUrl);

  if (
    isExternalHref(to) ||
    to.startsWith('#') ||
    to.startsWith('?') ||
    to.startsWith('./') ||
    to.startsWith('../')
  ) {
    return to;
  }

  if (normalizedBase && (to === normalizedBase || to.startsWith(`${normalizedBase}/`))) {
    return to;
  }

  const normalizedPath = normalizeInternalPath(to);

  return `${normalizedBase}${normalizedPath}` || '/';
}
