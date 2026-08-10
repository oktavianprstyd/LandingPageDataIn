// src/components/common/SEOHead.tsx
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
}

/**
 * Injects <title>, <meta name="description">, and <link rel="icon"> into the document <head>
 * using react-helmet-async. Satisfies Requirements 9.8.
 */
export default function SEOHead({ title, description }: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/png" href="/images/logo.png" />
      <link rel="apple-touch-icon" href="/images/logo.png" />
    </Helmet>
  );
}
