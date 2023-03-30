import { Injectable } from '@nestjs/common';
import { breakfast } from './constants/breakfasts';
import { dinner } from './constants/dinners';
import { lunch } from './constants/lunchs';
import { Meals } from './enum/meals.enum';
import { ObjectiveProposition } from './enum/propositions.enum';

@Injectable()
export class TestService {
  public breakfast(): void {
    console.log('🕖 아침 먹을 시간입니다. 🕖');
    this.recommend(Meals.BREAKFAST);
    console.log('든든히 먹고 오늘도 행복한 하루 보내세요 ( •̀ ω •́ )✧');
  }

  public lunchBefore10Minute(): void {
    console.log('🕙 점심 메뉴 주문 10분 전입니다 🕙');
    const oneMinute = 1000 * 60;
    setTimeout(() => {
      this.recommend(Meals.LUNCH);
      console.log('맛있게 드시고 오후 근무도 힘내세요 (/≧▽≦)/');
    }, oneMinute);
  }

  public lunch(): void {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 점심 주문하세요!!! 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  }

  public dinner(): void {
    console.log('🕟 퇴근 시간입니다. 오늘 업무도 잘 마무리하셨나요? 🕟');
    this.recommend(Meals.DINNER);
    console.log('만약 오늘 유독 힘든 날이었다면 맛있는 식사와 함께 털어버리세요 o(*^＠^*)o');
  }

  private recommend(meal: Meals): void {
    console.log(`오늘의 ${meal} 메뉴 추천입니다 ヾ(≧▽≦*)o`);
    const menuList = this.getMenuList(meal);
    const menu = this.getRandomOne(menuList);
    const postposition = this.getObjectivePostposition(menu);
    console.log(`오늘 ${meal}에는 ${menu}${postposition} 먹어보는 게 어떨까요?`);
  }

  private getMenuList(meal: Meals): readonly string[] {
    switch (meal) {
      case Meals.BREAKFAST:
        return breakfast;
      case Meals.LUNCH:
        return lunch;
      case Meals.DINNER:
        return dinner;
      default:
        throw new Error('Server Error');
    }
  }

  private getRandomOne(arr: readonly string[]): string {
    const IDX = Math.floor(Math.random() * arr.length);
    return arr[IDX];
  }

  private getObjectivePostposition(objective: string): ObjectiveProposition {
    const lastLetter = objective.charCodeAt(objective.length - 1);

    if (lastLetter < 0xac00 || lastLetter > 0xd7a3) throw new Error('Server Error');
    return (lastLetter - 0xac00) % 28 > 0 ? ObjectiveProposition.ENDED_WITH_CONSONANT : ObjectiveProposition.ENDED_WITH_VOWEL;
  }

  public generateSecretMessage(message: string, secretNum: number): string {
    let newMessage = '';

    try {
      for (let i = 0; i < message.length; i++) {
        newMessage += String.fromCharCode(message.charCodeAt(i) + secretNum);
      }
    } catch (error) {
      console.log(error);
    }

    return newMessage;
  }
}
