// Proposed launch prices in USD. Review before publishing.
export const TRACTOR_MIN_HOURS = 3;
export const CONSULTATION_PRICE = 150;
export const LANDSCAPE_OFFERS = [
  {name: 'The Botanical Finish', request: 'Botanical enhancement', price: 750, unit: 'project', description: 'Bring existing patios, paths and hardscapes to life with thoughtfully selected plants.', options: [{label:'Small planting refresh',price:750},{label:'Expanded botanical enhancement',price:2500},{label:'Multi-area enhancement',price:5000}]},
  {name: 'Landscape Stewardship', request: 'Landscape stewardship', price: 250, unit: 'month', description: 'Recurring seasonal care, pruning, soil care and planting coordination.', options: [{label:'Monthly care',price:250},{label:'Biweekly care',price:500},{label:'Weekly care',price:1000}]},
  {name: 'Bespoke Landscapes', request: 'Bespoke landscaping', price: 5000, unit: 'project', description: 'Tailored design and coordinated installation for residential and commercial landscapes.', options: [{label:'Focused landscape project',price:5000},{label:'Multi-area landscape project',price:10000},{label:'Estate or commercial project',price:25000}]},
  {name: 'Landscape Consultation', request: 'Landscape consultation', price: CONSULTATION_PRICE, unit: '90-minute visit', description: 'On-site guidance, planting recommendations and a practical improvement strategy.', options: [{label:'90-minute consultation',price:CONSULTATION_PRICE}]}
] as const;
export const TRACTOR_SERVICES = [
  {name:'General tractor work',rate:100},
  {name:'Bush hogging',rate:100},
  {name:'Garden preparation and tilling',rate:115},
  {name:'Gravel and mulch spreading',rate:100},
  {name:'Light grading and driveway upkeep',rate:115},
  {name:'Trail and acreage maintenance',rate:115},
  {name:'Fork and material handling',rate:100}
] as const;
export const TRACTOR_DURATIONS = [{label:'Minimum visit · 3 hours',hours:TRACTOR_MIN_HOURS},{label:'Half day · 4 hours',hours:4},{label:'Full day · 8 hours',hours:8}] as const;
