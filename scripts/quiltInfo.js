/* Quilt Library */

// set current year in footer
const currentDate = new Date();
document.querySelector('#year').textContent = currentDate.getFullYear();

/*  DATA  */

// List of Quilt Names, year created, and size. Fetch JSON file.


let quiltArray = [];

const url = "scripts/quiltDescriptions.json"
async function getQuilts(url) {
    const results = await fetch(url);
    const quiltsJson = await results.json();
    quiltArray = quiltsJson;
    console.log(url)

    output(quiltsJson)
}
getQuilts(url);


// Print in console log to see list of quilts.
for (let i = 0; i < quiltArray.length; i++) {
    console.log(quiltArray[i]);
}


// Quilting Quotes for day of the week.
const dWeek = currentDate.getDay();
let message
    if (dWeek != 0 && dWeek != 6){
        message = "Count your blessings...Stitch them one by one";
        
    } else {
        message = "May your bobbin always be full";
    }
    
    /* OUTPUT */
    
    // assign a quilt quote to message
    document.getElementById("quiltQuote2").innerHTML = message;
    
   

// Create function to display quilts on html
 
function output(quilts) {
    const html = quilts.map(
        (quilt) => `<article> 
        <h3>${quilt.name}</h3>
        <h4>${quilt.yearCreated}</h4>
        <h4>${quilt.size}</h4>
        <img src="${quilt.imageUrl}" alt="${quilt.name}">
        </article>`
    );
    document.getElementById("quilts").innerHTML = html.join("");
    }

// Clear and sort quilt list by name, year and size
function reset() {
        document.getElementById("quilts").innerHTML = '';
    }

function sortBy() {
    reset();
    let sortProperty = document.getElementById("sortBy").value;
    console.log(sortProperty);
    
    let sortOrder = 1;
    if (sortProperty == "yearCreatedNewest") {
        sortOrder = -1;
        sortProperty = "yearCreated";
    }

    quiltArray.sort((a, b) => {
        if (b[sortProperty] == "unknown") {
            return -1;
        }
        if (a[sortProperty] < b[sortProperty]) {
            return sortOrder*-1;
        }
        
        if (a[sortProperty] > b[sortProperty]) {
            return sortOrder*1;
        }
        return 0;
    });

  

    output(quiltArray);
}

document.getElementById("sortBy").addEventListener("change", sortBy);



// Print and call random quilt quotes at the end.
function random_item(items) {
  
    return items[Math.floor(Math.random()*items.length)];
}

const items = [
    "When you sleep under this quilt, you sleep under a blanket of love.",
    "Our lives are like quilts - bits and pieces, joy and sorrow, stitched with love.",
    "Blessed are the piecemakers.",
    "Any day spent quilting is a good day!",
    "A family stitched together with love seldom unravels.",
    "Anyone who works on a quilt, who devotes her time, energy, creativity," + 
    " and passion to the art, learns to value the work of her hands. " + 
    "And as any quilter will tell you, a quilter's quilting friends are some of the dearest, " +
    "most generous, and most supportive people she knows. == Jennifer Chiaverini"

];
let randomQuote = random_item(items);
document.getElementById("quotes").innerHTML = randomQuote;

