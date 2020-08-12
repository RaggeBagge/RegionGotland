/*
  Author: Rasmus Johansson, Uppsala Universitet
  E-Mail: rasmus.johansson.1582@student.uu.se
  Description: Give ability to create buildings in Web AppBuilder in ArcGIS Online.
  Date: 2020-05-29
  Version: 0.6
*/


//import PolygonSymbol3D from "esri/symbols/PolygonSymbol3D";

//--------------------
//  Global variables
//--------------------

var ar = [];
var sliderValue = 10;
var heights = [2.80, 3, 3.5, 4, 4.5, 5];
const BUILDING_COLOR = "#FFFFFF";

//Start of the program
window.addEventListener('load', main);

//main();

function main() {
    showBuildingHeight();
    fillStoreyArray();
    fillBuildingDropdown();
    fillFloorHeightDropdown();
    changeStoreyHeightArray();
}

//-----------------
//    Functions
//-----------------

/*
  Updates the value that the slider has activily as you change the slider.
  Updates the value of global variable sliderValue.
*/
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

/*
  Removes any options first from the first dropdown menu, then
  creates the options of the first dropdown which tells which floor you want to change.
*/

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

/*
  Adds options for the heights that a floor can be. If one is changed it calls the
  changeStoreyHeightArray with the new value to be changed in the global array.
*/

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

/*
  A function to remove all the previous options to clear the dropdown menu.
*/
  function removeOptions() {
    let selectElement = document.getElementById("dropdownFloorLevel");
    var L = selectElement.options.length - 1;

    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

/*
  Displays the current array and values of it to let the user see what height each floor will be.
*/
 function showFloorHeights()
 {
   let text = document.getElementById("showFloorHeights");
    text.innerHTML = null;

   for(i=0;i<sliderValue;i++)
   {
      text.innerHTML += "Våning " + (i+1) + ": " + ar[i] + " meter. <br />";
   }
 }

/*
  Fills the global array of the standard value of 2.8 meters in height for each floor.
*/
  function fillStoreyArray()
  {
      for(i = 0;i<20;i++)
      {
        ar.push(2.80);
      }
  }

/*
  Function that changes the value in the array from the input parameters.
*/
  function changeStoreyHeightArray(arrIndex, value)
  {
      ar[arrIndex] = value;
      showFloorHeights();
  }

/*
  Function to calculate the total height of the building and calls the draw function.
*/
  function mathAndDraw()
  {
    var totalheight = 0;

    for(i=0;i<sliderValue;i++)
    {
       totalheight += ar[i];
    }
    startDrawing(totalheight);
  }

/*
  Function from Esri where you create a Polygon 3D symbol to act as a building with the
  height decided by the user.
*/
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
      //this.stories = 0;
    });
    //this.stories = methodStories;
  }

