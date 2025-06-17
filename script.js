timeline_elements = [
    { "date": "21st June 2025", "ev": "Arrival" },
    { "date": "22nd June 2025", "ev": "Opening Ceremony" },
    { "date": "23rd - 26th June 2025", "ev": "First Training Phase" },
    { "date": "27th June 2025", "ev": "Rest Day" },
    { "date": "28th June - 2nd July 2025", "ev": "Second Training Phase" },
    { "date": "3rd July 2025", "ev": "Rest Day" },
    { "date": "4th July 2025", "ev": "Contest Day One" },
    { "date": "5th July 2025", "ev": "Contest Day Two" },
    { "date": "6th July 2025", "ev": "Rest Day" },
    { "date": "7th July 2025", "ev": "Awards Ceremony" },
    { "date": "8th July 2025", "ev": "Departures" }
];

html_elements = [];
for (let i = 0; i < timeline_elements.length; i++) {
    html_elements.push(`
        <div class="schedule-element" id ="time${i}">
            <span class="schedule-date">${timeline_elements[i].date}</span>
            <div class="circle">
            </div>
            <span class="schedule-title">${timeline_elements[i].ev}</span>
            <span class="schedule-location">Kouba - Algiers</p>
         </div>
        `);
}

timeline = document.getElementById('timeline');

function getTimelineElement(i) {
    if (i < timeline_elements.length) return html_elements[i];
    else return '<div></div>'
}

function fillTimeline(width) {
    let defs = '1fr';
    for (let i = 1; i < width; i++) defs += ' 1fr';
    timeline.style.gridTemplateColumns = defs;
    timeline.innerHTML = '';
    for (let i = 0; i < (Math.ceil(timeline_elements.length / width)) * width; i++) {
        row = Math.floor(i / width);
        col = i % width;
        if ((Math.floor(i / width)) % 2 == 0) {
            timeline.innerHTML += getTimelineElement(row * width + col);
        } else {
            timeline.innerHTML += getTimelineElement((row + 1) * width - col - 1);
        }
    }

    for (let i = 0; i < timeline_elements.length - 1; i++) {
        element = document.getElementById(`time${i}`);

        if (i % width == width - 1) {
            element.innerHTML += `<div class="bottom-line"></div>`;
        }
        else if ((Math.floor(i / width)) % 2 == 0) {
            element.innerHTML += `<div class="right-line"></div>`;
        } else {
            element = document.getElementById(`time${i + 1}`);
            element.innerHTML += `<div class="right-line"></div>`;
        }
    }
}


const xsmallScreen =
    window.matchMedia('(max-width: 700px)');
const smallScreen =
    window.matchMedia('(min-width: 701px) and (max-width: 1050px)');
const mediumScreen =
    window.matchMedia('(min-width: 1051px) and (max-width: 1500px)');


function setupTimeline() {
    if (xsmallScreen.matches) {
        fillTimeline(1);
    } else if (smallScreen.matches) {
        fillTimeline(2);
    } else if (mediumScreen.matches) {
        fillTimeline(3);
    } else {
        fillTimeline(4);
    }
}


xsmallScreen.addEventListener('change', setupTimeline);
smallScreen.addEventListener('change', setupTimeline);
mediumScreen.addEventListener('change', setupTimeline);

setupTimeline();
