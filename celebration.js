const celebrationTrigger = document.getElementById("celebration-trigger");

let celebrationLayer = null;
let celebrationTimeout = null;

if (celebrationTrigger) {
    celebrationTrigger.addEventListener("click", () => {
        //hapus animasi sebelumnya jika masih berjalan
        if (celebrationLayer) {
            celebrationLayer.remove();
            celebrationLayer = null;
        }
        if (celebrationTimeout) {
            clearTimeout(celebrationTimeout);
            celebrationTimeout = null;
        }
        //buat animasi lapisan
        const layer = document.createElement("div");
        layer.id = "party-celebration";
        celebrationLayer = layer;

        const colors = ["#FF9100","#FF4081","#FFD740","#69F0AE","#40C4FF","#B388FF","#FFFFFF"];

        //buat terompet dari sisi kiri kanan
        ["left", "right"].forEach((side)=> {
            const cannon = document.createElement("div");
            cannon.className = `party-cannon ${side}`;

            cannon.innerHTML = 
            `<svg
                xmlns = "https://www.w3.org/2000/svg"
                viewBox="0 0 120 100"
                width="90"
                height="75"
                aria-hidden="true"
            >
                //mulut terompet
                <path d = "M 43 38 L 91 17 L 91 69 L 43 48 Z"
                fill="#FF9100"
                stroke="#252734"
                stroke-width="5"
                stroke-linejoin="round"
                />

                //ujung terompet
                <path d = "M 87 15 Q 103 13 103 43 Q 103 73 87 71 Z"
                fill="#FFD740"
                stroke="#252734"
                stroke-width="5"
                />

                //pegangan
                <path d="M 43 39 L 31 35 L 23 48 L 32 61 L 43 48"
                fill="#FF4081"
                stroke="#252734"
                stroke-width="5"
                stroke-linejoin="round"
                />

                //detail dekorasi
                <circle cx="61" cy="42" r="5" fill="#FFFFFF"/>
                <circle cx="75" cy="32" r="3" fill="#40C4FF"/>
                <circle cx="75" cy="54" r="3" fill="#69F0AE"/>

                //pita dekoratif di mulut
                <path   d="M 101 27 Q 111 17 116 23
                M 103 42 Q 114 37 118 43
                M 101 57 Q 111 67 116 61"
                fill="none"
                stroke="#FF4081"
                stroke-width="4"
                stroke-linecap="round"
                />

                //bintang kecil
                <path  d="M 17 14 L 20 21 L 27 24 L 20 27 L 17 34
                L 14 27 L 7 24 L 14 21 Z"
                fill="#FFD740"
                />
            </svg>`;

            cannon.setAttribute("aria-hidden", "true");
            layer.appendChild(cannon);

            //titik awal semburan pita
            const originX = side === "left"
            ? window.innerWidth * 0.09
            : window.innerWidth * 0.91;

            const originY = window.innerHeight - 65;

            //buat pita warna warni
            for (let i = 0; i < 65; i++) {
                const ribbon = document.createElement("span");
                ribbon.className = "party-ribbon";
                ribbon.style.left = `${originX}px`;
                ribbon.style.top = `${originY}px`;

                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                ribbon.style.backgroundColor = randomColor;

                //arahkan semburan ke atas dan ke tengah
                const direction = side === "left" ? 1 : -1;
                const angle = (Math.random() * 100 + 25) * Math.PI / 180;
                const distance = 180 + Math.random() * 420;
                const moveX = Math.cos(angle) * distance * direction;
                const moveY = -Math.sin(angle) * distance;
                ribbon.style.setProperty("--move-x", `${moveX}px`);
                ribbon.style.setProperty("--move-y", `${moveY}px`);
                const spin = Math.random() * 1440 - 720;
                ribbon.style.setProperty("--spin", `${spin}deg`);
                const duration = 1.2 + Math.random() * 1.2;
                ribbon.style.setProperty("--duration", `${duration}s`);

                //variasi bentuk pita
                if (Math.random() > 0.5) {
                    ribbon.style.width = "6px";
                    ribbon.style.height = "22px";
                } else {
                    ribbon.style.width = "11px";
                    ribbon.style.height = "11px";
                    ribbon.style.borderRadius = "50%";
                }

                ribbon.style.animationDelay = `${Math.random() * 0.2}s`;

                layer.appendChild(ribbon);
        
            }
        });

        //Tampilkan animasi
        document.body.appendChild(layer);

        requestAnimationFrame(() => {
            //pastikan masih animasi terbaru
            if (celebrationLayer !== layer) {return;}

            layer.querySelectorAll(".party-cannon") .forEach((cannon) => {cannon.classList.add("fire");});
        });
        //hapus animasi setelah selesai
        celebrationTimeout = setTimeout(() => {
            if (celebrationLayer === layer) {
                layer.remove();
                celebrationLayer = null;
            }

            celebrationTimeout = null;
        }, 3000);
    } );
}