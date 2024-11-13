export default async (footerPlaceId, ruta) =>{
    try {
        const resultPromise = await fetch(ruta);
        const data = await resultPromise.text();
        footerPlaceId.innerHTML = data;
    } catch (error) {
        console.error(`Error al cargar el footer:\n${error}`);
    }
}