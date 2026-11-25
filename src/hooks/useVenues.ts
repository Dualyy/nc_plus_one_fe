import { useContext } from "react";
import { VenueContext } from "../contexts/VenueContext";




export default function useVenues() {
  const venueValue = useContext(VenueContext);
  if (venueValue === null) {
    throw new Error("component is not child of Venue Provider");
  }
  return venueValue;
}
