export function preferenceSemafaro(distanciaSemaforoUm, distanciaSemaforoDois) {
    if (distanciaSemaforoUm < distanciaSemaforoDois) {
        return { semafaroUm: true, semafaroDois: false };
    } else {
        return { semafaroUm: false, semafaroDois: true };

    }
}

