// app.js
// report.cccouncilpublicwebsite.tk

function refreshPage(event) {
  location.reload()
}

function setVisibilityDisplay(element, setVisibility, setDisplay) {
  document.getElementById(element).style.visibility = setVisibility
  document.getElementById(element).style.display = setDisplay
}

async function handleFormSubmit(event) {
  
  event.preventDefault();
  const form = event.currentTarget;
  const url = "https://o1w0xmjtv2.execute-api.ap-southeast-2.amazonaws.com/dev/report/"
  
  const formData = new FormData(document.getElementById("reportForm"));

  //set visibility of components
  setVisibilityDisplay("cardShowHideSubmitForm", "hidden", "none")
  setVisibilityDisplay("cardShowHideEmergencyLights", "hidden", "none")
  setVisibilityDisplay("cardShowHideSpinner", "visible", "block")

  try {
    const responseData = await fetch(url, {
      method:'POST',
      body: formData
    });
    
    if(responseData.ok) {
      //The API Reponse is a 2XX
      //set visibility of components
      setVisibilityDisplay("cardShowHideOKGreenTick", "visible", "block")
      setVisibilityDisplay("cardShowHideSpinner", "hidden", "none")
    }
    else {
      //set visibility of components
      setVisibilityDisplay("cardShowHideErrorRedX", "visible", "block")
      setVisibilityDisplay("cardShowHideSpinner", "hidden", "none")      
    }

  }
  catch(error) {
    console.error(error);
  }
}