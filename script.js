const imgArray = [
    "https://our-revolution.com/images/60a2bs0u/production/7b50a04a022503c5c27809212dbd524b6ecbe24c-4000x2440.png?w=1920&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/a14b28ec9abfe77bca1ede353ac647c2c8623ab0-2663x1760.png?w=1920&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/e5f308492c220eb198d8860e4e6d28fbeafd9e24-4000x2445.png?w=1920&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/1df87e5333881d8f09c47e57d9c3a4c9bb84cb35-4000x2443.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/9f4fa713aff192239a79f100d49261968b112559-4000x2667.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/c73f7b5c9c68ab66c7742d22bca82da058cf2dc7-4000x2445.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/a854f508cb5b24abe1553e16dea264f67b79b10c-2880x1760.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/370d0baf15d78727bd0cf06050383be416801ba2-4000x2443.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/acd77ca0d87624b635875ddf47c090452a2064c3-5500x3667.jpg?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/0e615bc695fac0dab43d3524904f53ab6a7647c3-5000x3617.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/da03deff876fe171168aa66df8b3150f201366f7-4000x2443.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/9cc3f91e65444e02fa7c6387b943ed153ae30fd8-4000x2443.png?w=256&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/acd77ca0d87624b635875ddf47c090452a2064c3-5500x3667.jpg?w=96&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/e08057f811dab6e44f437fd22057ff16a38d9035-5012x7087.jpg?w=1920&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/3931d5d97b1ecff4f7c29e536d228a4ebd55381f-1333x2000.jpg?w=1920&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/125aea7cd760386805e205bb9204ad9cb9bac682-5500x3667.jpg?w=3840&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/4318e64ec4c188fd58961e10a73e1cbaeff92473-5500x3692.jpg?w=1920&q=100&fit=clip&auto=format",
    "https://our-revolution.com/images/60a2bs0u/production/00d0983408ed54dcff0f36bc31c789e013f17922-2406x3402.jpg?w=1920&q=100&fit=clip&auto=format",
]


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

let x = 0;
let y = 0;
let prevImgIndex;
/*
let mouseSpeed = 250;
let prevX;

function mouseSpeedFn() {
    window.onmousemove = (dets) => {
        setTimeout(() => {
            if ((prevX - dets.x) !== 0) {
                mouseSpeed = Math.round(Math.abs(250 / (prevX - dets.x)))
            } else {
                mouseSpeed = 250;
            }

            // console.log(mouseSpeed)
            prevX = dets.x;
        }, 20);
    }
    return mouseSpeed;
}
mouseSpeedFn();
*/

document.querySelector("#center").addEventListener("mousemove", throttleFunction((dets) => {
    let imgIndex = Math.round(Math.random() * (imgArray.length - 1));
    if (imgIndex === prevImgIndex) {
        imgIndex = Math.round(Math.random() * (imgArray.length - 1));
    }

    let w = window.innerWidth;
    let rotateAngle = (dets.clientX - w / 2) / (w / 70);
    // rotateAngle = Math.random() * 40 - 20;

    let div = document.createElement("div");
    div.classList.add("imgContainer");
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.rotate = rotateAngle + "deg";

    if (x !== dets.clientX) {
        gsap.to(div, {
            left: dets.clientX,
            top: dets.clientY,
        })
    }

    let img = document.createElement('img');
    img.setAttribute("src", imgArray[imgIndex]);
    div.appendChild(img);

    document.body.appendChild(div);
    gsap.timeline()
        .to(img, {
            y: "0",
            scale: 1,
            ease: "back.out(1.4)",
            // ease: Power4.inOut,
            duration: .7,
        })
        .to(img, {
            y: "150%",
            ease: "easeInOut", // Ease out effect
            scale: 2,
            delay: .1
        });


    setTimeout(() => {
        div.remove();
    }, 1300);

    x = dets.clientX;
    y = dets.clientY;
    prevImgIndex = imgIndex;
}, 300));