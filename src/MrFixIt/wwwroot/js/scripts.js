$(document).ready(function () {
    $('.jobs').click(function () {
        $.ajax({
            type: 'GET',
            dataType: 'html',
            url: $(this).data('request-url'),
            success: function (result) {
                $('#result').html(result);
                $(".job-list").click(function () {
                    $.ajax({
                        type: 'GET',
                        url: $(this).data('request-url'),
                        dataType: 'html',
                        success: function (result) {
                            $(".claim-job").html(result);
                        }
                    });
                });
            }
        });
    });
});