import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core/index";
import { useMonsters } from "./monsters";

export const useFilters = defineStore("filters", {
  hydrate(storeState, initialState) {
    storeState.size = useLocalStorage("size", []);
    storeState.legendary = useLocalStorage("legendary", []);
    storeState.type = useLocalStorage("type", []);
    storeState.environment = useLocalStorage("environment", []);
    storeState.cr = useLocalStorage("cr", {
      min: 0,
      max: 33,
    });
  },
  state: () => {
    return {
      defaults: {
        alignment: {
          bits: 1023,
        },
        size: [],
        legendary: [],
        type: [],
        environment: [],
        cr: {
          min: 0,
          max: 33,
        },
      },
      alignment: {
        bits: 1023,
      },
      size: useLocalStorage("size", []),
      sizeOptions: [
        { value: "tiny", label: "Tiny" },
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
        { value: "huge", label: "Huge" },
        { value: "gargantuan", label: "Gargantuan" },
      ],
      legendary: useLocalStorage("legendary", []),
      legendaryOptions: [
        { value: "ordinary", label: "Ordinary" },
        { value: "legendary", label: "Legendary" },
        { value: "legendary_lair", label: "Legendary (in lair)" },
      ],
      type: useLocalStorage("type", []),
      typeOptions: [
        { value: "aberration", label: "Aberration" },
        { value: "beast", label: "Beast" },
        { value: "celestial", label: "Celestial" },
        { value: "construct", label: "Construct" },
        { value: "dragon", label: "Dragon" },
        { value: "elemental", label: "Elemental" },
        { value: "fey", label: "Fey" },
        { value: "fiend", label: "Fiend" },
        { value: "giant", label: "Giant" },
        { value: "humanoid", label: "Humanoid" },
        { value: "monstrosity", label: "Monstrosity" },
        { value: "ooze", label: "Ooze" },
        { value: "plant", label: "Plant" },
        { value: "undead", label: "Undead" },
      ],
      environment: useLocalStorage("environment", []),
      cr: useLocalStorage("cr", {
        min: 0,
        max: 33,
      }),
      crValues: [
        { value: "0", label: "0" },
        { value: "1/8", label: "1/8" },
        { value: "1/4", label: "1/4" },
        { value: "1/2", label: "1/2" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
        { value: "13", label: "13" },
        { value: "14", label: "14" },
        { value: "15", label: "15" },
        { value: "16", label: "16" },
        { value: "17", label: "17" },
        { value: "18", label: "18" },
        { value: "19", label: "19" },
        { value: "20", label: "20" },
        { value: "21", label: "21" },
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" },
        { value: "26", label: "26" },
        { value: "27", label: "27" },
        { value: "28", label: "28" },
        { value: "29", label: "29" },
        { value: "30", label: "30" },
      ],
    };
  },
  actions: {
    reset() {
      return [
        "alignment",
        "size",
        "type",
        "environment",
        "legendary",
        "cr",
      ].forEach(
        (field) =>
          (this[field] = JSON.parse(JSON.stringify(this.defaults[field])))
      );
    },
    isDefault(field) {
      return (
        JSON.stringify(this[field]) === JSON.stringify(this.defaults[field])
      );
    },
  },
  getters: {
    minCr() {
      return parseInt(this.crValues[this.cr.min].value);
    },
    maxCr() {
      return parseInt(this.crValues[this.cr.max].value);
    },
    nonDefault() {
      return [
        "alignment",
        "size",
        "type",
        "environment",
        "legendary",
        "cr",
      ].filter(
        (field) =>
          JSON.stringify(this[field]) !== JSON.stringify(this.defaults[field])
      ).length;
    },
    environmentOptions() {
      const monsters = useMonsters();

      let results = new Set(
        monsters.all
          .filter(Boolean)
          .map((monster) => {
            return monster.environment
              .split(",")
              .map(
                (item) =>
                  item.trim().toUpperCase().slice(0, 1) +
                  item.trim().substring(1)
              );
          })
          .flat()
          .filter(Boolean)
      );

      return Array.from(results).sort();
    },
  },
});
