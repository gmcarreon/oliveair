
$(document).ready(function () {

    $($('.page-scroll')[4]).addClass('page-scroll-active');

    $(":file").filestyle({ buttonName: "btn-primary" });

    attachment.onchange = function (event) {
        if (attachment.files.length > 0) {
            var reader = new FileReader();
            
            reader.onload = function () {

                var arrayBuffer = this.result,
                  array = new Uint8Array(arrayBuffer),
                  binaryString = String.fromCharCode.apply(null, array);

                $('#fileByte').text(array);
            }
            reader.readAsArrayBuffer(this.files[0]);
        }       
    }
});