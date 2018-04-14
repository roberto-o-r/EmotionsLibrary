export class Feeling {
    id: string;
    name: string;
    description: string;
    related: string[];

    relatedFeelings: Feeling[];
}