export const newLimit = (idx: number) => {
  let newLimit: number = 1;
  switch (idx) {
    case 10:
      newLimit = 2;
      break;
    case 20:
      newLimit = 3;
      break;
    case 30:
      newLimit = 4;
      break;
    case 40:
      newLimit = 5;
      break;
    case 50:
      newLimit = 6;
      break;
    case 60:
      newLimit = 7;
      break;
    case 70:
      newLimit = 8;
      break;
    case 80:
      newLimit = 9;
      break;
    case 90:
      newLimit = 10;
      break;
    case 100:
      newLimit = 11;
      break;
    default:
      newLimit = 1;
      break;
  }
  return newLimit;
};
