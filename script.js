const url = "https://api.rootnet.in/covid19-in/stats/latest";

function updateData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('num-1').innerHTML = data.data.summary.confirmedCasesIndian;
            document.getElementById('num-2').innerHTML = data.data.summary.deaths;
            document.getElementById('num-3').innerHTML = data.data.summary.discharged;
        })
        .catch(error => console.error('Error fetching data:', error));
}

updateData();

const btn = document.getElementById("refresh-btn");
btn.addEventListener("click", updateData);

const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("change", function() {
    document.body.classList.toggle("dark-mode");

    document.querySelectorAll("#cases-box, #deaths-box, #recovery-box,#time-death-box,#time-case-box,#state-cases,#state-deaths").forEach(box => {
        box.classList.toggle("dark-mode");
    });
});

const dropvalue = document.getElementById('states');
const drop_btn = document.getElementById('drop-down-btn');
drop_btn.addEventListener("click", print);

function print() {
    let value = dropvalue.value;
    
    let div1 = document.getElementById('state-cases');
    let h1_1 = document.getElementById('num-4');

    if (!div1) {
        div1 = document.createElement('div');
        div1.id = 'state-cases';
        h1_1 = document.createElement('h1');
        h1_1.id = 'num-4';
        h6_1 = document.createElement('h6');
        h6_1.textContent = "Cases";

        document.getElementById('state-boxes').appendChild(div1);
        div1.appendChild(h1_1);
        div1.appendChild(h6_1);
    }

    let div2 = document.getElementById('state-deaths');
    let h1_2 = document.getElementById('num-5');

    if (!div2) {
        div2 = document.createElement('div');
        div2.id = 'state-deaths';
        h1_2 = document.createElement('h1');
        h1_2.id = 'num-5';
        h6_2 = document.createElement('h6');
        h6_2.textContent = "Deaths";

        document.getElementById('state-boxes').appendChild(div2);
        div2.appendChild(h1_2);
        div2.appendChild(h6_2);
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.data.regional.length; i++) {
                if (data.data.regional[i].loc === value) 
                {
                    document.getElementById('heading1').innerHTML=data.data.regional[i].loc;
                    h1_1.innerHTML = data.data.regional[i].totalConfirmed;
                    h1_2.innerHTML = data.data.regional[i].deaths;
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

let min = 0, max = 34;

function fetchData() {
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('time-state-name').innerHTML = data.data.regional[x].loc;
            document.getElementById('num-6').textContent = data.data.regional[x].totalConfirmed;
            document.getElementById('num-7').textContent = data.data.regional[x].deaths;
        })
        .catch(error => console.error('Error fetching data:', error));
}

setInterval(fetchData, 20000);

fetchData();

