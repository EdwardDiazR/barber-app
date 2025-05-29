export interface Business {
  id: number;
  name: string;
  reviews: BusinessReview[];
  address: string;
  city: string;
  country: string;
  phoneNumber?: string;
  imageUrl?: string;
  //   barbers:// Barbers array
}

export interface BusinessReview {}
