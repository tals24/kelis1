export interface OverallSentiment {
  sentimentType: string,
  sentimentConfidence: {
    positive: number,
    negative: number,
    neutral: number,
  }
}

export interface UserInputModel {
  account: string,
  userVersion: string,
  category: string,
  userQuery: string,
  timestamp: number,
  overallSentiment: OverallSentiment,
  conversation: string[],
}

