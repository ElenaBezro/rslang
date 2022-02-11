const getRandomElement = <T>(values: T[], ...valuesToExclude: T[]): { index: number, value: T } | undefined => {
  const options = valuesToExclude.length ? values.filter(value => !valuesToExclude.includes(value)) : values;
  if (!options.length) {
    return undefined;
  }

  const index = Math.floor(options.length * Math.random());
  return { index, value: options[index] };
};

const shuffle = (arr: unknown[]): void => {
  arr.forEach((_, index) => {
    const randomValue = getRandomElement(arr);
    if (randomValue) {
      [arr[index], arr[randomValue.index]] = [randomValue.value, arr[index]];
    }
  });
};


export { getRandomElement, shuffle, };