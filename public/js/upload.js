$(document).ready(function () {
    $('.upload-file').on('click', function () {
        $('#upload-input').click()
    })


    $('#upload-input').on('change', function () {
        var uploadInput = $('#upload-input');
        if (uploadInput.val() != '') {
            var formData = new FormData()
            formData.append('upload', uploadInput[0].files[0])
            console.log(formData)
            $.ajax({
                url: '/uploadsfile',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    uploadInput.val('')
                }
            })
        }
    })
})