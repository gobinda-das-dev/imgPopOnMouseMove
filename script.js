const throttleFunction = (func, delay) => {
    let prev = 0;
    return (...args) => {
        let now = new Date().getTime();

        if (now - prev > delay) {
            prev = now;

            return func(...args);
        }
    }
}


document.querySelector("#center")
    .addEventListener("mousemove",
        throttleFunction(() => {
            console.log("container is hovered")
        }, 300));