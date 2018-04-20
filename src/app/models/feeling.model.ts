export class Feeling {
    id: string;
    name: string;
    description: string;
    related: string[];
    opposite: string[];

    relatedFeelings: Feeling[];
    oppositeFeelings: Feeling[];
}