const Region = require("../models/krajModel");
const connectDB = require("../utils/db");

const regions = [
  {
    name: "Hlavní město Praha",
    slug: "hlavni-mesto-praha",
    districts: [
      { name: "Praha 1" },
      { name: "Praha 2" },
      { name: "Praha 3" },
      { name: "Praha 4" },
      { name: "Praha 5" },
      { name: "Praha 6" },
      { name: "Praha 7" },
      { name: "Praha 8" },
      { name: "Praha 9" },
      { name: "Praha 10" },
    ],
  },
  {
    name: "Středočeský kraj",
    slug: "stredocesky-kraj",
    districts: [
      { name: "Benešov" },
      { name: "Beroun" },
      { name: "Kladno" },
      { name: "Kolín" },
      { name: "Kutná Hora" },
      { name: "Mělník" },
      { name: "Mladá Boleslav" },
      { name: "Nymburk" },
      { name: "Praha-východ" },
      { name: "Praha-západ" },
      { name: "Příbram" },
      { name: "Rakovník" },
    ],
  },
  {
    name: "Jihočeský kraj",
    slug: "jihocesky-kraj",
    districts: [
      { name: "České Budějovice" },
      { name: "Český Krumlov" },
      { name: "Jindřichův Hradec" },
      { name: "Písek" },
      { name: "Prachatice" },
      { name: "Strakonice" },
      { name: "Tábor" },
    ],
  },
  {
    name: "Plzeňský kraj",
    slug: "plzensky-kraj",
    districts: [
      { name: "Domažlice" },
      { name: "Klatovy" },
      { name: "Plzeň-město" },
      { name: "Plzeň-jih" },
      { name: "Plzeň-sever" },
      { name: "Rokycany" },
      { name: "Tachov" },
    ],
  },
  {
    name: "Karlovarský kraj",
    slug: "karlovarsky-kraj",
    districts: [
      { name: "Cheb" },
      { name: "Karlovy Vary" },
      { name: "Sokolov" },
    ],
  },
  {
    name: "Ústecký kraj",
    slug: "ustecky-kraj",
    districts: [
      { name: "Děčín" },
      { name: "Chomutov" },
      { name: "Litoměřice" },
      { name: "Louny" },
      { name: "Most" },
      { name: "Teplice" },
      { name: "Ústí nad Labem" },
    ],
  },
  {
    name: "Liberecký kraj",
    slug: "liberecky-kraj",
    districts: [
      { name: "Česká Lípa" },
      { name: "Jablonec nad Nisou" },
      { name: "Liberec" },
      { name: "Semily" },
    ],
  },
  {
    name: "Královéhradecký kraj",
    slug: "kralovehradecky-kraj",
    districts: [
      { name: "Hradec Králové" },
      { name: "Jičín" },
      { name: "Náchod" },
      { name: "Rychnov nad Kněžnou" },
      { name: "Trutnov" },
    ],
  },
  {
    name: "Pardubický kraj",
    slug: "pardubicky-kraj",
    districts: [
      { name: "Chrudim" },
      { name: "Pardubice" },
      { name: "Svitavy" },
      { name: "Ústí nad Orlicí" },
    ],
  },
  {
    name: "Kraj Vysočina",
    slug: "kraj-vysocina",
    districts: [
      { name: "Havlíčkův Brod" },
      { name: "Jihlava" },
      { name: "Pelhřimov" },
      { name: "Třebíč" },
      { name: "Žďár nad Sázavou" },
    ],
  },
  {
    name: "Jihomoravský kraj",
    slug: "jihomoravsky-kraj",
    districts: [
      { name: "Blansko" },
      { name: "Brno-město" },
      { name: "Brno-venkov" },
      { name: "Břeclav" },
      { name: "Hodonín" },
      { name: "Vyškov" },
      { name: "Znojmo" },
    ],
  },
  {
    name: "Olomoucký kraj",
    slug: "olomoucky-kraj",
    districts: [
      { name: "Jeseník" },
      { name: "Olomouc" },
      { name: "Prostějov" },
      { name: "Přerov" },
      { name: "Šumperk" },
    ],
  },
  {
    name: "Zlínský kraj",
    slug: "zlinsky-kraj",
    districts: [
      { name: "Kroměříž" },
      { name: "Uherské Hradiště" },
      { name: "Vsetín" },
      { name: "Zlín" },
    ],
  },
  {
    name: "Moravskoslezský kraj",
    slug: "moravskoslezsky-kraj",
    districts: [
      { name: "Bruntál" },
      { name: "Frýdek-Místek" },
      { name: "Karviná" },
      { name: "Nový Jičín" },
      { name: "Opava" },
      { name: "Ostrava-město" },
    ],
  },
];

const initRegions = async () => {
  try {
    await connectDB();

    for (const region of regions) {
      const existingRegion = await Region.findOne({ slug: region.slug });

      if (existingRegion) {
        // Aktualizace okresů, pokud se liší
        const existingDistricts = existingRegion.districts.map((d) => d.name);
        const newDistricts = region.districts.map((d) => d.name);

        const districtsToAdd = newDistricts.filter(
          (d) => !existingDistricts.includes(d)
        );
        if (districtsToAdd.length > 0) {
          existingRegion.districts.push(
            ...districtsToAdd.map((name) => ({ name }))
          );
          await existingRegion.save();
          console.log(`Aktualizovány okresy pro kraj: ${region.name}`);
        }
      } else {
        // Přidání nového kraje
        await Region.create(region);
        console.log(`Přidán nový kraj: ${region.name}`);
      }
    }

    console.log("Data byla úspěšně synchronizována");
    process.exit();
  } catch (error) {
    console.error("Chyba při synchronizaci dat:", error);
    process.exit(1);
  }
};

initRegions();

// spustění pomocí : node scripts/initRegions.js
