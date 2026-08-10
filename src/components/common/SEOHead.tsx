// src/components/common/SEOHead.tsx
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
}

/**
 * Injects <title> and <meta name="description"> into the document <head>
 * using react-helmet-async. Satisfies Requirements 9.8.
 */
export default function SEOHead({ title, description }: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
