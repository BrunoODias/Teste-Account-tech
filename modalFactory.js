function CreateModelPanel(obj){
    obj.buttons = obj || [];
    var buttons = '';
    for(var current of buttons){
        buttons += `<button ${current.id!=null? 'id="'+current.id+'"' : ''} class="${current.class}>${current.text}<button>"`;
    }

    var html = `
<div class="modal" id="modelPanel" tabindex="1" role="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">${obj.title}</h5>
      </div>
      <div class="modal-body">
        ${obj.content}
      </div>
      <div class="modal-footer">
        ${buttons}
      </div>
    </div>
  </div>
</div>`
$(document.body).append(html);
$('#modelPanel').modal({show:true})
}

CreateModelPanel({
    title: 'Titulo',
    content: '<img>',
    buttons: [{
        class: 'btn btn-success',
        text: 'Btn1'
    }]
})