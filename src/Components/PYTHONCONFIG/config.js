const key = import.meta.env.VITE_API_URL;

export const APICONFIG={
   trainingModel: key + '/training-data?competency_id=',
  performance: key + '/performance_criteria',
  extract: key + '/extract-topics',
  descriptive: key + '/generate-description'

}