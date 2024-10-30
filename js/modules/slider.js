export const innerSlider = async (sliderPlaceId, sliderHtmlPath) => {
    try {
        const resultPromise = await fetch(sliderHtmlPath);
        if (!resultPromise.ok) {
            throw new Error(`HTTP error! status: ${resultPromise.status}`);
        }

        const data = await resultPromise.text();
        sliderPlaceId.innerHTML = data;

    } catch (error) {
        console.error(`Error de carga\n${error}`);
    }
}