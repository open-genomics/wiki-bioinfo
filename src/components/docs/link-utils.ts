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

/**
 * 解析链接数组，添加 href 和 external 属性
 * 作为 Seam，统一处理所有文档组件的链接解析逻辑
 */
export function resolveLinks<T extends { to: string }>(
  items: T[],
  baseUrl: string
): (T & { href: string; external: boolean })[] {
  return items.map((item) => {
    const href = buildHref(item.to, baseUrl);
    return { ...item, href, external: isExternalHref(href) };
  });
}

/**
 * 解析前置知识项，支持纯文本字符串和带链接的对象
 * 为 PrerequisitesBox 提供统一的链接解析 Seam
 */
export function resolvePrereqItems(
  items: Array<string | { label: string; href?: string }>,
  baseUrl: string
): Array<{ label: string; href: string | undefined; external: boolean }> {
  return items.map((item) => {
    if (typeof item === 'string') {
      return {
        label: item,
        href: undefined,
        external: false,
      };
    }

    const href = item.href ? buildHref(item.href, baseUrl) : undefined;

    return {
      label: item.label,
      href,
      external: href ? isExternalHref(href) : false,
    };
  });
}
