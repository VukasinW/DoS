const floodHandler = require(`${process.cwd()}/resources/network_flood_handler`);
const slider = document.querySelector('.controls .value-selector .range-input');
const button = document.querySelector('.controls .attack-button');
let prev_time = 0;
let s = null;
let strength = 10;

button.addEventListener('click', async() => {
    let adrr = document.querySelector('.controls .ip').value;
    if(adrr.length < 2)
    return;
    
    const t = new Date().getTime();
    if(t-prev_time < 500)
        return;
    prev_time = t;
    
    if(button.innerText === 'Begin Attack') {
        button.style.boxShadow = '0px 2px 5px rgba(5, 5, 5, 0.651)';
        

        adrr = adrr.indexOf(':') === -1 ? `${adrr}:80` : adrr; 
        const ip = adrr.slice(0, adrr.indexOf(':'))
        const port = adrr.slice(adrr.indexOf(':')+1);

        console.log(adrr);

        s = await floodHandler(ip, port, strength, out => {
            out = out.split('\n').slice(0, 4).join('').replace(/,/g, ', ');
            document.querySelector('.output').innerText = out;
        });
    } else {
        button.style.boxShadow = '';
        if(s)
            s.stop();
    }

    const new_label = button.innerText === 'Begin Attack' ? 'Stop Attack' : 'Begin Attack'
    button.title = new_label;
    button.querySelector('.label').innerText = new_label;
});

setInterval(() => {
    slider.value = Number(slider.value);
    if(strength === slider.value)
        return;
    document.querySelector('.controls .value-selector .slider').style.width = `${map(slider.value, 1, 60000, 0, 100)}%`;
    document.querySelector('.controls .value-selector .slider .value').innerText = slider.value; 

    strength = slider.value;
}, 10);

function map(val, imin, imax, omin, omax) {
    return (val - imin) * (omax - omin) / (imax - imin) + omin;
}