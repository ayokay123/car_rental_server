export interface Reservation {
  reservation_id?: string;
  car_id: string;
  location_id: string;
  pickup_day: string;
  return_day: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  driver_license: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}
