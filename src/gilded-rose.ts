export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): void {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      let inc = this.getIncrement(item);
      this.setQuality(item, inc);
      item.sellIn = this.increaseValue(item.sellIn, -1);
    }
  }

  private getIncrement(item: Item): number {
    if (this.itemIs(item, 'Aged Brie')) {
      return 1;
    }
    if(this.itemIs(item, 'Conjured')){
      return this.applySellIn(item, -2);
    }
    if (this.itemIs(item, 'Backstage passes to a TAFKAL80ETC concert')) {
      if (item.sellIn < 0) {
        return -item.quality;
      }
      if (item.sellIn <= 5) {
        return 3;
      }
      if (item.sellIn <= 10) {
        return 2;
      }
    }
    return this.applySellIn(item, -1);
  }

  private setQuality(item: Item, inc: number): void {
    if (this.itemIs(item, 'Sulfuras, Hand of Ragnaros')) {
      return;
    }
    let currQuality = this.increaseValue(item.quality, inc);
    if (this.isQualityValid(currQuality)) {
      item.quality = currQuality;
    }
  }

  private isQualityValid(quality: number): boolean {
    return quality >= 0 && quality <= 50;
  }

  private itemIs(item: Item, name: string): boolean {
    return item.name == name;
  }

  private applySellIn(item: Item, inc: number): number {
    if(item.sellIn < 0){
      return inc * 2;
    }
    return inc;
  }

  private increaseValue(value: number, inc: number): number {
    return value + inc;
  }

}