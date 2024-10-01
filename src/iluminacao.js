export function lightsOfCity(sensorLum){
    let lights = false;

    if (sensorLum < 200) {
        lights = true;
        console.log("Cidade iluminada!");
    } else {
        lights = false;
        console.log("Cidade não iluminada!");
    }

    return lights;

}