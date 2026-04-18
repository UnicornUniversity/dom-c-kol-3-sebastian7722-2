const YEAR_IN_MS = 365.25 * 24 * 60 * 60 * 1000;
const WORKLOADS = [10, 20, 30, 40];
const GENDERS = ["male", "female"];

const MALE_NAMES = [
  "Jan",
  "Petr",
  "Pavel",
  "Tomáš",
  "Josef",
  "Lukáš",
  "Martin",
  "Marek",
  "Jiří",
  "Michal",
  "Jakub",
  "Ondřej",
  "Filip",
  "David",
  "Adam",
  "Daniel",
  "Roman",
  "Patrik",
  "Vojtěch",
  "Matěj",
  "Radek",
  "Karel",
  "Milan",
  "Vratislav",
  "Zdeněk",
];

const FEMALE_NAMES = [
  "Jana",
  "Petra",
  "Eva",
  "Lucie",
  "Marie",
  "Kateřina",
  "Veronika",
  "Tereza",
  "Anna",
  "Kristýna",
  "Barbora",
  "Eliška",
  "Monika",
  "Alena",
  "Nikola",
  "Karolína",
  "Klára",
  "Zuzana",
  "Jiřina",
  "Iveta",
  "Lenka",
  "Markéta",
  "Michaela",
  "Simona",
  "Gabriela",
];

const MALE_SURNAMES = [
  "Novák",
  "Svoboda",
  "Novotný",
  "Dvořák",
  "Černý",
  "Procházka",
  "Kučera",
  "Veselý",
  "Horák",
  "Němec",
  "Marek",
  "Pospíšil",
  "Pokorný",
  "Hájek",
  "Jelínek",
  "Král",
  "Růžička",
  "Beneš",
  "Fiala",
  "Sedláček",
  "Doležal",
  "Navrátil",
  "Blažek",
  "Sýkora",
  "Ptáček",
];

const FEMALE_SURNAMES = [
  "Nováková",
  "Svobodová",
  "Novotná",
  "Dvořáková",
  "Černá",
  "Procházková",
  "Kučerová",
  "Veselá",
  "Horáková",
  "Němcová",
  "Marková",
  "Pospíšilová",
  "Pokorná",
  "Hájková",
  "Jelínková",
  "Králová",
  "Růžičková",
  "Benešová",
  "Fialová",
  "Sedláčková",
  "Doležalová",
  "Navrátilová",
  "Blažková",
  "Sýkorová",
  "Ptáčková",
];

/**
 * Returns a random integer from interval <0, maxExclusive).
 * @param {number} maxExclusive upper bound for generated integer
 * @returns {number} random integer
 */
function getRandomInt(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

/**
 * Creates a shuffled copy of the provided array.
 * @template T
 * @param {T[]} values source values
 * @returns {T[]} shuffled values
 */
function shuffle(values) {
  const shuffled = [...values];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = getRandomInt(index + 1);
    const currentValue = shuffled[index];

    shuffled[index] = shuffled[randomIndex];
    shuffled[randomIndex] = currentValue;
  }

  return shuffled;
}

/**
 * Builds a sequence that contains every option and then shuffles it.
 * @template T
 * @param {T[]} options available values
 * @param {number} count desired sequence length
 * @returns {T[]} randomized sequence
 */
function buildGuaranteedSequence(options, count) {
  if (count <= 0) {
    return [];
  }

  const sequence = [];

  for (let index = 0; index < count; index += 1) {
    sequence.push(options[index % options.length]);
  }

  return shuffle(sequence);
}

/**
 * Generates unique birthdates inside the requested age interval.
 * @param {number} count required number of birthdates
 * @param {{min: number, max: number}} age age interval in years
 * @returns {string[]} birthdates in ISO format
 */
function buildBirthdatePool(count, age) {
  const now = Date.now();
  const youngestTimestamp = now - age.min * YEAR_IN_MS;
  const oldestTimestamp = now - age.max * YEAR_IN_MS;
  const usedBirthdates = new Set();
  const birthdates = [];

  while (birthdates.length < count) {
    const randomTimestamp =
      oldestTimestamp + Math.random() * (youngestTimestamp - oldestTimestamp);
    const birthdate = new Date(randomTimestamp).toISOString();

    if (usedBirthdates.has(birthdate)) {
      continue;
    }

    usedBirthdates.add(birthdate);
    birthdates.push(birthdate);
  }

  return birthdates;
}

/**
 * Creates a cyclic picker over a shuffled list of names.
 * @param {string[]} names available names or surnames
 * @returns {(index: number) => string} picker function
 */
function createNamePicker(names) {
  const shuffledNames = shuffle(names);

  return (index) => shuffledNames[index % shuffledNames.length];
}

/**
 * Generates random employees in the required dtoOut structure.
 * @param {object} dtoIn contains count of employees and age interval {min, max}
 * @returns {Array} of employees
 */
export function main(dtoIn) {
  const genders = buildGuaranteedSequence(GENDERS, dtoIn.count);
  const workloads = buildGuaranteedSequence(WORKLOADS, dtoIn.count);
  const birthdates = buildBirthdatePool(dtoIn.count, dtoIn.age);
  const maleNamePicker = createNamePicker(MALE_NAMES);
  const femaleNamePicker = createNamePicker(FEMALE_NAMES);
  const maleSurnamePicker = createNamePicker(MALE_SURNAMES);
  const femaleSurnamePicker = createNamePicker(FEMALE_SURNAMES);
  let maleIndex = 0;
  let femaleIndex = 0;

  return genders.map((gender, index) => {
    const isMale = gender === "male";
    const nameIndex = isMale ? maleIndex : femaleIndex;
    const namePicker = isMale ? maleNamePicker : femaleNamePicker;
    const surnamePicker = isMale ? maleSurnamePicker : femaleSurnamePicker;

    if (isMale) {
      maleIndex += 1;
    } else {
      femaleIndex += 1;
    }

    return {
      gender,
      birthdate: birthdates[index],
      name: namePicker(nameIndex),
      surname: surnamePicker(nameIndex),
      workload: workloads[index],
    };
  });
}
