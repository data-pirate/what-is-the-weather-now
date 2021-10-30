export default async function getData(city) {
    const API_KEY = "a5116fd235f28aefcf0bf570861c8fe2";
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;
    try {
        const data = await fetch(URL, { mode: "cors" });
        const processedData = await data.json();
        return processedData;
    } catch (error) {
        throw new Error(`HTTP error! status: ${error.status}`);
    }
}