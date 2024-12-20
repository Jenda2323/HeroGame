"use strict";
console.log("Script is running");
window.onload = function () {
  console.log("Page loaded");
};

import { heroes } from "./persons/heroes.js";
import { enemies } from "./persons/bestiary.js";

let selectedHero = "";
let heroStats = {};
let selectedEnemy = "";
let enemyStats = {};
let enemyHP = 0;
let heroHP = 0;

// Funkce pro výběr hrdiny
document.querySelectorAll(".hero").forEach((button) => {
  button.addEventListener("click", (event) => {
    selectedHero = event.target.getAttribute("data-hero");
    heroStats = heroes[selectedHero];
    heroHP = heroStats.health;
    document.getElementById(
      "selected-hero"
    ).innerHTML = `${heroStats.name}<br><br>Zdraví: ${heroStats.health} HP | ${heroStats.weapon} (1-${heroStats.attack} dmg) | ${heroStats.armor} (${heroStats.defense} def)`;
    document.getElementById("start-game-btn").disabled = false;
  });
});

// Funkce pro začátek nové hry
document.getElementById("start-game-btn").addEventListener("click", () => {
  document.querySelector(".hero-selection").style.display = "none";
  document.querySelector(".start").style.display = "block";
});

//uvod//
document.getElementById("start-btn-1").addEventListener("click", () => {
  document.querySelector(".start").style.display = "none";
  document.querySelector(".enemy-selection").style.display = "block";
});

// vyber nepritele poprve
document.querySelectorAll(".enemy").forEach((button) => {
  button.addEventListener("click", (event) => {
    selectedEnemy = event.target.getAttribute("data-enemy");
    enemyStats = enemies[selectedEnemy];
    enemyHP = enemyStats.health;
    document.getElementById(
      "selected-enemy"
    ).innerHTML = `${enemyStats.name}<br><br>Zdraví: ${enemyStats.health} HP | ${enemyStats.weapon} (1-${enemyStats.attack} dmg) | ${enemyStats.armor} (${enemyStats.defense} def)`;
    document.getElementById("choose-enemy-btn").disabled = false;
  });
});

// Funkce pro vynulování zpráv o poškození
function resetCombatMessages() {
  document.querySelector(".damageToEnemy").textContent = "";
  document.querySelector(".damageToHero").textContent = "";
  document.querySelector(".hero-info").textContent = "";
  document.querySelector(".enemy-info").textContent = "";
}

// zacni boj
document.getElementById("choose-enemy-btn").addEventListener("click", () => {
  document.querySelector(".enemy-selection").style.display = "none";
  document.querySelector(".fight").style.display = "block";

  document.querySelector(".hero-hp").textContent = `Hrdina má: ${heroHP} HP`;
  document.querySelector(
    ".enemy-hp"
  ).textContent = `${enemyStats.name} má: ${enemyHP} HP`;
  resetCombatMessages();
});

//funkce pro attack
function attackEnemy() {
  const heroDamage = Math.floor(Math.random() * heroStats.attack) + 1;
  const enemyDamage = Math.floor(Math.random() * 10) + 1;

  const realDamagetoHero = Math.max(enemyDamage - heroStats.defense, 0);
  const realDamageToEnemy = Math.max(heroDamage - enemyStats.defense, 0);
  heroHP -= realDamagetoHero;
  enemyHP -= realDamageToEnemy;

  const enemyHpElement = document.querySelector(".enemy-hp");
  const heroHpElement = document.querySelector(".hero-hp");
  const damageToEnemy = document.querySelector(".damageToEnemy");
  const damageToHero = document.querySelector(".damageToHero");
  const heroInfo = document.querySelector(".hero-info");
  const enemyInfo = document.querySelector(".enemy-info");

  if (enemyHP <= 0) {
    enemyHpElement.textContent = `${enemyStats.name} je poražen!`;
    endGame("Hrdina vyhrál!");
  } else {
    enemyHpElement.textContent = `${enemyStats.name} má: ${enemyHP} HP`;
    damageToEnemy.textContent = `${enemyStats.name} je zraněn o ${realDamageToEnemy} HP`;
    enemyInfo.textContent = `${heroDamage} dmg - ${enemyStats.defense} def = ${realDamageToEnemy}`;
  }
  if (heroHP <= 0) {
    heroHpElement.textContent = "Hrdina je poražen!";
    endGame("Nepřítel vyhrál!");
  } else {
    heroHpElement.textContent = `Hrdina má: ${heroHP} HP`;
    damageToHero.textContent = `Hrdina je zraněn o ${realDamagetoHero} HP`;
    heroInfo.textContent = `${enemyDamage} dmg - ${heroStats.defense} def = ${realDamagetoHero}`;
  }
}
document.querySelector(".attack-btn").addEventListener("click", attackEnemy);

// Restart button
document.getElementById("restart-game-btn").addEventListener("click", () => {
  location.reload();
});

// Konec
function endGame(message) {
  const attackBtn = document.querySelector(".attack-btn");
  const restartBtn = document.getElementById("restart-game-btn");

  attackBtn.disabled = true;
  restartBtn.style.display = "block";
  alert(message);
}
