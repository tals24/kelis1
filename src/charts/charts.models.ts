
export interface AHelp {
    count: 0,
    sum:  0
}
//
export interface Interaction {
    account: string;
    userVersion: string;
    category: string;
    userQuery: string;
    timestamp: number;
    analyzedUserResponse: AnalyzedUserResponse[];
    overallSentiment: OverallSentiment;
    conversation: string[];
}

export interface AnalyzedUserResponse {
    id: number;
    input: string;
    sentiment: Sentiment;
}

export interface Sentiment {
    sentimentType: string;
    sentimentConfidence: {
        positive: number;
        negative: number;
        neutral: number;
        mixed: number;
    };
}
export interface OverallSentiment {
    sentimentType: "NEGATIVE" | "NEUTRAL" |  "POSITIVE",
    sentimentConfidence: {
        positive: number,
        negative: number

    }
}
export interface DataVal{
    label: string,
    y: number,
}

export interface DataValMarkerSize{
    label: string,
    markerSize: number,
    y: number,
}