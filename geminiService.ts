
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const askHistorian = async (question: string) => {
  if (!API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = 'gemini-3-flash-preview';

  const systemInstruction = `
    Сен - кыргыздын залкар тарыхчысы Осмонаалы Сыдык уулу жөнүндө эң так маалымат билген экспертсиң.
    МААНИЛҮҮ ФАКТЫЛАР:
    1. Осмонаалы Сыдык уулу (1875-1942).
    2. Туулган жери: Кочкор өрөөнү, Абайылда болушу.
    3. Китептери: "Мухтасар тарых-и Кыргызия" (1913-ж., Уфа), "Тарых-и Шадмания" (1915-ж., Уфа).
    4. Ал кыргыз тарыхын кыргыз тилинде (араб арибинде) жазган биринчи окумуштуу.
    5. 1916-жылкы Үркүндөн кийин Кытайда жашап калган.
    6. Ал "тарых атасы" жана кыргыз санжырасынын негиздөөчүсү деп аталат.
    
    Сен колдонуучунун суроолоруна ушул фактылардын негизинде гана жооп беришиң керек. Эгер суроо тарыхый ката камтыса, аны сылыктык менен оңдоп жооп бер. Жоопторду кыргыз тилинде, илимий-популярдуу стилде жаз.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Тактык үчүн температураны төмөндөттүк
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Кечириңиз, маалымат алууда ката кетти. Сураныч, кайра аракет кылып көрүңүз.";
  }
};
