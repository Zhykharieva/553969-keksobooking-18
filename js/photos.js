'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 70;
  var IMAGE_HEIGHT = 70;

  var AVATAR_FILE_CHOOSER_ELEMENT = document.querySelector('.ad-form__field input[type=file]');
  var AVATAR_PREVIEW_ELEMENT = document.querySelector('.ad-form-header__preview img');

  var ACCOMMODATION_FILE_CHOOSER_ELEMENT = document.querySelector('.ad-form__upload input[type=file]');
  var ACCOMMODATION_PREVIEW_ELEMENT = document.querySelector('.ad-form__photo');

  var createPhoto = function () {
    var elementPicture = document.createElement('img');
    elementPicture.width = IMAGE_WIDTH;
    elementPicture.height = IMAGE_HEIGHT;
    elementPicture.alt = 'Фотография';
    return elementPicture;
  };

  var loadFile = function (chooser, photo) {
    var file = chooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          photo.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };
  var onAvatarLoad = function () {
    loadFile(AVATAR_FILE_CHOOSER_ELEMENT, AVATAR_PREVIEW_ELEMENT);
  };

  var onAccommandationLoad = function () {
    loadFile(ACCOMMODATION_FILE_CHOOSER_ELEMENT, ACCOMMODATION_PREVIEW_ELEMENT.appendChild(createPhoto()));
  };

  AVATAR_FILE_CHOOSER_ELEMENT.addEventListener('change', onAvatarLoad);
  ACCOMMODATION_FILE_CHOOSER_ELEMENT.addEventListener('change', onAccommandationLoad);
})();
