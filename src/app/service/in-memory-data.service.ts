import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let data = [
      {no:1,date:"10/10/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:10,km:30,workTime:0.5,fuel:23.5,salary:200,cost:670,money:700},
      {no:2,date:"10/10/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:5,km:25,workTime:0.7,fuel:24.4,salary:100,cost:588,money:600},
      {no:3,date:"10/11/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:8,km:50,workTime:1,fuel:42,salary:160,cost:1000,money:1000},
      {no:4,date:"10/11/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:3.8,km:10,workTime:0.5,fuel:13.5,salary:76,cost:346,money:400},
      {no:5,date:"10/12/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:6,km:20,workTime:0.2,fuel:13.4,salary:120,cost:388,money:400},
      {no:6,date:"10/12/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:7.8,km:38,workTime:1.3,fuel:41.1,salary:156,cost:978,money:1000},
      {no:7,date:"10/13/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:8.3,km:23,workTime:0.8,fuel:25.1,salary:166,cost:668,money:700},
      {no:8,date:"10/13/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:5,km:20,workTime:1,fuel:27,salary:100,cost:640,money:700},
      {no:9,date:"10/13/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:6.3,km:18,workTime:0.5,fuel:17.5,salary:126,cost:476,money:500},
      {no:10,date:"10/14/2016",car:"АХ 3036 АМ",driver:"Стасенко А.Е.",weight:8,km:10,workTime:0.5,fuel:13.5,salary:160,cost:430,money:500},
      {no:11,date:"10/14/2016",car:"АХ 1367 ВI",driver:"Плотников С.Л.",weight:12.8,km:13,workTime:0.7,fuel:18.4,salary:256,cost:624,money:700}
    ];
    return {data};
  }
}
