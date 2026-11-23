import type { Metadata } from 'next';
import LoudogLanding from './LoudogLanding';

export const metadata: Metadata = {
  title: 'Loudog Acres | Bespoke Landscaping & Property Services',
  description:
    'Loudog Acres brings hardscapes to life through botanical landscape enhancements, landscape stewardship, bespoke landscaping, and compact tractor services in the Chattanooga–Cleveland area.',
  alternates: { canonical: 'https://tohisane.com/loudogacres' },
  openGraph: {
    title: 'Loudog Acres | Bespoke Landscaping',
    description: 'Beautiful by Nature. Bountiful by Design. Landscape enhancements, stewardship, and tractor services in Southeast Tennessee.',
    url: 'https://tohisane.com/loudogacres',
    images: [{ url: 'https://tohisane.com/loudogacres/logo.jpg', width: 1774, height: 887 }],
    type: 'website',
  },
};

export default function Page() {
  return <LoudogLanding />;
}
