$(document).ready(function () {
     $("#claim-form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '@Url.Action("Claim")',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (result) {
                var jobClaimed = 
                    '<h4>You have successfully claimed ' + result.title + '!</h4>';
                    $(".job-form").html(jobClaimed);
            }
        });
    });
    $('.start-job').submit(function (event) {
        event.preventDefault();
        console.log($(this).title);
        $.ajax({
            url: '/Jobs/StartJob/',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (result) {
                var jobStarted =
                    '<h3>You have started ' + result.title + '!</h3>'
                    '<form action="CompleteJob" class="complete-job">' +
                        '<input type="hidden" name="completeJob" value="' + result.jobId + '"  />' +
                        '<button type="submit" class="btn btn-sucess btn-sm">Complete Job</button>' +
                    '</form>';
                $('#' + result.jobId).html(jobStarted);
                window.setTimeout(function () { location.reload() }, 100);
                $('.complete-job').submit(function (event) {
                    event.preventDefault();
                    $.ajax({
                        url: '/Jobs/CompleteJob/',
                        type: 'POST',
                        dataType: 'json',
                        data: $(this).serialize(),
                        success: function (result) {
                            var jobComplete =
                                '<h3>You have completed ' + result.title + '!</h3>'
                            $('#' + result.jobId).html(jobComplete);
                            window.setTimeout(function () { location.reload() }, 100);
                        }
                    });
                });
            }
        });
    });
    $('.complete-job').submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: '/Jobs/CompleteJob/',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (result) {
                var jobStarted =
                    '<h3>You have completed ' + result.title + '!</h3>'
                $('#' + result.jobId).html(jobStarted);
                window.setTimeout(function () { location.reload() }, 100);
            }
        });
    });





});