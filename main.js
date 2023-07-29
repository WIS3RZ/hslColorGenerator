let hsl_box = document.querySelector(".hsl-square");


// Capture range input
const hslHue = document.getElementById("hsl-hue");
const hslSat = document.getElementById("hsl-sat");
const hslLight = document.getElementById("hsl-light");
const hslResult = document.querySelector(".hsl-result");

// Define HSL Indicator
const hslHueSpan = document.querySelector(".hsl-hue-span");
const hslSatSpan = document.querySelector(".hsl-sat-span");
const hslLightSpan = document.querySelector(".hsl-light-span");

// Randomize when open the web app or reloading it.
hslHue.value = Math.floor(Math.random(hslHue.value) * (360 + 1))
hslSat.value = Math.floor(Math.random(hslSat.value) * (100 + 1))
hslLight.value = Math.floor(Math.random(hslLight.value) * (100 + 1)) 
const defaultHsl = "hsl(".concat(hslHue.value + ",", hslSat.value + "%,", hslLight.value + "%)")

// HSL Indicator Result
hslResult.value = defaultHsl;
hslHueSpan.innerHTML = hslHue.value;
hslSatSpan.innerHTML = hslSat.value;
hslLightSpan.innerHTML = hslLight.value;
hsl_box.style.backgroundColor = defaultHsl;

// Copy to clipboard
const btnCopy = document.querySelector(".copy-btn");
// Button to Randomize the HSL values.
const btnRdm = document.querySelector(".randomize-btn");


btnRdm_hover = (stmt) =>{
    
    console.log(stmt);
    if(stmt == true){
        interval = setInterval(function (){
            let rdmHue = Math.floor(Math.random() * 361)
            let rdmSat = Math.floor(Math.random() * 101)
            let rdmLit = Math.floor(Math.random() * 101) 
            const rdmHslResult = "hsl(".concat(rdmHue + ",", rdmSat + "%,", rdmLit + "%)");
            btnRdm.style.backgroundColor = rdmHslResult;
            btnRdm.style.color = "hsl(".concat(rdmHue / 10 + ",", rdmSat / 10 + "%,", rdmLit * 2 + "%)");
        }, 300)
    }
    else{
        setTimeout(() => {
            clearInterval(interval)
            btnRdm.style.backgroundColor = "rgb(41, 148, 248)";
            btnRdm.style.color = 'white';
        }, 100);
        
    }
}

class hslPalette{
    // Default HSV Value.
    constructor(){
        this.hslComp = {
            hue: 0,
            sat: 0 + '%',
            lit: 0 + '%',
        };
    }
    // Dynamic HSV Value (delivered from user-controlled range input)
    hsldlvr = (dlvHue, dlvSat, dlvLit) =>{
        this.hslComp = {
            hue: dlvHue,
            sat: dlvSat,
            lit: dlvLit,
            get hslRes() {return "hsl(" + this.hue + "," + this.sat + "%," + this.lit + "%)";},
            hslSpan(){
                hslHueSpan.innerHTML = this.hue;
                hslSatSpan.innerHTML = this.sat;
                hslLightSpan.innerHTML = this.lit;
                hslResult.value = this.hslRes;
                /* When the user slide the range input, 
                the .hsl-square{background-color:} changed dynamically.
                */
                hsl_box.style.backgroundColor = this.hslRes;
            },
            copystmt: false
        };

        // Dynamic Indicator on user-controlled range slide.
        this.hslComp.hslSpan();
        console.log(this.hslComp.hslRes);
        console.log(this.hslComp.copystmt)
    }
    hslpick = () =>{
        const retHue = hslHue.value;
        const retSat = hslSat.value;
        const retLit = hslLight.value;
        console.log({rh: retHue, rs: retSat, rl: retLit})
        let hslresult = this.hsldlvr(retHue, retSat, retLit);
        return hslresult;
    }
    copyhsl = () =>{
        this.hslComp.copystmt = true;
        if(this.hslComp.copystmt == true){
            console.log(this.hslComp.hslRes, "success");
            hslResult.select();
            navigator.clipboard.writeText(hslResult.value);
            btnCopy.innerHTML = "Tersalin!";
            setTimeout(() => {btnCopy.innerHTML = "Salin";}, 2000)
        }
    }
    randomize = () => {
        hslHue.value = Math.floor(Math.random(hslHue.value) * (360 + 1))
        hslSat.value = Math.floor(Math.random(hslSat.value) * (100 + 1))
        hslLight.value = Math.floor(Math.random(hslLight.value) * (100 + 1)) 

        const defaultHsl = "hsl(".concat(hslHue.value + ",", hslSat.value + "%,", hslLight.value + "%)")
        hslResult.value = defaultHsl;
        hslHueSpan.innerHTML = hslHue.value;
        hslSatSpan.innerHTML = hslSat.value;
        hslLightSpan.innerHTML = hslLight.value;
        hsl_box.style.backgroundColor = defaultHsl;
    }

}

const listenHsl = new hslPalette();
// Change the HSV values when the range input slided by the user.
hslHue.addEventListener('input', listenHsl.hslpick);
hslSat.addEventListener('input', listenHsl.hslpick);
hslLight.addEventListener('input', listenHsl.hslpick);
// Listen to Copy and Randomize
btnCopy.addEventListener('click', listenHsl.copyhsl);
btnRdm.addEventListener('click', listenHsl.randomize);


