/**
 * 假名練習工具函式
 * 
 * 此模組提供假名資料存取與隨機抽取功能。
 * 資料直接從本地 JSON 檔案載入，無需後端 API。
 */

import kanaData from "./data/kanaData.json";

/**
 * 根據假名類型和分類取得假名列表
 * 
 * @param {string} kanaType - 假名類型 ('hiragana', 'katakana', 'all_kanas')
 * @param {string} category - 分類 ('seion', 'dakuon_handaon', 'youon', 'all')
 * @returns {Array} 假名物件陣列，每個包含 { kana, romaji }
 * 
 * @example
 * // 取得平假名清音
 * const kanas = getKanasByTypeAndCategory('hiragana', 'seion');
 * 
 * @example
 * // 取得所有片假名
 * const kanas = getKanasByTypeAndCategory('katakana', 'all');
 */
const getKanasByTypeAndCategory = (kanaType, category) => {
  // 處理「全部假名」的情況
  if (kanaType === "all_kanas") {
    return getAllKanas();
  }

  // 檢查假名類型是否存在
  const typeData = kanaData[kanaType];
  if (!typeData) {
    console.error(`假名類型 '${kanaType}' 不存在`);
    return [];
  }

  // 處理「該類型全部」的情況
  if (category === "all") {
    const allInType = [];
    for (const categoryName of Object.keys(typeData)) {
      const categoryItems = typeData[categoryName];
      for (const item of categoryItems) {
        allInType.push({
          kana: item.kana,
          romaji: item.romaji,
          kanaType: kanaType,
          category: categoryName,
        });
      }
    }
    return allInType;
  }

  // 處理特定分類
  const categoryData = typeData[category];
  if (!categoryData) {
    console.error(`分類 '${category}' 不存在於 '${kanaType}'`);
    return [];
  }

  return categoryData.map((item) => ({
    kana: item.kana,
    romaji: item.romaji,
    kanaType: kanaType,
    category: category,
  }));
};

/**
 * 取得所有假名（平假名 + 片假名）
 * 
 * @returns {Array} 所有假名物件陣列
 */
const getAllKanas = () => {
  const allKanas = [];
  
  for (const kanaType of Object.keys(kanaData)) {
    const typeData = kanaData[kanaType];
    for (const category of Object.keys(typeData)) {
      const categoryItems = typeData[category];
      for (const item of categoryItems) {
        allKanas.push({
          kana: item.kana,
          romaji: item.romaji,
          kanaType: kanaType,
          category: category,
        });
      }
    }
  }
  
  return allKanas;
};

// 用於避免短時間內重複出現相同假名
const recentIndexes = [];
const MAX_RECENT_INDEXES = 16;

/**
 * 從假名列表中隨機取得一個假名
 * 會避免連續抽到最近 16 個已抽過的假名
 * 
 * @param {Array} kanas - 假名物件陣列
 * @returns {Object} 隨機選中的假名物件 { kana, romaji }
 */
const getRandomKana = (kanas) => {
  if (!kanas || kanas.length === 0) {
    return { kana: "", romaji: [] };
  }

  let index;
  do {
    index = Math.floor(Math.random() * kanas.length);
  } while (recentIndexes.includes(index) && kanas.length > MAX_RECENT_INDEXES);

  recentIndexes.push(index);
  if (recentIndexes.length > MAX_RECENT_INDEXES) {
    recentIndexes.shift();
  }

  return kanas[index];
};

export { getKanasByTypeAndCategory, getRandomKana };
