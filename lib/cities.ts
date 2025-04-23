export const cities = [
  { value: "bangalore", label: "Bangalore" },
  { value: "delhi", label: "Delhi" },
  { value: "mumbai", label: "Mumbai" },
  { value: "chennai", label: "Chennai" },
  { value: "kolkata", label: "Kolkata" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "pune", label: "Pune" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "jaipur", label: "Jaipur" },
  { value: "lucknow", label: "Lucknow" },
]

export function getCityLabel(cityValue: string): string {
  const city = cities.find((c) => c.value === cityValue)
  return city ? city.label : cityValue
}
