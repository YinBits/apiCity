export function lightsOfCity(sensorLum) {
    let lights = false;

    if (sensorLum < 200) {
        lights = 1;
        console.log("Cidade iluminada!");
    } else {
        lights = 0;
        console.log("Cidade não iluminada!");
    }

    

    return lights;

}

export function Horario(){

const date = new Date()
    
return date;
}

