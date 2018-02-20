/**
 * Clent Side JS for de-duper
 * @module csa
 * @requires jQuery
 * @author Nicholas Sardo <gcc.programmer@gmail.com>
 */
    let files, data;

    /**
     * Pull out the file after user selects it
     * @function makeReady
     * @param {Event} e - Event Obj
     */
    function makeReady(e) {
      files = e.target.files;
    };

    /**
     * Send the file along to the server
     * @function doUpload
     * @param {Event} e - Event Obj
    */
    function doUpload(e){
      e.stopPropagation();
      e.preventDefault();

      if ( typeof files == 'undefined' ) return;
      data = new FormData();
      $.each(files, function(key, value)
      {
          data.append(key, value);
      });
      
      $.ajax({
          url: '/',
          type: 'POST',
          data: data,
          cache: false,
          processData: false, // Don't process the file
          contentType: false, // otherwise jQuery will tell the server its a query string request
          beforeSend: function() 
          {
              $("#progress").show();
              //clear
              $("#bar").width('0%');
              $("#percent").html("0%");
          },
          uploadProgress: function(event, position, total, percentComplete) 
          {
              $("#bar").width(percentComplete+'%');
              $("#percent").html(percentComplete+'%');
       
          },
          success: function( data, textStatus, jqXHR )
          {
              $("#bar").width('100%');
              $("#percent").html('100%');
          },
          error: function(jqXHR, textStatus, errorThrown)
          {
            console.log('ERRORS: ' + textStatus);
            $('#progress').hide();
            $("#bar").width('0%');
            $("#percent").html("0%");
          },
          complete: function() {
            setTimeout(function(){
              $('#progress').hide();
              $("#bar").width('0%');
              $("#percent").html("0%");
              $('input[type=file').val('');
            }, 500);

            $('#form-div').hide();
            $('#alg-div').show();
          }
      });
    };

    /**
     * Runs the Algorithm on the Server (remote procedure... basically)
     * @function runAlg
     * @param {Event} e - Event Obj
     * @return - The de-duped list
     */
    function runAlg(e){
      e.preventDefault();

      $.ajax({
        type: "PUT",
        url: "/",
        data: '{"func":"browser"}',
        contentType: "application/json",
        //dataType: "json",
        success: function(msg) {
          console.log(msg);
          $('#completed').html(msg);
          $('#download').show();
          $('#reset').show();
        }
      });
    };

    /**
     * Brings up the download dialog if the user chose to download the processed file
     * @function download
     * @param {Event} e - Event Obj
     * @return - the de-duped file as a downloadable file
     */
    function download(e){
      e.preventDefault();
      window.location.replace('/download');
    }

    /**
     * Reset the display to set up for new interaction
     * @function doReset
     */
    function doReset(){
      $('#download').hide();
      $('#reset').hide();
      $('#completed').html('');
      $('#form-div').show();
      $('#alg-div').hide();

    }

    $('#submit-button').on('click', doUpload );
    $('input[type=file').on('change', makeReady );
    $('#run-alg').on('click', runAlg );
    $('#download').on('click', download );
    $('#reset').on('click', doReset );

    $('#progress').hide();
    $('#alg-div').hide();
    $('#download').hide();
    $('#reset').hide();

    $('#main-tabs a').click(function(e){
      e.preventDefault();
      $(this).tab('show');
    });