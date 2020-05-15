<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<style>
body{width:50%;min-width:200px;font-family:arial; margin-left: 200px;}
#fromapi {background: #98E6DB;padding: 40px;overflow:auto;}
#btn-submit{padding: 10px 20px;background: #555;border: 0;color: #FFF;display:inline-block;margin-top:20px;cursor: pointer;font-size: medium;}
#btn-submit:focus{outline:none;}
.form-control{padding:10px;width:100%;}
/*.input-group{margin-top:10px;}*/
#error_message{
    background: #F3A6A6;
}
#success_message{
    background: #CCF5CC;
}
.ajax_response {
    padding: 10px 20px;
    border: 0;
    display: inline-block;
    margin-top: 20px;
    cursor: pointer;
	display:none;
	color:#555;
}
</style>
</head>
<body>
     <form class="ml-5 mt-5" id="fromapi" method="post">
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Title</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="message" placeholder="Title" required="">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Description</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="discription" placeholder="Desc" required="">
    </div>
  </div>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Group</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" value="android" name="Android" id="group" required="">
          <label class="form-check-label" for="group">
            Android
          </label>
        </div>
      </div>
    </div>
  </fieldset>
   <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Link</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="url_link" placeholder="/content/result-updates">
    </div>
  </div>
  <div class="form-group row">
    <label for="image" class="col-sm-2 col-form-label">Image</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="image" placeholder="https://s3.amazonaws.com/edunotes-media/edunotes-admin/wp-content/uploads/2020/03/16075922/download-jac.jpg">
    </div>
  </div>
  <div class="form-group row">
      <label for="notid" class="col-sm-2 col-form-label">Notificatin ID</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="notid" placeholder="Notificatin ID">
      </div>
  </div>
  <div class="form-group row">
      <label for="sid" class="col-sm-2 col-form-label">SERVERY ID</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="sid" placeholder="SERVEY ID">
      </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary" id="btn-submit">Send</button>
    </div>
  </div>
    <div id="error_message" class="ajax_response" style="float:left;color: red"></div>
	<div id="success_message" class="ajax_response" style="float:left;color: red"></div>
</form>

<script src="http://code.jquery.com/jquery-1.10.2.js"></script>			
<script>
$("#fromapi").submit(function(e) {

	e.preventDefault();
	var title = $("#message").val();
	var body = $("#discription").val();
	var topic = $("#group").val();
  var to = $('#url_link').val();
  var sid = $('#sid').val();
  var id= $('#notid').val();
  var image = $('#image').val();

	if(message == "" || discription == "" || group == "" ) {
		$("#error_message").show().html("All Fields are Required");
	} else {
		$("#error_message").html("").hide();
		$.ajax({
			type: "POST",
			url: "http://localhost:3000/api/start/sendpushnotification",
			data: {
				 "title" : title,
         "body" : body,
         "id": id,
         "sid": sid,
				 "to": to,
         "topic" : topic,
         "image" : image
			},
			success: function(data){
				if( typeof(data) === 'string' ) {
					var decodedmsg = JSON.parse(data);
					if( decodedmsg === true ) {
						$('#success_message').fadeIn().html(decodedmsg.msg);
					} else {
						$('#success_message').fadeIn().html(decodedmsg.msg);
					}
				} else {
					if( data.status === true ) {
						$('#success_message').fadeIn().html(data.msg);
					} else {
						$('#success_message').fadeIn().html(data.msg);
					}
				}
			}
		});
	}
})
</script>	
</body>
</html>