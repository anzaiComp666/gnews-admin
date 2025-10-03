export interface IGappVideoEntity {
    id: number;
    videoId: string;
    title: string;
    durationSec: number;
    lookNum: number;
    likeNum: number;
    gold: boolean;
    labels: {
        labelId: string;
        labelName: string;
    }[];
};