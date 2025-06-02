/********************************************************************************
* WEB700 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Harmon Tuazon Student ID: 165229220 Date: 06-02-2025
*
* Published URL: https://assignment-3-web-700-naa.vercel.app/
*
********************************************************************************/

class legoData {
  constructor(sets = []) {
    this.sets = sets;
  }

  initialize() {
    return new Promise((resolve, reject) => {
      try {
        const setData = require("../data/setData");
        const themeData = require("../data/themeData");

        this.sets = [];

        setData.forEach(set => {
          let themeSet = themeData.find(theme => theme.id === set.theme_id);
          let themeName;

          if (themeSet) {
            themeName = themeSet.name;
          } else {
            themeName = "Unknown";
          }

          this.sets.push({
            ...set,
            theme: themeName
          });
        });

        resolve(); // Done initializing
      } catch (error) {
        reject("Failed to initialize data: " + error.message);
      }
    });
  }

  getAllSets() {
    return new Promise((resolve, reject) => {
      if (this.sets.length === 0) {
        reject("No sets found. Did you run initialize()?");
      } else {
        resolve(this.sets);
      }
    });
  }

  getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const foundSet = this.sets.find(set => set.set_num === setNum);

      if (foundSet) {
        resolve(foundSet);
      } else {
        reject("Set with set_num '" + setNum + "' not found.");
      }
    });
  }

  getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const chosenTheme = theme.toLowerCase();
      const filteredSets = this.sets.filter(set => {
        return set.theme.toLowerCase().includes(chosenTheme);
      });

      if (filteredSets.length > 0) {
        resolve(filteredSets);
      } else {
        reject("No sets found with theme matching '" + theme + "'.");
      }
    });
  }
}






module.exports = legoData;
