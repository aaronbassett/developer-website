import React from 'react';
import { PageContext } from '../src/components/PageContext';
import { Global, css } from '@emotion/core';

const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <Global
        styles={css`
          // add additional styles needed for gatsby-remark-autolink-headers
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            scroll-margin-top: calc(var(--global-header-height) + 2rem);

            .anchor.before {
              position: absolute;
              top: 0;
              left: 0;
              transform: translateX(-100%);
              padding-right: 4px;
            }
            .anchor svg {
              opacity: 0;
              transition: opacity 0.2s ease-out;
            }

            &:hover .anchor svg,
            .anchor:focus svg {
              opacity: 1;
            }
          }
        `}
      />
      <PageContext.Provider value={props.pageContext}>
        {element}
      </PageContext.Provider>
    </>
  );
};

export default wrapPageElement;
