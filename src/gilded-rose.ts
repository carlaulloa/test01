export const AGED_BRIE = 'Aged Brie';
export const CONJURED = 'Conjured';
export const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';

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
    for (let item of this.items) {
      let factory: Factory = new MyFactory();
      let template: ItemTemplate = factory.getTemplate(item);
      template.updateQuality(item);
      template.updateSellIn(item);
    }
  }
}
export abstract class Factory {
  abstract getTemplate(item: Item): ItemTemplate;
}

export class MyFactory extends Factory {
  getTemplate(item: Item): ItemTemplate {
    switch (item.name) {
      case AGED_BRIE: return new AgedBrie();
      case SULFURAS: return new Sulfuras();
      case BACKSTAGE: return new Backstage();
      case CONJURED: return new Conjured();
      default:
        return new GenericItem();
    }
  }
}
export abstract class ItemTemplate {
  abstract getQualityIncrement(item: Item): number;

  getSellInIncrement(item: Item): number {
    return -1;
  }

  isQualityValid(quality: number): boolean {
    return quality >= 0 && quality <= 50;
  }

  applySellIn(item: Item, inc: number): number {
    if (item.sellIn < 0) {
      return inc * 2;
    }
    return inc;
  }

  updateQuality(item: Item): void {
    let inc = this.getQualityIncrement(item);
    let currQuality = Utils.increaseValue(item.quality, inc);
    if (this.isQualityValid(currQuality)) {
      item.quality = currQuality;
    }
  }

  updateSellIn(item: Item): void {
    item.sellIn = Utils.increaseValue(item.sellIn, this.getSellInIncrement(item));
  }
}

export class AgedBrie extends ItemTemplate {
  getQualityIncrement(item: Item): number {
    return 1;
  }
}

export class Conjured extends ItemTemplate {
  getQualityIncrement(item: Item): number {
    return this.applySellIn(item, -2);
  }
}

export class Backstage extends ItemTemplate {
  getQualityIncrement(item: Item): number {
    if (item.sellIn < 0) {
      return -item.quality;
    }
    if (item.sellIn <= 5) {
      return 3;
    }
    if (item.sellIn <= 10) {
      return 2;
    }
    return this.applySellIn(item, -1);
  }
}

export class Sulfuras extends ItemTemplate {
  getQualityIncrement(item: Item): number {
    return 0;
  }

  getSellInIncrement(item: Item): number {
    return 0;
  }
}

export class GenericItem extends ItemTemplate {
  getQualityIncrement(item: Item): number {
    return this.applySellIn(item, -1);
  }
}
export class Utils {
  static increaseValue(value: number, inc: number): number {
    return value + inc;
  }
}