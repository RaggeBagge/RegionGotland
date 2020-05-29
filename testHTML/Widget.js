//import PolygonSymbol3D from "esri/symbols/PolygonSymbol3D";

//Global variables
var ar = [];
var sliderValue = 10;
var heights = [2.80, 3.20, 3.50, 4, 5];
const BUILDING_COLOR = "#FFFFFF";


//Start of the program
//window.addEventListener('load', main);

//main();

function main() {
    showBuildingHeight();
    fillStoreyArray();
    fillBuildingDropdown();
    fillFloorHeightDropdown();
    changeStoreyHeightArray();
}


//Functions

function showBuildingHeight() {
    let slider = document.getElementById("myBuildingHeight");
    let output = document.getElementById("textBuildingHeight");

    if(slider != null && output != null){
      output.innerHTML = slider.value; // Display the default slider value
      sliderValue = slider.value;

      // Update the current slider value (each time you drag the slider handle)
      slider.oninput = function() {
        output.innerHTML = this.value;
        sliderValue = this.value;
      }

      fillBuildingDropdown();
    }
  }

  function fillBuildingDropdown() {
    let select = document.getElementById("dropdownFloorLevel");
    var number = 1;

    removeOptions();

    if(select != null){

      do{
        var option = document.createElement('option');
        option.value = number-1; //-1 to specify the array index for later
        option.text = number.toString();
        select.add(option);
        number++;
      }while(number <= sliderValue)
       showFloorHeights();
    }
  }

  function fillFloorHeightDropdown()
  {

    let dropdown = document.getElementById("dropdownCeilingHeight");

    if(dropdown != null)
    {
      for(i = 0;i<heights.length;i++){
        var option = document.createElement("option");
        option.text = heights[i].toString();
        option.value = heights[i];
        dropdown.add(option);
      }

      dropdown.onchange = function() {
        let arrayIndex = document.getElementById("dropdownFloorLevel");
        changeStoreyHeightArray(arrayIndex.value, dropdown.value);
      }
    }
  }

  function removeOptions() {
    let selectElement = document.getElementById("dropdownFloorLevel");
    var L = selectElement.options.length - 1;

    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

 function showFloorHeights()
 {
   let text = document.getElementById("showFloorHeights");
    text.innerHTML = null;

   for(i=0;i<sliderValue;i++)
   {
      text.innerHTML += "Våning " + (i+1) + ": " + ar[i] + " meter. <br />";
   }
 }

  function fillStoreyArray()
  {
      for(i = 0;i<20;i++)
      {
        ar.push(2.80);
      }
  }

  function changeStoreyHeightArray(arrIndex, value)
  {
      ar[arrIndex] = value;
      showFloorHeights();
  }

  function mathAndDraw()
  {
    var totalheight = 0;

    for(i=0;i<sliderValue;i++)
    {
       totalheight += ar[i];
    }
    startDrawing(totalheight);
  }

  function startDrawing(size) {
    const color = BUILDING_COLOR;

    const symbol = new PolygonSymbol3D({
      symbolLayers: [{
        type: "extrude",
        material: {
          color,
        },
        edges: {
          type: "solid",
          color: [100, 100, 100],
        },
        size,
      }],
    });
    this.createPolygonGraphic(symbol, color).always(() => {
      this.stories = 0;
    });
    this.stories = methodStories;
  }

