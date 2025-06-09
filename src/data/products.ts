export interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  description?: string
}

export const products: Product[] = [
  // Quvurlar
  { id: "1", name: "PPR quvur 20mm", category: "Quvurlar", price: 15000, unit: "metr" },
  { id: "2", name: "PPR quvur 25mm", category: "Quvurlar", price: 18000, unit: "metr" },
  { id: "3", name: "PPR quvur 32mm", category: "Quvurlar", price: 25000, unit: "metr" },
  { id: "4", name: "PPR quvur 40mm", category: "Quvurlar", price: 35000, unit: "metr" },
  { id: "5", name: "PPR quvur 50mm", category: "Quvurlar", price: 45000, unit: "metr" },
  { id: "6", name: "PVC quvur 110mm", category: "Quvurlar", price: 55000, unit: "metr" },
  { id: "7", name: "PVC quvur 160mm", category: "Quvurlar", price: 85000, unit: "metr" },

  // Fitinglar
  { id: "8", name: "PPR muft 20mm", category: "Fitinglar", price: 3000, unit: "dona" },
  { id: "9", name: "PPR muft 25mm", category: "Fitinglar", price: 4000, unit: "dona" },
  { id: "10", name: "PPR tee 20mm", category: "Fitinglar", price: 5000, unit: "dona" },
  { id: "11", name: "PPR tee 25mm", category: "Fitinglar", price: 6500, unit: "dona" },
  { id: "12", name: "PPR koleno 20mm", category: "Fitinglar", price: 4000, unit: "dona" },
  { id: "13", name: "PPR koleno 25mm", category: "Fitinglar", price: 5000, unit: "dona" },
  { id: "14", name: "PVC muft 110mm", category: "Fitinglar", price: 12000, unit: "dona" },
  { id: "15", name: "PVC koleno 110mm", category: "Fitinglar", price: 15000, unit: "dona" },

  // Kranlar
  { id: "16", name: 'Shar kran 1/2"', category: "Kranlar", price: 25000, unit: "dona" },
  { id: "17", name: 'Shar kran 3/4"', category: "Kranlar", price: 35000, unit: "dona" },
  { id: "18", name: 'Shar kran 1"', category: "Kranlar", price: 45000, unit: "dona" },
  { id: "19", name: "Radiator kranni", category: "Kranlar", price: 55000, unit: "dona" },
  { id: "20", name: "Termostat kran", category: "Kranlar", price: 85000, unit: "dona" },

  // Sanitariya
  { id: "21", name: "Unitaz oq", category: "Sanitariya", price: 450000, unit: "dona" },
  { id: "22", name: "Unitaz bak", category: "Sanitariya", price: 180000, unit: "dona" },
  { id: "23", name: "Lavabo oq", category: "Sanitariya", price: 320000, unit: "dona" },
  { id: "24", name: "Dush kabina", category: "Sanitariya", price: 1200000, unit: "dona" },
  { id: "25", name: "Vanna 150cm", category: "Sanitariya", price: 2500000, unit: "dona" },
  { id: "26", name: "Vanna 170cm", category: "Sanitariya", price: 2800000, unit: "dona" },

  // Asboblar
  { id: "27", name: "Payvandlash mashinasi", category: "Asboblar", price: 850000, unit: "dona" },
  { id: "28", name: "Quvur kesish asbob", category: "Asboblar", price: 120000, unit: "dona" },
  { id: "29", name: "Kalibrator", category: "Asboblar", price: 45000, unit: "dona" },
  { id: "30", name: "Quvur egilish asbob", category: "Asboblar", price: 180000, unit: "dona" },

  // Boshqalar
  { id: "31", name: "Silikon germetik", category: "Boshqalar", price: 18000, unit: "dona" },
  { id: "32", name: "Teflon lenta", category: "Boshqalar", price: 5000, unit: "dona" },
  { id: "33", name: "Quvur izolyatsiya", category: "Boshqalar", price: 25000, unit: "metr" },
  { id: "34", name: "Suvni to'xtatish lenta", category: "Boshqalar", price: 12000, unit: "dona" },
  { id: "35", name: "Metall plastik quvur 16mm", category: "Quvurlar", price: 22000, unit: "metr" },
]
