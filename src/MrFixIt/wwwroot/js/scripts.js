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
            url: '/Jobs/StartJob/',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (result) {
                console.log(result);
                var jobStarted =
                    '<h3>You have started ' + result.title + '!</h3>' +
                    '<form action="CompleteJob" class="complete-job">' +
                        '<input type="hidden" name="completeJob" value="' + result.jobId + '"  />' +
                        '<button type="submit" class="btn btn-sucess btn-sm">Complete Job</button>' +
                    '</form>';
                $('#begin-job').html(jobStarted);
                $('.complete-job').submit(function (event) {
                    event.preventDefault();
                    console.log($(this).serialize());
                    $('#begin-job').hide();
                    $.ajax({
                        url: '/Jobs/CompleteJob/',
                        type: 'POST',
                        dataType: 'json',
                        data: $(this).serialize(),
                        success: function (result) {
                            var jobComplete =
                                '<h3>You have completed ' + result.title + '!</h3>' +
                            $('#complete-job').html(jobComplete);
                        }
                    });
                });
            }
        });
    });
    $('.complete-job').submit(function (event) {
        event.preventDefault();
        console.log($(this).serialize());
        $('#begin-job').hide();
        $.ajax({
            url: '/Jobs/CompleteJob/',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (result) {
                var jobStarted =
                    '<h3>You have completed ' + result.title + '!</h3>' +
                $('#complete-job').html(jobStarted);
            }
        });
    });





});