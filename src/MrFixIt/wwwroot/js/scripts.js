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

    $('.start-job').submit(function (event) {
        event.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            url: '@Url.Action("StartJob")',
            type: 'Post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (result) {
                console.log(result);
                var jobStarted =
                    '<form action="CompleteJob" class="complete-job">' +
                        '<input type="hidden" name="completeJob" value="' + result.JodIb + '" />' + 
                        '<button type="submit" btn btn-sucess btn-sm job-list>Complete Job</button>' + 
                    '</form>'
                $('#begin-job').html(jobStarted);
            }
        });
    });
    $('.complete-job').submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: '@Url.Action("CompleteJob")',
            type: 'Post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (result) {
                var jobStarted =
                    '<h3>You have completed ' + result.Title + '!</h3>' +
                $('#complete-job').html(jobStarted);
            }
        });
    });





});