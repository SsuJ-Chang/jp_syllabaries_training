import axios from "axios";

const fetchKanasAndCacheInSession = async (kanaType, category, apiBaseUrl) => {
  const pageName = `${kanaType}_${category}`;
  const cachedData = sessionStorage.getItem(pageName);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(
      kanaType === "all_kanas"
        ? `${apiBaseUrl}/api/all_kanas`
        : `${apiBaseUrl}/api/${kanaType}/${category}`
    );
    
    const kanas = response.data;
    sessionStorage.setItem(pageName, JSON.stringify(kanas));
    return kanas;
  } catch (error) {
    console.error("Error fetching kana data:", error);
    return [];
  }
};

const recentIndexes = [];
const MAX_RECENT_INDEXES = 7;
const getRandomKana = (kanas) => {
  // 紀錄 index 避免短時間內重複
  let index;
  do {
    index = Math.floor(Math.random() * kanas.length);
  } while (recentIndexes.includes(index));
  recentIndexes.push(index);
  console.log("recentIndexes: ", recentIndexes)
  if (recentIndexes.length > MAX_RECENT_INDEXES) {
    recentIndexes.shift();
  }

  return kanas[index];
};

export { fetchKanasAndCacheInSession, getRandomKana };
