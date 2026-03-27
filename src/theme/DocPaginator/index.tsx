import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
import type {Props} from '@theme/DocPaginator';

export default function DocPaginator(props: Props): ReactNode {
  const {className, previous, next} = props;

  return (
    <nav
      className={clsx(className, 'pagination-nav', 'bioinfo-doc-paginator')}
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages',
        description: 'The ARIA label for the docs pagination',
      })}>
      {previous && (
        <PaginatorNavLink
          {...previous}
          subLabel={
            <>
              <Translate
                id="theme.docs.paginator.previous"
                description="The label used to navigate to the previous doc">
                Previous
              </Translate>
              <span className="bioinfo-doc-paginator__hint">回看上一步</span>
            </>
          }
        />
      )}
      {next && (
        <PaginatorNavLink
          {...next}
          subLabel={
            <>
              <Translate
                id="theme.docs.paginator.next"
                description="The label used to navigate to the next doc">
                Next
              </Translate>
              <span className="bioinfo-doc-paginator__hint">继续学习</span>
            </>
          }
          isNext
        />
      )}
    </nav>
  );
}
