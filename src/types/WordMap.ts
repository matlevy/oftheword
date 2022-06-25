
import { BiGlyph } from "./BiGlyph";
import { GlyphCircleReference } from "./CircleReference";
import { Glyph } from "./Glyph";
import { GlyphMap } from "./GlyphMap";
import { TriadMap } from "./TriadMap";
import { Words } from "./Words";

export class WordMap {
    private words: any = {};

    constructor(
        public wordMap:WordMap,
        public glyphMap:GlyphMap,
        public triadMap:TriadMap
    ) {

    }
    //
    public god(value:string): Words {
        const a: Glyph = this.glyphMap.getGlyph(value[0]);
        const b: Glyph = this.glyphMap.getGlyph(value[1]);
        const c: Glyph = this.glyphMap.getGlyph(value[2]);
        const p: Array<number> = this.triadMap.calcCircle(new BiGlyph(a,b),c);
        const point: GlyphCircleReference = this.triadMap.getMap(p[0],p[1], value.slice(0,2).toUpperCase());
        return this.words[value];
    }
    //
    public read(word: Words) {
        
    }
    //
    public create() {
        return new Words("", this.glyphMap, this.triadMap);
    }
}