import { RegionInfo } from 'pages/Home';
import { css } from 'styled-components';

export enum FontSize {
  sm = '10px',
  md = '12px',
  lg = '15px',
  h1 = '33px',
  h2 = '29px',
  h3 = '26px',
  main = '36px',
}
export enum Colors {
  main_01 = '#B0DBFC',
  main_02 = '#66BFFF',
  main_03 = '#62A3F4',
  main_04_white = '#F3F3F3',
  button_blue = '#62A3F4',
  button_text = '#FDFFEC',
  button_clicked = '#486AC2',
  button_hover = '#FDFFEC',
  text_warn = '#FF4848',
  text_black = '#0C0D0E',
  text_grey = '#828282',
  text_white = '#FFFFFF',
  text_green = '#81EE7F',
  border_001 = '#E3E6E8',
  border_002 = '#D6D9DC',
  border_003 = '#C8CCD0',
  board_color = '#FFFFFF',
  boardlist_color = 'rgba(0,255,255,0.3)',
  Modal = 'rgba(192, 184, 184, 0.1)',
}
export enum DarkMode {
  borad_background = 'rgba(222, 217, 217, 0.778)',
}
export enum ImageSize {
  sm = '3rem',
  md = '10rem',
  lg = '20rem',
}
export enum ScreenSize {
  max_height = '1400px',
  middle_height = '900px',
  footer_height = '200px',
  max_width = '1250px',
}
export enum Route {
  mainPage = '/',
  home = '/home',
  blog = '/board/bloglist',
  blog_detail = '/board/boarddetails/:id',
  blog_post = '/board/blogpost',
  question = '/board/questionlist/',
  question_detail = '/board/questiondetails/:id',
  question_post = '/board/questionpost',
  signin = '/board/signin',
  signup = '/board/signup',
}
export const cities = [
  {
    city: '서울',

    url: 'https://lh5.googleusercontent.com/p/AF1QipPGl6MqUOpA-oR3QcdGBgaWh67smtnDY1s05ps4=w240-h160-k-no',
    content:
      '서울은 아시아에서 가장 분주하기로 유명한 시장과 화려한 밤문화부터, 아름다운 정원으로 둘러싸인 조선시대 궁궐과 고요하고 차분한 찻집에 이르기까지 다채로운 매력을 뽐내고 있는 곳이지요.서울은 언제나 젊음의 활기로 넘치는데요, 시내 곳곳에서 다양한 미술관, 영화관, 바, 부티크 등을 쉽게 만나실 수 있어요. 과거의 모습도 잘 간직하고 있는 서울에서는 조선시대 궁궐이나 극장에서 우리 전통 문화도 다양하게 접하실 수 있답니다.',
  },
  {
    city: '부산',

    url: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/246000/246849-Busan.jpg',
    content:
      '관광지로서 서울이나 다른 지역과 비교하자면 대도시로서 식도락과 쇼핑이 가능하면서도 동시에 다른 대도시에서는 찾아보기 힘든 유명한 해수욕장이 있습니다. 동해와 남해가 나뉘는 교차점이 있어 절벽, 삼각주 등이 발달한 다양한 해안선에 온천 등 자연적인 관광지까지 같이 어우러져 있어 다양한 형태의 관광을 즐길 수 있습니다.',
  },

  {
    city: '충청',

    url: 'https://lh3.googleusercontent.com/p/AF1QipOhC1DcnaYiD-LFAfC_eWmw7zBFCiYc1C65MKp8=s1360-w1360-h1020',
    content:
      '충청도 자연경관이 많이 남아 있는 곳이라 다양한 생태공원과 해수욕장들이 많이 있는 편입니다. 또한 각 도시마다 대표적인 먹거리들도 많습니다.',
  },
  {
    city: '강원',
    url: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=762626fd-da4c-4be1-a777-e0bd4e2e38d3',
    content:
      '서울의 화려한 불빛과 북적이는 소음에서 벗어나 기차를 타고 쉽게 도착할 수 있는 강원도로 향해 보세요. 강원도의 대부분 지역에는 아름다운 산과 한적한 국립공원이 있습니다. 낮에는 숲속 길을 따라 하이킹을 하거나 등산을 해보세요. 아니면 평화로운 호숫가와 해변에서 여유를 만끽하실 수도 있습니다.',
  },
  {
    city: '전라',
    url: 'https://images.unsplash.com/photo-1653230675261-fe00bde32c8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fCVFQyVBMCU4NCVFQyVBMyVCQyVFRCU5NSU5QyVFQyU5OCVBNSVFQiVBNyU4OCVFQyU5RCU4NHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60',
    content:
      '전라도는 예부터 볼거리가 많고 음식이 맛있기로 소문난 동네다. 전주와 군산을 비롯한 전라북도여행, 목포와 순천 ,보성, 담양 등의 전라남도 여행코스는  사계절 내내 꾸준한 사랑을 받고있습니다. 옛날 문화 유적지 부터 항구도시까지 다채로운 특징을 가진 지역들이 밀집되어 있습니다.',
  },
  {
    city: '울산',
    url: 'https://tour.ulsan.go.kr/storyCms1/getImage.do?atchFileId=FILE_000000000002368&fileSn=0',
    content:
      '울산광역시는 대한민국 남동부에 있는 광역시로 항구도시가 많은 것이 특징입니다. 항구도시 뿐만이 아니라 다양한 공원들 또한 이 도시의 큰 특징이기도 합니다.',
  },
  {
    city: '경기',
    url: 'https://heritage.unesco.or.kr/wp-content/uploads/2019/04/hd6_394_i1.jpg',
    content:
      '서울을 둘러싸고있는 경기도는 대한민국의 맨 끝과 중간까지 뻗어있습니다. 각 위치마다 다양한 특징을 가지고 있으며 수원화성, 광교호수공원 등 요즘 인기 있는 관광지들이 많이 있는것이 특징입니다.',
  },
  {
    city: '인천',
    url: 'https://enews.incheon.go.kr/upload/editor/20210426/0ff523ad-9ab9-45ae-933b-f3363847bf07.jpg',
    content:
      '인천하면 대표적으로 월미도, 차이나타운, 송도등 여러가지 떠오르는 키워드가 많을 정도로 특색있는 관광지가 많습니다.',
  },
  {
    city: '제주',
    url: 'https://a.cdn-hotels.com/gdcs/production142/d1508/0c0c0ffc-ffca-4fad-91a8-edfa3d125067.jpg?impolicy=fcrop&w=1600&h=1066&q=medium',
    content:
      '서울에서 비행기로 1시간 거리에 있는 제주도는 한국에서 가장 큰 섬입니다. 화산 활동으로 생긴 한라산, 오름, 주상절리 등 볼거리가 풍부해 한국의 대표적 여행지로 꼽히는 곳 중 하나입니다. 국내뿐만 아니라 해외여행객들도 많이 찾는 대표적인 곳중 하나라 할 수 있습니다.',
  },
];
