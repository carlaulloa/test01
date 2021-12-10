import { GildedRose, Item } from './gilded-rose';

export class Utils {

  static findSubset(arr: number[], sum: number): number[] {
    if (!arr || arr.length < 2) {
      throw new Error('Invalid array');
    }
    let length = 2;
    let all: any[] = [];
    this.fn(length, arr, [], 0, all, sum);
    return all.length > 0 ? all[0] : all;
  }

  static fn(length: number, arr: number[], subset: number[], acc: number, all: any[], sum: number) {
    if(all.length > 0){
      return;
    }
    if (length == 0) {
      console.log(acc)
      if (subset.length > 0 && acc === sum) {
        all[all.length] = subset;
        return;
      }
      return;
    }
    for (let j = 0; j < arr.length; j++) {
      this.fn(length - 1, arr.slice(j + 1), subset.concat([arr[j]]), acc + arr[j], all, sum);
    }
    return;
  }

}

let arr: number[] = [2, 5, 8, 14, 0];
let sum: number = 10;
console.log(Utils.findSubset(arr, sum));

let items: Item[] = [
  {
    name: 'Aged Brie',
    quality: 20,
    sellIn: 10
  },
  {
    name: 'Conjured',
    quality: 20,
    sellIn: 10
  }
];
let gr: GildedRose = new GildedRose(items);
gr.updateQuality();
console.log(gr.items);