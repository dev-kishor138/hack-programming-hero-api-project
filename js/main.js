const milestoneData = JSON.parse(data).data;

// load course milestone Data
function loadMilestone(){
    const milestones = document.querySelector('.milestones');

    milestones.innerHTML = `${milestoneData.map(function(milestone){
        return `<div class="milestone border-b">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onclick="markMilestone(this, ${milestone._id})" /></div>
          <div onclick="openMilestone(this, ${milestone._id})">
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules.map(function(module){
            return `
            <div class="module border-b">
                <p>${module.name}</p>
            </div>`;
          })}
        </div>
      </div>`;
    }).join("")}`;
}


function openMilestone(milestoneElement, id){
    const currentPanel = milestoneElement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector('.show');
  const active = document.querySelector(".active");

  // first remove previous active class if any [other than the clicked one]
  if(active && !milestoneElement.classList.contains("active")){
    active.classList.remove('active');
  }

  // toggle current clciked one
  milestoneElement.classList.toggle("active");

  // first hide previous pannel if open [other than the clicked element]
  if(!currentPanel.classList.contains('shows') && shownPanel){
        shownPanel.classList.remove('show');
    }

  // toggle current element 
  currentPanel.classList.toggle('show');

  showMilestone(id);
}

function showMilestone(id){
  const milestoneImage = document.querySelector('.milestoneImage');
  const name = document.querySelector('.title');
  const details = document.querySelector('.details');

  milestoneImage.style.opacity = '0';
  milestoneImage.src = milestoneData[id].image;
  name.innerText = milestoneData[id].name;
  details.innerText = milestoneData[id].description;
}

const milestoneImage = document.querySelector('.milestoneImage');
milestoneImage.onload = function (){
  this.style.opacity = '1';
}

function markMilestone(checkbox, id){
  const doneList = docuement.querySelector(".doneList");
  const milestoneList = docuement.querySelector(".milestones");
  const item = document.getElementById(id);

  if(checkbox.checked){
    // mark as done
    milestoneList.removeChild(item);
    doneList.appendChild(item);
  }
  else{
    // back to main
    milestoneList.appendChild(item);
    doneList.removeChild(item);
  }
}


loadMilestone();