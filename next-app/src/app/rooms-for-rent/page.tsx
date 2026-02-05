import RoomsForRentPage from '@/components/pages/RoomsForRentPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rooms for Rent in Atlanta | Shared Housing | Haywood Universal',
  description: 'Affordable rooms for rent in Metro Atlanta. Vetted roommates, flexible terms, and quality shared housing in Buckhead, Midtown, Decatur and more.',
  keywords: 'rooms for rent atlanta, shared housing atlanta, roommate finder atlanta, affordable housing atlanta, rooms for rent buckhead, rooms for rent midtown',
  openGraph: {
    title: 'Rooms for Rent in Metro Atlanta | Haywood Universal',
    description: 'Find affordable shared housing with vetted roommates in Atlanta',
    type: 'website',
  },
};

export default function RoomsForRent() {
  return <RoomsForRentPage />;
}
