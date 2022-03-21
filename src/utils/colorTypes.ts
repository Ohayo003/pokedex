
const colorTypes = (element: string) => {
    var color: string = "";
    switch (element) {
      case "normal":
        color = "#A8A878";
        break;
      case "fire":
        color = "#F08030";
        break;
      case "water":
        color = "#6890F0";
        break;
      case "grass":
        color = "#78C850";
        break;
      case "electric":
        color = "#F8D030";
        break;
      case "ice":
        color = "#98D8D8";
        break;
      case "fighting":
        color = "#C03028";
        break;
      case "poison":
        color = "#A040A0";
        break;
      case "ground":
        color = "#E0C068";
        break;
      case "flying":
        color = "#A890F0";
        break;
      case "psychic":
        color = "#F85888";
        break;
      case "bug":
        color = "#A8B820";
        break;
      case "rock":
        color = "#B8A038";
        break;
      case "ghost":
        color = "#705898";
        break;
      case "dark":
        color = "#705848";
        break;
      case "dragon":
        color = "#7038F8";
        break;
      case "steel":
        color = "#B8B8D0";
        break;
      case "fairy":
        color = "#F0B6BC";
        break;
      default:
        break;
    }
    return color;
  };
  export default colorTypes;
  