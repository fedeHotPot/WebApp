let ground = undefined;
let modelsInScene = false;
let ishalloween = true;
let soundH = undefined;

document.addEventListener("DOMContentLoaded", initComponents);

function initComponents() {
  soundH = document.getElementById("audio");
  soundH.setAttribute("autoplay", "true");
  infoModels.forEach(element => {
    modelsList.push(creatContainerModel(element))
  });
}

function creatContainerModel(infoModel) {
  const newModel = document.createElement('a-entity');
  newModel.setAttribute('id', infoModel.id);
  newModel.setAttribute('visible', 'false');
  newModel.setAttribute('gltf-model', infoModel.gltfModel);
  newModel.setAttribute('animation-mixer', infoModel.animationName);
  newModel.setAttribute('scale', infoModel.scale)
  return newModel;
}

function creatLight(infoLight) {
  const ligtht = document.createElement('a-light')
  ligtht.setAttribute('type', infoLight.type)
  ligtht.setAttribute('intensity', infoLight.intensity)
  ligtht.setAttribute('target', `#${infoLight.tagModel}`)
  ligtht.setAttribute('position', infoLight.position)
  return ligtht;
}

function selecScene(boolVal) {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  }
  if (countModels != modelsList.length) {
    return;
  }
  modelsList.forEach(element => {
    if (boolVal) {
      if (element.id == "Garra") {
        element.setAttribute('visible', 'false')
      } else {
        element.setAttribute('visible', 'true')
      }
    } else {
      if (element.id == "Garra") {
        element.setAttribute('visible', 'true')
      } else {
        element.setAttribute('visible', 'false')
      }
    }
  });
  if (boolVal) {
    soundH.setAttribute("volume", "1000");
  } else {
    soundH.setAttribute("volume", "0");
  }
}

AFRAME.registerComponent('tap-place', {
  init: function () {
    if (ground == undefined) {
      ground = document.getElementById('ground');
    }
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }

    ground.addEventListener('click', event => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      }
      document.getElementById('containerNextModel').style.display = 'inline-block';
      const touchPoint = event.detail.intersection.point;
      modelsList.forEach(element => {
        const infoModel = infoModels.find(infoM => {
          return infoM.id == element.id
        });
        const newPoss = {
          x: touchPoint.x + infoModel.offset.x,
          y: touchPoint.y + infoModel.offset.y,
          z: touchPoint.z + infoModel.offset.z
        };
        element.setAttribute('position', newPoss);
        if (!modelsInScene) {
          this.el.sceneEl.appendChild(element);
        }
        element.addEventListener('model-loaded', () => {
          countModels++;
          if (countModels == modelsList.length) {
            selecScene(true);
          }
        })
      });
      modelsInScene = true;
    })
  }
})