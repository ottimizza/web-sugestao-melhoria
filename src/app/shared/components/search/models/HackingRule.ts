import { Builder, IBuilder } from '@shared/models/Builder';
import { SearchOption } from './SearchOption';

export interface IHackinghRule {

    id: string;

    description: string;

    value: any;

    keywords: string[];

}

export class HackingRule implements IHackinghRule {

    id: string;

    regex: RegExp;

    description: string;

    value: any;

    keywords: string[];

    constructor(builder: any) {
        this.id = builder.id;
        this.regex = builder.regex;
        this.description = builder.description;
        this.value = builder.value;
    }

    public static apply(text: string, rules: HackingRule[]): Array<SearchOption> {
        return rules.filter((v) => new HackingRule(v).matches(text))
            .map<SearchOption>((v) => new HackingRule(v).toSearchOption(text));
    }

    public static builder(): IBuilder<HackingRule> {
      return Builder<HackingRule>();
    }

    private normalize(text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    public matches(text: string): RegExpMatchArray {
        return text.match(this.regex);
    }

    public toSearchOption(text: string): SearchOption {
        const match = this.regex.exec(text);
        const value = match.groups.value;
        for (let key in this.value) {
            if (Object.prototype.hasOwnProperty.call(this.value, key)) {
                this.value[key] = value;
            }
        }
        this.description = this.format(this.description, value);
        return SearchOption.fromHackingRule(this);
    }


    private format(text: string, ...args: any[]) {
        return text.replace(/{(\d+)}/g, (match, num) => {
            return typeof args[num] != 'undefined'
                ? args[num]
                : match;
        });
    }

}
