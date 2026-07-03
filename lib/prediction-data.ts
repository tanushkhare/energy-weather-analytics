// Historical data patterns for predictions
export interface HistoricalDataPoint {
  month: number
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
  weatherCondition: 'clear' | 'cloudy' | 'rainy' | 'stormy'
  energyConsumption: number
  solarEfficiency: number
  windEfficiency: number
}

// Simulated historical data based on realistic patterns
export const historicalData: HistoricalDataPoint[] = [
  // Winter months (lower solar, higher consumption)
  { month: 1, temperature: 5, humidity: 75, windSpeed: 15, pressure: 1013, weatherCondition: 'cloudy', energyConsumption: 850, solarEfficiency: 25, windEfficiency: 65 },
  { month: 1, temperature: 2, humidity: 80, windSpeed: 20, pressure: 1010, weatherCondition: 'rainy', energyConsumption: 920, solarEfficiency: 15, windEfficiency: 75 },
  { month: 2, temperature: 7, humidity: 70, windSpeed: 18, pressure: 1015, weatherCondition: 'cloudy', energyConsumption: 800, solarEfficiency: 30, windEfficiency: 70 },
  { month: 2, temperature: 10, humidity: 65, windSpeed: 12, pressure: 1020, weatherCondition: 'clear', energyConsumption: 750, solarEfficiency: 45, windEfficiency: 55 },
  
  // Spring months
  { month: 3, temperature: 12, humidity: 60, windSpeed: 14, pressure: 1018, weatherCondition: 'clear', energyConsumption: 650, solarEfficiency: 55, windEfficiency: 60 },
  { month: 3, temperature: 15, humidity: 55, windSpeed: 10, pressure: 1022, weatherCondition: 'clear', energyConsumption: 580, solarEfficiency: 65, windEfficiency: 50 },
  { month: 4, temperature: 18, humidity: 50, windSpeed: 8, pressure: 1020, weatherCondition: 'clear', energyConsumption: 520, solarEfficiency: 70, windEfficiency: 45 },
  { month: 4, temperature: 14, humidity: 65, windSpeed: 12, pressure: 1015, weatherCondition: 'cloudy', energyConsumption: 600, solarEfficiency: 45, windEfficiency: 55 },
  { month: 5, temperature: 20, humidity: 45, windSpeed: 6, pressure: 1018, weatherCondition: 'clear', energyConsumption: 480, solarEfficiency: 78, windEfficiency: 35 },
  { month: 5, temperature: 17, humidity: 70, windSpeed: 15, pressure: 1012, weatherCondition: 'rainy', energyConsumption: 550, solarEfficiency: 30, windEfficiency: 65 },
  
  // Summer months (high solar, AC usage)
  { month: 6, temperature: 25, humidity: 40, windSpeed: 5, pressure: 1015, weatherCondition: 'clear', energyConsumption: 650, solarEfficiency: 85, windEfficiency: 30 },
  { month: 6, temperature: 28, humidity: 50, windSpeed: 8, pressure: 1012, weatherCondition: 'clear', energyConsumption: 720, solarEfficiency: 82, windEfficiency: 40 },
  { month: 7, temperature: 32, humidity: 45, windSpeed: 6, pressure: 1010, weatherCondition: 'clear', energyConsumption: 850, solarEfficiency: 88, windEfficiency: 35 },
  { month: 7, temperature: 30, humidity: 55, windSpeed: 10, pressure: 1008, weatherCondition: 'cloudy', energyConsumption: 780, solarEfficiency: 60, windEfficiency: 50 },
  { month: 8, temperature: 31, humidity: 50, windSpeed: 7, pressure: 1012, weatherCondition: 'clear', energyConsumption: 820, solarEfficiency: 85, windEfficiency: 38 },
  { month: 8, temperature: 26, humidity: 75, windSpeed: 25, pressure: 1000, weatherCondition: 'stormy', energyConsumption: 700, solarEfficiency: 20, windEfficiency: 85 },
  
  // Autumn months
  { month: 9, temperature: 22, humidity: 55, windSpeed: 10, pressure: 1015, weatherCondition: 'clear', energyConsumption: 550, solarEfficiency: 70, windEfficiency: 50 },
  { month: 9, temperature: 18, humidity: 65, windSpeed: 14, pressure: 1018, weatherCondition: 'cloudy', energyConsumption: 620, solarEfficiency: 50, windEfficiency: 60 },
  { month: 10, temperature: 14, humidity: 70, windSpeed: 16, pressure: 1020, weatherCondition: 'cloudy', energyConsumption: 700, solarEfficiency: 40, windEfficiency: 65 },
  { month: 10, temperature: 12, humidity: 80, windSpeed: 20, pressure: 1008, weatherCondition: 'rainy', energyConsumption: 750, solarEfficiency: 25, windEfficiency: 75 },
  { month: 11, temperature: 8, humidity: 75, windSpeed: 18, pressure: 1010, weatherCondition: 'cloudy', energyConsumption: 800, solarEfficiency: 30, windEfficiency: 70 },
  { month: 11, temperature: 6, humidity: 85, windSpeed: 22, pressure: 1005, weatherCondition: 'rainy', energyConsumption: 880, solarEfficiency: 18, windEfficiency: 78 },
  { month: 12, temperature: 3, humidity: 80, windSpeed: 20, pressure: 1012, weatherCondition: 'cloudy', energyConsumption: 900, solarEfficiency: 20, windEfficiency: 75 },
  { month: 12, temperature: 0, humidity: 85, windSpeed: 25, pressure: 1008, weatherCondition: 'stormy', energyConsumption: 950, solarEfficiency: 12, windEfficiency: 82 },
]

export interface PredictionInput {
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
  month: number
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
}

export interface PredictionResult {
  weatherProbabilities: {
    clear: number
    cloudy: number
    rainy: number
    stormy: number
  }
  energyPrediction: {
    consumption: number
    solarEfficiency: number
    windEfficiency: number
    overallEfficiency: number
  }
  recommendations: string[]
  confidence: number
}

// Calculate Euclidean distance between input and historical data point
function calculateDistance(input: PredictionInput, dataPoint: HistoricalDataPoint): number {
  const tempDiff = (input.temperature - dataPoint.temperature) / 40 // Normalize
  const humidityDiff = (input.humidity - dataPoint.humidity) / 100
  const windDiff = (input.windSpeed - dataPoint.windSpeed) / 30
  const pressureDiff = (input.pressure - dataPoint.pressure) / 50
  const monthDiff = Math.min(Math.abs(input.month - dataPoint.month), 12 - Math.abs(input.month - dataPoint.month)) / 6
  
  return Math.sqrt(
    tempDiff ** 2 + 
    humidityDiff ** 2 + 
    windDiff ** 2 + 
    pressureDiff ** 2 + 
    monthDiff ** 2
  )
}

// K-Nearest Neighbors prediction
export function predictWeatherAndEnergy(input: PredictionInput): PredictionResult {
  const k = 5 // Number of nearest neighbors
  
  // Calculate distances to all historical points
  const distances = historicalData.map((dataPoint, index) => ({
    index,
    distance: calculateDistance(input, dataPoint),
    dataPoint
  }))
  
  // Sort by distance and get k nearest
  distances.sort((a, b) => a.distance - b.distance)
  const nearest = distances.slice(0, k)
  
  // Calculate weather probabilities
  const weatherCounts = { clear: 0, cloudy: 0, rainy: 0, stormy: 0 }
  nearest.forEach(n => {
    const weight = 1 / (n.distance + 0.1) // Inverse distance weighting
    weatherCounts[n.dataPoint.weatherCondition] += weight
  })
  
  const totalWeight = Object.values(weatherCounts).reduce((a, b) => a + b, 0)
  const weatherProbabilities = {
    clear: Math.round((weatherCounts.clear / totalWeight) * 100),
    cloudy: Math.round((weatherCounts.cloudy / totalWeight) * 100),
    rainy: Math.round((weatherCounts.rainy / totalWeight) * 100),
    stormy: Math.round((weatherCounts.stormy / totalWeight) * 100),
  }
  
  // Normalize to ensure total is 100
  const probTotal = weatherProbabilities.clear + weatherProbabilities.cloudy + weatherProbabilities.rainy + weatherProbabilities.stormy
  if (probTotal !== 100) {
    const diff = 100 - probTotal
    const maxKey = Object.keys(weatherProbabilities).reduce((a, b) => 
      weatherProbabilities[a as keyof typeof weatherProbabilities] > weatherProbabilities[b as keyof typeof weatherProbabilities] ? a : b
    ) as keyof typeof weatherProbabilities
    weatherProbabilities[maxKey] += diff
  }
  
  // Calculate energy predictions (weighted average)
  let consumptionSum = 0
  let solarSum = 0
  let windSum = 0
  let weightSum = 0
  
  nearest.forEach(n => {
    const weight = 1 / (n.distance + 0.1)
    consumptionSum += n.dataPoint.energyConsumption * weight
    solarSum += n.dataPoint.solarEfficiency * weight
    windSum += n.dataPoint.windEfficiency * weight
    weightSum += weight
  })
  
  // Time of day adjustments
  let timeMultiplier = 1
  let solarTimeMultiplier = 1
  switch (input.timeOfDay) {
    case 'morning':
      timeMultiplier = 0.9
      solarTimeMultiplier = 0.7
      break
    case 'afternoon':
      timeMultiplier = 1.1
      solarTimeMultiplier = 1.0
      break
    case 'evening':
      timeMultiplier = 1.2
      solarTimeMultiplier = 0.4
      break
    case 'night':
      timeMultiplier = 0.7
      solarTimeMultiplier = 0
      break
  }
  
  const solarEfficiency = Math.round(Math.min(100, (solarSum / weightSum) * solarTimeMultiplier))
  const windEfficiency = Math.round(Math.min(100, windSum / weightSum))
  
  const energyPrediction = {
    consumption: Math.round((consumptionSum / weightSum) * timeMultiplier),
    solarEfficiency,
    windEfficiency,
    overallEfficiency: Math.round((solarEfficiency * 0.4 + windEfficiency * 0.3 + (100 - input.humidity) * 0.3))
  }
  
  // Generate recommendations
  const recommendations: string[] = []
  
  if (weatherProbabilities.clear > 50) {
    recommendations.push('Optimal conditions for solar energy generation')
  }
  if (weatherProbabilities.stormy > 30) {
    recommendations.push('Consider activating backup power systems')
  }
  if (energyPrediction.windEfficiency > 60) {
    recommendations.push('High wind energy potential - maximize wind turbine output')
  }
  if (energyPrediction.consumption > 800) {
    recommendations.push('High consumption expected - consider load balancing')
  }
  if (input.temperature > 28) {
    recommendations.push('Peak cooling demand expected - pre-cool facilities if possible')
  }
  if (input.temperature < 5) {
    recommendations.push('Peak heating demand expected - optimize heating systems')
  }
  if (solarEfficiency < 30 && windEfficiency < 40) {
    recommendations.push('Low renewable output expected - prepare grid power backup')
  }
  if (energyPrediction.overallEfficiency > 70) {
    recommendations.push('Excellent overall efficiency - ideal for energy-intensive tasks')
  }
  
  // Calculate confidence based on average distance to nearest neighbors
  const avgDistance = nearest.reduce((sum, n) => sum + n.distance, 0) / k
  const confidence = Math.round(Math.max(50, Math.min(98, 100 - avgDistance * 100)))
  
  return {
    weatherProbabilities,
    energyPrediction,
    recommendations: recommendations.slice(0, 4),
    confidence
  }
}

// Get historical trends for a specific month
export function getMonthlyTrends(month: number) {
  const monthData = historicalData.filter(d => d.month === month)
  if (monthData.length === 0) return null
  
  return {
    avgTemperature: Math.round(monthData.reduce((s, d) => s + d.temperature, 0) / monthData.length),
    avgHumidity: Math.round(monthData.reduce((s, d) => s + d.humidity, 0) / monthData.length),
    avgConsumption: Math.round(monthData.reduce((s, d) => s + d.energyConsumption, 0) / monthData.length),
    avgSolarEfficiency: Math.round(monthData.reduce((s, d) => s + d.solarEfficiency, 0) / monthData.length),
    avgWindEfficiency: Math.round(monthData.reduce((s, d) => s + d.windEfficiency, 0) / monthData.length),
  }
}
