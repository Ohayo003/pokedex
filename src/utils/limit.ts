export const newLimit = (idx: number) => {
  let newLimit: number = 1;
  switch (idx) {
    case 10:
      return (newLimit = 200);
    case 20:
      return (newLimit = 300);
    case 30:
      return (newLimit = 400);
    case 40:
      return (newLimit = 500);
    case 50:
      return (newLimit = 600);
    case 60:
      return (newLimit = 700);
    case 70:
      return (newLimit = 800);
    case 80:
      return (newLimit = 900);
    case 90:
      return (newLimit = 1000);
    case 100:
      return (newLimit = 1100);
    default:
      return (newLimit = 100);
  }
};
