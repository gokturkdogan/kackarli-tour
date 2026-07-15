export type RouteStopType = "boarding" | "stop" | "rest" | "viewpoint" | "meal";

export type PublicTourType = "DAY_TRIP" | "ACCOMMODATION";

export interface PublicRouteStop {
  order: number;
  time: string;
  name: string;
  type: RouteStopType;
  description: string;
  duration?: string;
  image?: string;
  featured?: boolean;
}

export interface PublicTour {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  type: PublicTourType;
  duration?: string;
  distance?: string;
  departureTime?: string;
  returnTime?: string;
  maxGroupSize?: number;
  price: number;
  childPrice?: number;
  image?: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  boardingPoints: string[];
  stops: PublicRouteStop[];
  href: string;
}

export interface PublicScheduleOption {
  id: string;
  startDate: string;
  endDate?: string;
  capacity: number;
  reservedCount: number;
  spotsLeft: number;
  adultPrice: number;
  childPrice: number;
  hasCustomPrice: boolean;
}

export interface PublicTourReservationOption {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  type: PublicTourType;
  duration?: string;
  image?: string;
  boardingPoints: string[];
  defaultAdultPrice: number;
  defaultChildPrice: number;
  schedules: PublicScheduleOption[];
}
