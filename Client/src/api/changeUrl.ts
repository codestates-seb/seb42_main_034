export const changeUrl = (url: string) => {
  return decodeURIComponent(url);
};

function isKoreanWord(word: string): boolean {
  const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/; // matches any Korean character

  return koreanRegex.test(word);
}
