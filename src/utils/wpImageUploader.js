export const wpImageUploader = (setImageUrl) => {
  var clientPhoto = wp.media({
    title: "Upload a Photo",
    button: {
      text: "Use this photo",
    },
    multiple: false,
  });

  clientPhoto.open();

  clientPhoto.on("select", function () {
    var image = clientPhoto.state().get("selection").first().toJSON();
    //console.log(image);
    setImageUrl(image.url);
  });
};
